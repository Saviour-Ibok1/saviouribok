// Full post type — matches the Supabase posts table exactly.
// Replaces the Phase 2 PostStub type.
export type Post = {
  id:           string;
  slug:         string;
  title:        string;
  excerpt:      string;
  content:      string;
  category:     "development" | "data" | "marketing";
  published:    boolean;
  likes:        number;
  read_time:    string;
  cover_image:  string | null;
  created_at:   string;
  updated_at:   string;
};

// Lighter shape used in list views (home grid, blog listing)
export type PostPreview = Pick<
  Post,
  "id" | "slug" | "title" | "excerpt" | "category" | "likes" | "read_time" | "cover_image" | "created_at"
>;