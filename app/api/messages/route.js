import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ جلب كل الرسائل
export async function GET() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// ✅ إضافة رسالة جديدة
export async function POST(req) {
  const body = await req.json();
  const { content, sender_type, user_name, user_image, user_id, reply_to, status } = body;

  if (!content || !user_name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase.from("messages").insert([
    {
      content,
      sender_type,
      user_name,
      user_image,
      user_id,
      reply_to,
      status: status || "pending",
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// ✅ تعديل حالة أو محتوى الرسالة
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, content, status } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "Message ID is required" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("messages")
      .update(
        {
          ...(content && { content }),
          ...(status && { status }),
        }
      )
      .eq("id", id)
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    // ✅ مهم: لازم ترجع JSON حتى لو فاضي
    return new Response(JSON.stringify(data?.[0] || {}), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}


// ✅ حذف رسالة
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Message ID required" }, { status: 400 });
  }

  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
