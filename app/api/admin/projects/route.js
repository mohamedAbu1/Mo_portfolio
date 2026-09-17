import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/mysql";

async function guard() { const session = await getServerSession(authOptions); return session?.user?.role === "admin"; }
const clean = (value) => { const text = String(value ?? "").trim(); return text || null; };

async function attachDetails(deliverable) {
  const files = await query("SELECT id,file_type,file_url,is_public,alt_text,sort_order FROM deliverable_files WHERE deliverable_id=? ORDER BY sort_order ASC,id ASC", [deliverable.id]);
  const technologies = await query("SELECT t.name FROM technologies t JOIN deliverable_technologies dt ON dt.technology_id=t.id WHERE dt.deliverable_id=? ORDER BY t.name ASC", [deliverable.id]);
  return { ...deliverable, files, technologies: technologies.map((item) => item.name) };
}

async function saveDeliverable(engagementId, item, existingId = null) {
  const service = await query("SELECT id FROM services WHERE code=? LIMIT 1", [item.serviceCode]);
  if (!service.length) return null;
  const values = [String(item.title || item.serviceCode).trim(), clean(item.description), item.status || "planned", item.visibility || "private", clean(item.publicTitle), clean(item.publicDescription), clean(item.coverImageUrl), clean(item.videoUrl), clean(item.liveUrl), clean(item.sourceUrl), clean(item.androidUrl), clean(item.iosUrl), item.price === "" || item.price == null ? null : Number(item.price), item.currency || "USD", Boolean(item.isSold)];
  let deliverableId = existingId;
  if (existingId) {
    await query("UPDATE deliverables SET service_id=?,title=?,description=?,status=?,visibility=?,public_title=?,public_description=?,cover_image_url=?,video_url=?,live_url=?,source_url=?,android_url=?,ios_url=?,price=?,currency=?,is_sold=? WHERE id=? AND engagement_id=?", [service[0].id, ...values, existingId, engagementId]);
  } else {
    const result = await query("INSERT INTO deliverables(engagement_id,service_id,title,description,status,visibility,public_title,public_description,cover_image_url,video_url,live_url,source_url,android_url,ios_url,price,currency,is_sold) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [engagementId, service[0].id, ...values]);
    deliverableId = result.insertId;
  }
  const currentFiles = await query("SELECT file_url FROM deliverable_files WHERE deliverable_id=?", [deliverableId]);
  const knownFiles = new Set(currentFiles.map((file) => file.file_url));
  const imageUrls = String(item.imageUrls || "").split(/\r?\n/).map((url) => url.trim()).filter(Boolean);
  for (const url of imageUrls) {
    if (knownFiles.has(url)) continue;
    const count = await query("SELECT COUNT(*) AS total FROM deliverable_files WHERE deliverable_id=?", [deliverableId]);
    await query("INSERT INTO deliverable_files(deliverable_id,file_type,file_url,is_public,sort_order) VALUES(?,?,?,?,?)", [deliverableId, "image", url, item.visibility === "public", Number(count[0].total)]);
    knownFiles.add(url);
  }
  const technologyNames = String(item.technologies || "").split(",").map((name) => name.trim()).filter(Boolean);
  if (existingId) await query("DELETE FROM deliverable_technologies WHERE deliverable_id=?", [deliverableId]);
  for (const name of technologyNames) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    await query("INSERT IGNORE INTO technologies(name,slug) VALUES(?,?)", [name, slug]);
    const technology = await query("SELECT id FROM technologies WHERE slug=? LIMIT 1", [slug]);
    if (technology.length) await query("INSERT IGNORE INTO deliverable_technologies(deliverable_id,technology_id) VALUES(?,?)", [deliverableId, technology[0].id]);
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

async function findClient(body) {
  const name = String(body.clientName || "Private project").trim();
  const email = clean(body.clientEmail)?.toLowerCase() || null;
  const rows = email ? await query("SELECT id FROM clients WHERE email=? LIMIT 1", [email]) : await query("SELECT id FROM clients WHERE full_name=? AND email IS NULL ORDER BY id DESC LIMIT 1", [name]);
  if (rows.length) return rows[0].id;
  const result = await query("INSERT INTO clients(full_name,email,notes) VALUES(?,?,?)", [name, email, "Created from Admin workspace"]);
  return result.insertId;
}

export async function POST(req) {
  if (!await guard()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const body = await req.json(); const title = String(body.title || "").trim(); const items = Array.isArray(body.deliverables) ? body.deliverables : []; if (title.length < 2 || !items.length) return NextResponse.json({ error: "Title and at least one deliverable are required" }, { status: 400 }); const clientId = await findClient(body); const engagement = await query("INSERT INTO engagements(client_id,title,description,status) VALUES(?,?,?,?)", [clientId, title, clean(body.description), body.status || "planned"]); for (const item of items) await saveDeliverable(engagement.insertId, item); return NextResponse.json({ id: engagement.insertId }, { status: 201 }); } catch (error) { console.error("Create project failed", error); return NextResponse.json({ error: "Unable to create project" }, { status: 500 }); }
}

export async function PUT(req) {
  if (!await guard()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const body = await req.json(); const engagementId = Number(body.engagementId); const title = String(body.title || "").trim(); const items = Array.isArray(body.deliverables) ? body.deliverables : []; if (!engagementId || title.length < 2 || !items.length) return NextResponse.json({ error: "Project, title and at least one deliverable are required" }, { status: 400 }); const existing = await query("SELECT id,client_id FROM engagements WHERE id=? LIMIT 1", [engagementId]); if (!existing.length) return NextResponse.json({ error: "Project not found" }, { status: 404 }); await query("UPDATE engagements SET title=?,description=?,status=? WHERE id=?", [title, clean(body.description), body.status || "planned", engagementId]); await query("UPDATE clients SET full_name=?,email=? WHERE id=?", [String(body.clientName || "Private project").trim(), clean(body.clientEmail)?.toLowerCase() || null, existing[0].client_id]); for (const item of items) await saveDeliverable(engagementId, item, item.id ? Number(item.id) : null); return NextResponse.json({ id: engagementId, updated: true }); } catch (error) { console.error("Update project failed", error); return NextResponse.json({ error: "Unable to update project" }, { status: 500 }); }
}
