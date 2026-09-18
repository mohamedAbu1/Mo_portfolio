import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

export async function DELETE(_req, { params }) {
  try {
    await query("DELETE FROM reviews WHERE id = ?", [params.id]);
    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}