import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";


// 📌 DELETE: حذف ريفيو
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const supabase = getSupabaseServerClient({ admin: true });

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
