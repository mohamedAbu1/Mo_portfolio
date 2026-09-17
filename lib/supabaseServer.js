import { createClient } from "@supabase/supabase-js";

export function getSupabaseServerClient({ admin = false } = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = (admin ? process.env.SUPABASE_SERVICE_ROLE_KEY : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.trim();

  if (!url || !key) {
    throw new Error(`Supabase configuration is missing: ${admin ? "SUPABASE_SERVICE_ROLE_KEY" : "NEXT_PUBLIC_SUPABASE_ANON_KEY"}`);
  }

  return createClient(url, key);
}
