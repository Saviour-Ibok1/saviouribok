import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser-safe client — use this inside Client Components ("use client")
export const supabase = createClient(supabaseUrl, supabaseKey);