import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const getPublic = () => getSupabaseServerClient();
const getAdmin = () => getSupabaseServerClient({ admin: true });

// 📌 POST: إضافة ريفيو جديد
export async function POST(req) {
  try {
    const body = await req.json();

    const { data, error } = await getAdmin()
      .from("reviews")
      .insert([
        {
          name: body.name,
          comment: body.content,
          rating: body.rating,
          avatar_url: body.avatar_url,
          user_id: body.user_id || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 📌 GET: جلب كل الريفيوهات
export async function GET() {
  try {
    const { data, error } = await getPublic().from("reviews").select("*");
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
