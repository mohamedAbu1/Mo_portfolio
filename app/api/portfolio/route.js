import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query(`
      SELECT
        d.id,
        d.title,
        COALESCE(d.public_title, d.title) AS public_title,
        d.public_description,
        d.public_client_label,
        d.live_url,
        d.source_url,
        d.android_url,
        d.ios_url,
        d.status,
        d.created_at,
        s.code AS service_code,
        s.name AS service_name
      FROM deliverables d
      INNER JOIN services s ON s.id = d.service_id
      WHERE d.visibility = 'public'
        AND d.status IN ('in_progress', 'delivered')
      ORDER BY d.created_at DESC
    `);

    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    console.error("Portfolio query failed:", error);
    return NextResponse.json({ error: "Unable to load portfolio" }, { status: 500 });
  }
}
