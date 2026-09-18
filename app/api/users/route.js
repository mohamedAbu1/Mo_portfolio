import { query } from "@/lib/mysql";

export async function GET() {
  try {
    const users = await query("SELECT id, full_name AS name, email, avatar_url AS image, role, created_at FROM profiles ORDER BY created_at DESC");
    return Response.json({ users }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}