import { createServerClient } from "@/lib/supabase/server";
import type { Post, PostPreview } from "@/types/post";

// Fetch all published posts for the home grid and blog listing.
// Returns lightweight PostPreview shape — no content field.
export async function getPosts(): Promise<PostPreview[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, category, likes, read_time, cover_image, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPosts error:", error.message);
    return [];
  }

  return data ?? [];
}

// Fetch a single published post by slug for the blog post page.
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("getPostBySlug error:", error.message);
    return null;
  }

  return data ?? null;
}