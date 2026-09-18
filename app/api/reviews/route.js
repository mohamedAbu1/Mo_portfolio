import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const content = String(body.content || body.comment || "").trim();
    const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));
    if (!name || !content) return NextResponse.json({ error: "Name and review are required" }, { status: 400 });
    const result = await query("INSERT INTO reviews (name, content, rating, avatar_url, user_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())", [name, content, rating, body.avatar_url || null, body.user_id || null]);
    const rows = await query("SELECT * FROM reviews WHERE id = ?", [result.insertId]);
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reviews = await query("SELECT * FROM reviews ORDER BY created_at DESC");
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}