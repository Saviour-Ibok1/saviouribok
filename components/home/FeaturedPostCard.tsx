// Server Component — pure display
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

// Placeholder gradient covers when no real image exists yet
const CATEGORY_GRADIENT: Record<PostStub["category"], string> = {
  development: "linear-gradient(135deg, rgba(74,158,255,0.15) 0%, rgba(10,10,10,0.8) 100%)",
  data:        "linear-gradient(135deg, rgba(47,179,128,0.15) 0%, rgba(10,10,10,0.8) 100%)",
  marketing:   "linear-gradient(135deg, rgba(232,97,42,0.15) 0%, rgba(10,10,10,0.8) 100%)",
};

export default function FeaturedPostCard({ post }: { post: PostStub }) {
  return (
    <Link href={`/blog/${post.slug}`} className="featured-card">
      {/* Left — image / cover */}
      <div
        className="featured-card-image"
        style={{
          background: post.coverImage
            ? `url(${post.coverImage}) center/cover no-repeat`
            : CATEGORY_GRADIENT[post.category],
        }}
        aria-hidden="true"
      >
        {/* Subtle label over image */}
        <span className="featured-card-image-label label-light">Featured</span>
      </div>

      {/* Right — content */}
      <div className="featured-card-content">
        <span className={`featured-card-tag ${CATEGORY_CLASS[post.category]}`}>
          {CATEGORY_LABELS[post.category]}
        </span>

        <h2 className="featured-card-title">{post.title}</h2>

        <p className="featured-card-excerpt">{post.excerpt}</p>

        <div className="featured-card-meta">
          <span className="featured-card-meta-item">{post.date}</span>
          <span aria-hidden="true" style={{ opacity: 0.4 }}>·</span>
          <span className="featured-card-meta-item">{post.readTime}</span>
          <span aria-hidden="true" style={{ opacity: 0.4 }}>·</span>
          <span className="featured-card-meta-item">♥ {post.likes}</span>
        </div>

        <span className="featured-card-cta">Read article →</span>
      </div>

      <style>{`
        .featured-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 320px;
          background-color: var(--light);
          text-decoration: none;
          transition: background-color 0.2s ease;
          cursor: pointer;
        }
        .featured-card:hover {
          background-color: var(--light-2);
        }
        .featured-card-image {
          position: relative;
          min-height: 260px;
          background-color: var(--dark-3);
          display: flex;
          align-items: flex-end;
          padding: 1.25rem;
        }
        .featured-card-image-label {
          position: absolute;
          top: 1rem;
          left: 1rem;
        }
        .featured-card-content {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 2rem 2rem 2rem 2.25rem;
          justify-content: center;
        }
        .featured-card-tag {
          align-self: flex-start;
        }
        .featured-card-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.2;
          color: var(--ink);
          margin: 0;
        }
        .featured-card-excerpt {
          font-family: var(--font-sans);
          font-size: 0.925rem;
          line-height: 1.75;
          color: var(--ink-2);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .featured-card-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .featured-card-meta-item {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          color: var(--ink-3);
        }
        .featured-card-cta {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          color: var(--accent);
          margin-top: 0.25rem;
          transition: letter-spacing 0.2s ease;
        }
        .featured-card:hover .featured-card-cta {
          letter-spacing: 0.1em;
        }

        /* Stack on mobile */
        @media (max-width: 700px) {
          .featured-card {
            grid-template-columns: 1fr;
          }
          .featured-card-image {
            min-height: 200px;
          }
          .featured-card-content {
            padding: 1.5rem;
          }
          .featured-card-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </Link>
  );
}