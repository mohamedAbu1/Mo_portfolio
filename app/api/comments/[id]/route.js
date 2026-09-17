import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/mysql";

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") return NextResponse.json({ error: "Only the admin can delete comments" }, { status: 403 });
  try {
    const result = await query("DELETE FROM comments WHERE id=?", [params.id]);
    if (!result.affectedRows) return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Unable to delete comment" }, { status: 500 }); }
}
