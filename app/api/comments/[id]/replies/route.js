import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/mysql";

export async function GET(req, { params }) {
  try {
    const rows = await query("SELECT id, comment_id, author_name, author_image, content, created_at FROM comment_replies WHERE comment_id=? AND status='approved' ORDER BY created_at ASC", [params.id]);
    return NextResponse.json({ data: rows });
  } catch { return NextResponse.json({ error: "Unable to load replies" }, { status: 500 }); }
}

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") return NextResponse.json({ error: "Only the admin can reply" }, { status: 403 });
  try {
    const content = String((await req.json()).content || "").trim();
    if (content.length < 2 || content.length > 2000) return NextResponse.json({ error: "Reply must be between 2 and 2000 characters" }, { status: 400 });
    const comment = await query("SELECT id FROM comments WHERE id=? LIMIT 1", [params.id]);
    if (!comment.length) return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    await query("INSERT INTO comment_replies(comment_id,user_key,author_name,author_image,content,status) VALUES(?,?,?,?,?,'approved')", [params.id, session.user.email.toLowerCase(), session.user.name || "Admin", session.user.image || null, content]);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch { return NextResponse.json({ error: "Unable to submit reply" }, { status: 500 }); }
}
