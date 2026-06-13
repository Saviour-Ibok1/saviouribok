import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPosts } from "@/lib/queries/posts";
import PostContent from "@/components/blog/PostContent";
import LikeButton from "@/components/blog/LikeButton";
import { formatDate } from "@/lib/utils/formatDate";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title:       post.title,
    description: post.excerpt,
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      images:      post.cover_image ? [{ url: post.cover_image }] : [{ url: "/og-default.png" }],
    },
  };
}

const CATEGORY_CLASS: Record<string, string> = {
  development: "tag-dev",
  data:        "tag-data",
  marketing:   "tag-marketing",
};

const CATEGORY_LABEL: Record<string, string> = {
  development: "Development",
  data:        "Data Analysis",
  marketing:   "Marketing",
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", backgroundColor: "var(--light)" }}>
      {/* ── Post header ── */}
      <div style={{
        backgroundColor: "var(--dark)",
        padding: "4rem 2rem 3.5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: "-100px", right: "-100px",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,97,42,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} aria-hidden="true" />

        <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "1.75rem",
              transition: "color 0.15s ease",
            }}
            className="post-back-link"
          >
            ← Blog
          </Link>

          <div style={{ marginBottom: "1rem" }}>
            <span className={CATEGORY_CLASS[post.category]}>
              {CATEGORY_LABEL[post.category]}
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
            fontWeight: 400,
            color: "var(--light)",
            margin: "0 0 1.25rem",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}>
            {post.title}
          </h1>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            color: "rgba(245,242,237,0.55)",
            margin: "0 0 2rem",
            lineHeight: 1.75,
          }}>
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            flexWrap: "wrap",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.07em",
              color: "rgba(255,255,255,0.3)",
            }}>
              {formatDate(post.created_at)}
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.6rem" }}>·</span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.07em",
              color: "rgba(255,255,255,0.3)",
            }}>
              {post.read_time}
            </span>
          </div>
        </div>
      </div>

      {/* ── Post body ── */}
      <div style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "3.5rem 2rem 5rem",
      }}>
        <PostContent content={post.content} />

        {/* ── Footer — like button + nav ── */}
        <div style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--light-3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
          >
            ← All posts
          </Link>

          <LikeButton slug={post.slug} initialLikes={post.likes} />
        </div>
      </div>

      <style>{`
        .post-back-link:hover { color: rgba(255,255,255,0.7) !important; }
      `}</style>
    </div>
  );
}