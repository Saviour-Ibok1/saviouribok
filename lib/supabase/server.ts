import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-only client — use this inside Server Components and Route Handlers.
// A new instance is created per call so it is never shared across requests.
export function createServerClient() {
  return createClient(supabaseUrl, supabaseKey);
}