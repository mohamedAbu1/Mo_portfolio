import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";
export const dynamic = "force-dynamic";
export async function GET() {
  try { const rows = await query("SELECT theme_code,enabled,headline,message,start_date,end_date,accent,background FROM seasonal_themes WHERE enabled=TRUE ORDER BY id ASC"); return NextResponse.json({ data: rows }); }
  catch { return NextResponse.json({ data: [] }); }
}
