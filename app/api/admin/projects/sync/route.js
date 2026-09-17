import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/mysql";
import { myProjects } from "@/constants/api";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin";
}

export async function POST() {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const synced = [];
    for (const project of myProjects) {
      const existing = await query("SELECT id FROM engagements WHERE title=? LIMIT 1", [project.projectTitle]);
      if (existing.length) continue;
      let client = await query("SELECT id FROM clients WHERE full_name=? LIMIT 1", [project.clientName || "Private client"]);
      if (!client.length) {
        const result = await query("INSERT INTO clients(full_name,notes) VALUES(?,?)", [project.clientName || "Private client", `Client for ${project.projectTitle}`]);
        client = [{ id: result.insertId }];
      }
      const engagement = await query("INSERT INTO engagements(client_id,title,description,status) VALUES(?,?,?,?)", [client[0].id, project.projectTitle, project.projectSummary || null, "delivered"]);
      const website = await query("SELECT id FROM services WHERE code='website' LIMIT 1");
      if (website.length) {
        const deliverable = await query("INSERT INTO deliverables(engagement_id,service_id,title,description,status,visibility,public_title,public_description,public_client_label,live_url,source_url,android_url,is_sold) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [engagement.insertId, website[0].id, `${project.projectTitle} — Website`, project.projectSummary || null, "delivered", "public", project.projectTitle, project.projectSummary || null, project.clientName || null, project.liveUrl || null, project.githubUrl || null, project.appUrl || null, true]);
        for (const technology of project.technologies || []) {
          const name = technology.name;
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          await query("INSERT IGNORE INTO technologies(name,slug) VALUES(?,?)", [name, slug]);
          const tech = await query("SELECT id FROM technologies WHERE slug=? LIMIT 1", [slug]);
          if (tech.length) await query("INSERT IGNORE INTO deliverable_technologies(deliverable_id,technology_id) VALUES(?,?)", [deliverable.insertId, tech[0].id]);
        }
        if (project.imgPaths?.length) for (const [index, fileUrl] of project.imgPaths.entries()) await query("INSERT IGNORE INTO deliverable_files(deliverable_id,file_type,file_url,is_public,sort_order) VALUES(?,?,?,?,?)", [deliverable.insertId, "image", fileUrl, true, index]);
      }
      synced.push(project.projectTitle);
    }
    return NextResponse.json({ synced });
  } catch (error) {
    console.error("Project sync failed", error);
    return NextResponse.json({ error: "Unable to synchronize projects" }, { status: 500 });
  }
}
