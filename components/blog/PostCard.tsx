// Server Component — pure display, no interactivity
import Link from "next/link";
import type { PostStub } from "@/types/post";

const CATEGORY_LABELS: Record<PostStub["category"], string> = {
  development: "Development",
  data:        "Data Analysis",
  marketing:   "Marketing",
};

const CATEGORY_CLASS: Record<PostStub["category"], string> = {
  development: "tag-dev",
  data:        "tag-data",
  marketing:   "tag-marketing",
};

export default function PostCard({ post }: { post: PostStub }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      {/* Top — tag */}
      <span className={`post-card-tag ${CATEGORY_CLASS[post.category]}`}>
        {CATEGORY_LABELS[post.category]}
      </span>

      {/* Title */}
      <h2 className="post-card-title">{post.title}</h2>

      {/* Excerpt */}
      <p className="post-card-excerpt">{post.excerpt}</p>

      {/* Meta row */}
      <div className="post-card-meta">
        <span className="post-card-meta-item">{post.date}</span>
        <span className="post-card-meta-dot" aria-hidden="true">·</span>
        <span className="post-card-meta-item">{post.readTime}</span>
        <span className="post-card-meta-dot" aria-hidden="true">·</span>
        <span className="post-card-meta-item">♥ {post.likes}</span>
      </div>

      <style>{`
        .post-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.75rem;
          background-color: var(--light);
          text-decoration: none;
          transition: background-color 0.2s ease;
          cursor: pointer;
        }
        .post-card:hover {
          background-color: var(--light-2);
        }
        .post-card-tag {
          align-self: flex-start;
        }
        .post-card-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 400;
          line-height: 1.25;
          color: var(--ink);
          margin: 0;
        }
        .post-card-excerpt {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--ink-2);
          margin: 0;
          flex: 1;
          /* Clamp to 3 lines */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .post-card-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: auto;
          padding-top: 0.5rem;
        }
        .post-card-meta-item {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          color: var(--ink-3);
        }
        .post-card-meta-dot {
          color: var(--ink-3);
          font-size: 0.65rem;
          opacity: 0.5;
        }
      `}</style>
    </Link>
  );
}