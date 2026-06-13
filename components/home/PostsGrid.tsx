// Server Component — fetches live posts from Supabase directly.
// No useEffect, no loading state needed — Next.js streams the result.
import { getPosts } from "@/lib/queries/posts";
import FeaturedPostCard from "@/components/home/FeaturedPostCard";
import PostCard from "@/components/blog/PostCard";
import type { PostPreview } from "@/types/post";

// Adapter: maps Supabase PostPreview shape to the card prop shape
function toCardProps(post: PostPreview) {
  return {
    slug:       post.slug,
    title:      post.title,
    excerpt:    post.excerpt,
    category:   post.category,
    date:       new Date(post.created_at).toLocaleDateString("en-GB", {
                  day: "numeric", month: "short", year: "numeric"
                }),
    readTime:   post.read_time,
    likes:      post.likes,
    coverImage: post.cover_image ?? undefined,
  };
}

export default async function PostsGrid() {
  const posts = await getPosts();

  // Empty state — shown before any posts are published
  if (posts.length === 0) {
    return (
      <section style={{
        backgroundColor: "var(--light)",
        padding: "4rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
        }}>
          Recent Posts
        </span>
        <p style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.3rem",
          color: "var(--ink-2)",
          margin: 0,
        }}>
          Posts are on their way.
        </p>
      </section>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <section className="posts-section">
      <div className="posts-section-header">
        <span className="label">Recent Posts</span>
      </div>

      <div className="posts-grid">
        <div className="posts-grid-featured">
          <FeaturedPostCard post={toCardProps(featured)} />
        </div>

        {rest.length > 0 && (
          <div className="posts-grid-rest">
            {rest.map((post) => (
              <PostCard key={post.slug} post={toCardProps(post)} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .posts-section {
          background-color: var(--light);
          padding: 0;
        }
        .posts-section-header {
          padding: 2.25rem 2rem 1.25rem;
          border-bottom: 1px solid var(--light-3);
        }
        .posts-section-header .label {
          color: var(--ink-3);
        }
        .posts-grid {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background-color: var(--light-3);
        }
        .posts-grid-featured {
          background-color: var(--light);
        }
        .posts-grid-rest {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1px;
          background-color: var(--light-3);
        }
        .posts-grid-rest > * {
          background-color: var(--light);
        }
        @media (max-width: 480px) {
          .posts-section-header { padding: 1.75rem 1.25rem 1rem; }
          .posts-grid-rest { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}