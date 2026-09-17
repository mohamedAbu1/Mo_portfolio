import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(_req) {
  try {
    const supabaseAdmin = getSupabaseServerClient({ admin: true });
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ users: data?.users || [] }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

