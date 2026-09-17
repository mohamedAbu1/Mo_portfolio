import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/mysql";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const rows = await query(`SELECT project_key AS target, 'Project' AS target_type, user_key, created_at FROM project_likes UNION ALL SELECT CONCAT('Comment #', comment_id), 'Comment', user_key, created_at FROM comment_likes ORDER BY created_at DESC`);
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Admin likes failed", error);
    return NextResponse.json({ error: "Unable to load likes" }, { status: 500 });
  }
}
