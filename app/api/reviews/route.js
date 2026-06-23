import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// ✅ القيم مباشرة من ملف env
const supabaseUrl = "https://iyvdseypdpcejejyyuwz.supabase.co";
const supabaseAnonKey = "sb_publishable_b8AicgEWkwIPJZa0tCy4EQ_ec8m1Ut8";
const supabaseServiceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dmRzZXlwZHBjZWplanl5dXd6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjEyNjA2NiwiZXhwIjoyMDk3NzAyMDY2fQ.Wckodxc-6twKmPw0sqCr3QLPGVTp_dn1t_5UFhgxvoA";

// Frontend client (للقراءة فقط)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Backend client (للكتابة/تعديل البيانات)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// 📌 POST: إضافة ريفيو جديد
export async function POST(req) {
  try {
    const body = await req.json();

    const { data, error } = await supabaseAdmin
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
    const { data, error } = await supabase.from("reviews").select("*");
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
