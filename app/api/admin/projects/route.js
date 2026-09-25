import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query, withTransaction } from "@/lib/mysql";

async function guard() { const session = await getServerSession(authOptions); return session?.user?.role === "admin"; }
const clean = (value) => { const text = String(value ?? "").trim(); return text || null; };
const unique = (values) => [...new Set(values.filter(Boolean))];

async function attachDetails(deliverable) {
  const files = await query("SELECT id,file_type,file_url,is_public,alt_text,sort_order FROM deliverable_files WHERE deliverable_id=? ORDER BY sort_order ASC,id ASC", [deliverable.id]);
  const technologies = await query("SELECT t.name FROM technologies t JOIN deliverable_technologies dt ON dt.technology_id=t.id WHERE dt.deliverable_id=? ORDER BY t.name ASC", [deliverable.id]);
  return { ...deliverable, files, technologies: technologies.map((item) => item.name) };
}

async function saveDeliverable(dbQuery, engagementId, item, existingId = null) {
  const service = await dbQuery("SELECT id FROM services WHERE code=? LIMIT 1", [item.serviceCode]);
  if (!service.length) return null;
  if (existingId) {
    const owned = await dbQuery("SELECT id FROM deliverables WHERE id=? AND engagement_id=? LIMIT 1", [existingId, engagementId]);
    if (!owned.length) throw new Error("Deliverable does not belong to this project");
  }
  const status = ["planned", "in_progress", "delivered", "archived"].includes(item.status) ? item.status : "planned";
  const visibility = ["private", "unlisted", "public"].includes(item.visibility) ? item.visibility : "private";
  const currency = ["USD", "EUR", "EGP"].includes(item.currency) ? item.currency : "USD";
  const parsedPrice = item.price === "" || item.price == null ? null : Number(item.price);
  const price = parsedPrice == null || (Number.isFinite(parsedPrice) && parsedPrice >= 0) ? parsedPrice : null;
  const values = [String(item.title || item.serviceCode).trim(), clean(item.description), status, visibility, clean(item.publicTitle), clean(item.publicDescription), clean(item.coverImageUrl), clean(item.videoUrl), clean(item.liveUrl), clean(item.sourceUrl), clean(item.androidUrl), clean(item.iosUrl), price, currency, Boolean(item.isSold)];
  let deliverableId = existingId;
  if (existingId) {
    await dbQuery("UPDATE deliverables SET service_id=?,title=?,description=?,status=?,visibility=?,public_title=?,public_description=?,cover_image_url=?,video_url=?,live_url=?,source_url=?,android_url=?,ios_url=?,price=?,currency=?,is_sold=? WHERE id=? AND engagement_id=?", [service[0].id, ...values, existingId, engagementId]);
  } else {
    const result = await dbQuery("INSERT INTO deliverables(engagement_id,service_id,title,description,status,visibility,public_title,public_description,cover_image_url,video_url,live_url,source_url,android_url,ios_url,price,currency,is_sold) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [engagementId, service[0].id, ...values]);
    deliverableId = result.insertId;
  }
  if (existingId && Array.isArray(item.removedImageUrls) && item.removedImageUrls.length) {
    for (const url of unique(item.removedImageUrls)) {
      await dbQuery("DELETE FROM deliverable_files WHERE deliverable_id=? AND file_url=?", [deliverableId, url]);
    }
  }
  if (existingId && item.removeCover && !item.coverImageUrl) {
    await dbQuery("UPDATE deliverables SET cover_image_url=NULL WHERE id=? AND engagement_id=?", [deliverableId, engagementId]);
  }
  const currentFiles = await dbQuery("SELECT file_url FROM deliverable_files WHERE deliverable_id=?", [deliverableId]);
  const knownFiles = new Set(currentFiles.map((file) => file.file_url));
  const imageUrls = unique(String(item.imageUrls || "").split(/\r?\n/).map((url) => url.trim()).filter((url) => !item.removedImageUrls?.includes(url)));
  for (const url of imageUrls) {
    if (knownFiles.has(url)) continue;
    const count = await dbQuery("SELECT COUNT(*) AS total FROM deliverable_files WHERE deliverable_id=?", [deliverableId]);
    await dbQuery("INSERT INTO deliverable_files(deliverable_id,file_type,file_url,is_public,sort_order) VALUES(?,?,?,?,?)", [deliverableId, "image", url, item.visibility === "public", Number(count[0].total)]);
    knownFiles.add(url);
  }
  const technologyNames = String(item.technologies || "").split(",").map((name) => name.trim()).filter(Boolean);
  if (existingId) await dbQuery("DELETE FROM deliverable_technologies WHERE deliverable_id=?", [deliverableId]);
  for (const name of technologyNames) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    await dbQuery("INSERT IGNORE INTO technologies(name,slug) VALUES(?,?)", [name, slug]);
    const technology = await dbQuery("SELECT id FROM technologies WHERE slug=? LIMIT 1", [slug]);
    if (technology.length) await dbQuery("INSERT IGNORE INTO deliverable_technologies(deliverable_id,technology_id) VALUES(?,?)", [deliverableId, technology[0].id]);
  }
  return deliverableId;
}

export async function GET() {
  if (!await guard()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await query(`SELECT e.id,e.title,e.description,e.status,e.created_at,c.full_name AS client_name,c.email AS client_email,d.id AS deliverable_id,d.title AS deliverable_title,d.description AS deliverable_description,d.status AS deliverable_status,d.visibility,d.public_title,d.public_description,d.price,d.currency,d.is_sold,d.cover_image_url,d.video_url,d.live_url,d.source_url,d.android_url,d.ios_url,s.code AS service_code,s.name AS service_name FROM engagements e JOIN clients c ON c.id=e.client_id LEFT JOIN deliverables d ON d.engagement_id=e.id LEFT JOIN services s ON s.id=d.service_id ORDER BY e.created_at DESC,d.created_at ASC`);
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.id)) map.set(row.id, { id: row.id, title: row.title, description: row.description, status: row.status, client_name: row.client_name, client_email: row.client_email, created_at: row.created_at, deliverables: [] });
    if (row.deliverable_id) map.get(row.id).deliverables.push(await attachDetails({ id: row.deliverable_id, title: row.deliverable_title, description: row.deliverable_description, status: row.deliverable_status, visibility: row.visibility, public_title: row.public_title, public_description: row.public_description, service_code: row.service_code, service_name: row.service_name, price: row.price, currency: row.currency, is_sold: Boolean(row.is_sold), cover_image_url: row.cover_image_url, video_url: row.video_url, live_url: row.live_url, source_url: row.source_url, android_url: row.android_url, ios_url: row.ios_url }));
  }
  return NextResponse.json({ data: [...map.values()] });
}

async function findClient(body, dbQuery = query) {
  const name = String(body.clientName || "Private project").trim();
  const email = clean(body.clientEmail)?.toLowerCase() || null;
  const rows = email ? await dbQuery("SELECT id FROM clients WHERE email=? LIMIT 1", [email]) : await dbQuery("SELECT id FROM clients WHERE full_name=? AND email IS NULL ORDER BY id DESC LIMIT 1", [name]);
  if (rows.length) return rows[0].id;
  const result = await dbQuery("INSERT INTO clients(full_name,email,notes) VALUES(?,?,?)", [name, email, "Created from Admin workspace"]);
  return result.insertId;
}

export async function POST(req) {
  if (!await guard()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const title = String(body.title || "").trim();
    const items = Array.isArray(body.deliverables) ? body.deliverables : [];
    if (title.length < 2 || !items.length) return NextResponse.json({ error: "Title and at least one deliverable are required" }, { status: 400 });
    const validServices = new Set(["website", "android_app", "ios_app", "cv", "cover_letter"]);
    if (items.some((item) => !validServices.has(item.serviceCode))) return NextResponse.json({ error: "One or more services are invalid" }, { status: 400 });
    const created = await withTransaction(async (dbQuery) => {
      const clientId = await findClient(body, dbQuery);
      const engagement = await dbQuery("INSERT INTO engagements(client_id,title,description,status) VALUES(?,?,?,?)", [clientId, title, clean(body.description), body.status || "planned"]);
      const deliverableIds = [];
      for (const item of items) {
        const id = await saveDeliverable(dbQuery, engagement.insertId, item);
        if (!id) throw new Error(`Unknown service code: ${item.serviceCode}`);
        deliverableIds.push(id);
      }
      return { id: engagement.insertId, deliverableIds };
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) { console.error("Create project failed", error); return NextResponse.json({ error: "Unable to create project" }, { status: 500 }); }
}

export async function PUT(req) {
  if (!await guard()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const engagementId = Number(body.engagementId);
    const title = String(body.title || "").trim();
    const items = Array.isArray(body.deliverables) ? body.deliverables : [];
    if (!engagementId || title.length < 2 || !items.length) return NextResponse.json({ error: "Project, title and at least one deliverable are required" }, { status: 400 });
    const validServices = new Set(["website", "android_app", "ios_app", "cv", "cover_letter"]);
    if (items.some((item) => !validServices.has(item.serviceCode))) return NextResponse.json({ error: "One or more services are invalid" }, { status: 400 });
    await withTransaction(async (dbQuery) => {
      const existing = await dbQuery("SELECT id,client_id FROM engagements WHERE id=? LIMIT 1", [engagementId]);
      if (!existing.length) throw Object.assign(new Error("Project not found"), { statusCode: 404 });
      await dbQuery("UPDATE engagements SET title=?,description=?,status=? WHERE id=?", [title, clean(body.description), body.status || "planned", engagementId]);
      await dbQuery("UPDATE clients SET full_name=?,email=? WHERE id=?", [String(body.clientName || "Private project").trim(), clean(body.clientEmail)?.toLowerCase() || null, existing[0].client_id]);
      const keptIds = [];
      for (const item of items) {
        const id = await saveDeliverable(dbQuery, engagementId, item, item.id ? Number(item.id) : null);
        if (!id) throw new Error(`Unknown service code: ${item.serviceCode}`);
        keptIds.push(Number(id));
      }
      const placeholders = keptIds.map(() => "?").join(",");
      await dbQuery(`UPDATE deliverables SET status='archived', visibility='private' WHERE engagement_id=? AND id NOT IN (${placeholders})`, [engagementId, ...keptIds]);
    });
    return NextResponse.json({ id: engagementId, updated: true });
  } catch (error) { console.error("Update project failed", error); return NextResponse.json({ error: error.statusCode === 404 ? "Project not found" : "Unable to update project" }, { status: error.statusCode || 500 }); }
}
