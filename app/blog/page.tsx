// Blog listing page — /blog
// Server Component fetches posts; client component handles filter UI
import { getPosts } from "@/lib/queries/posts";
import BlogListing from "@/components/blog/BlogListing";

export const metadata = {
  title: "Blog",
  description: "Writing on development, data analysis, and digital marketing by Saviour Ibok.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", backgroundColor: "var(--light)" }}>
      {/* Page header */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "3.5rem 2rem 2rem",
        borderBottom: "1px solid var(--light-3)",
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
          display: "block",
          marginBottom: "0.75rem",
        }}>
          All Posts
        </span>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 400,
          color: "var(--ink)",
          margin: "0 0 0.5rem",
          lineHeight: 1.15,
        }}>
          Writing on things{" "}
          <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>
            that matter to me.
          </em>
        </h1>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.95rem",
          color: "var(--ink-3)",
          margin: 0,
        }}>
          {posts.length} {posts.length === 1 ? "post" : "posts"} across development, data, and marketing.
        </p>
      </div>

      {/* Client component handles filter + grid */}
      <BlogListing posts={posts} />
    </div>
  );
}