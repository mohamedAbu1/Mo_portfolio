import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

export const dynamic = "force-dynamic";

function slugify(value) {
  return String(value || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function GET() {
  try {
    const rows = await query(`
      SELECT e.id AS engagement_id, e.title AS engagement_title, e.description AS engagement_description, e.created_at,
        d.id AS deliverable_id, d.title, d.public_title, d.public_description,
        d.live_url, d.source_url, d.android_url, d.ios_url, d.status, s.name AS service_name
      FROM engagements e
      INNER JOIN deliverables d ON d.engagement_id = e.id
      INNER JOIN services s ON s.id = d.service_id
      WHERE d.visibility = 'public' AND (d.status IN ('in_progress', 'delivered') OR d.is_sold = TRUE)
      ORDER BY e.created_at DESC, d.created_at ASC
    `);

    const projects = new Map();
    for (const row of rows) {
      if (!projects.has(row.engagement_id)) projects.set(row.engagement_id, {
        id: String(row.engagement_id), projectTitle: row.engagement_title, projectSummary: row.engagement_description,
        date: row.created_at ? new Date(row.created_at).getFullYear().toString() : "", category: [], solutionType: "",
        platforms: [], technologies: [], features: [], connectedDeliverables: [], imgPaths: [], liveUrl: "", githubUrl: "", appUrl: "",
        projectKey: slugify(row.engagement_title),
      });
      const project = projects.get(row.engagement_id);
      const title = row.public_title || row.title;
      if (!project.liveUrl && row.live_url) project.liveUrl = row.live_url;
      if (!project.githubUrl && row.source_url) project.githubUrl = row.source_url;
      if (!project.appUrl && row.android_url) project.appUrl = row.android_url;
      if (!project.category.includes(row.service_name)) project.category.push(row.service_name);
      project.platforms.push({ name: row.service_name, detail: row.public_description || row.title });
      project.connectedDeliverables.push({ title, service: row.service_name, status: row.status === "delivered" ? "Delivered · Sold" : "In progress", url: row.live_url || row.source_url || row.android_url || row.ios_url || "", technologies: [] });
    }

    for (const project of projects.values()) {
      const deliverables = await query("SELECT id FROM deliverables WHERE engagement_id=? AND visibility='public' AND (status IN ('in_progress','delivered') OR is_sold=TRUE)", [project.id]);
      const technologyNames = new Set();
      for (const deliverable of deliverables) {
        const [technologyRows, files] = await Promise.all([
          query("SELECT t.name FROM technologies t JOIN deliverable_technologies dt ON dt.technology_id=t.id WHERE dt.deliverable_id=? ORDER BY t.name ASC", [deliverable.id]),
          query("SELECT file_url FROM deliverable_files WHERE deliverable_id=? AND is_public=TRUE ORDER BY sort_order ASC,id ASC", [deliverable.id]),
        ]);
        technologyRows.forEach((item) => technologyNames.add(item.name));
        files.forEach((file) => { if (!project.imgPaths.includes(file.file_url)) project.imgPaths.push(file.file_url); });
      }
      project.technologies = [...technologyNames].map((name) => ({ name }));
      project.solutionType = project.category.join(" + ");
      project.connectedDeliverables.forEach((item) => { item.technologies = project.technologies.map((technology) => technology.name); });
    }

    return NextResponse.json({ data: [...projects.values()] }, { status: 200 });
  } catch (error) {
    console.error("Portfolio query failed:", error);
    return NextResponse.json({ error: "Unable to load portfolio" }, { status: 500 });
  }
}
