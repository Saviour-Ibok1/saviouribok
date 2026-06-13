"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostPreview } from "@/types/post";
import { formatDate } from "@/lib/utils/formatDate";

const FILTERS = [
  { label: "All",         value: "all"         },
  { label: "Development", value: "development" },
  { label: "Data",        value: "data"        },
  { label: "Marketing",   value: "marketing"   },
];

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

export default function BlogListing({ posts }: { posts: PostPreview[] }) {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? posts
    : posts.filter((p) => p.category === active);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Filter buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              padding: "0.4rem 0.9rem",
              borderRadius: "9999px",
              border: "1px solid",
              borderColor: active === f.value ? "var(--accent)" : "var(--light-3)",
              backgroundColor: active === f.value ? "rgba(232,97,42,0.06)" : "transparent",
              color: active === f.value ? "var(--accent)" : "var(--ink-3)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{
          padding: "4rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--ink-2)", margin: 0 }}>
            No posts in this category yet.
          </p>
          <button
            onClick={() => setActive("all")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.07em",
              color: "var(--accent)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            View all posts
          </button>
        </div>
      )}

      {/* Post list */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {filtered.map((post) => (
          <li key={post.slug} style={{ borderBottom: "1px solid var(--light-3)" }}>
            <Link
              href={`/blog/${post.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "start",
                gap: "1.5rem",
                padding: "1.75rem 0",
                textDecoration: "none",
                transition: "opacity 0.15s ease",
              }}
              className="blog-list-item"
            >
              {/* Left */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span
                  className={CATEGORY_CLASS[post.category]}
                  style={{ alignSelf: "flex-start" }}
                >
                  {CATEGORY_LABEL[post.category]}
                </span>
                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {post.title}
                </h2>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "var(--ink-2)",
                  margin: 0,
                  lineHeight: 1.7,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                } as React.CSSProperties}>
                  {post.excerpt}
                </p>
              </div>

              {/* Right — meta */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "0.3rem",
                flexShrink: 0,
                paddingTop: "0.2rem",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                  color: "var(--ink-3)",
                  whiteSpace: "nowrap",
                }}>
                  {formatDate(post.created_at)}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                  color: "var(--ink-3)",
                  whiteSpace: "nowrap",
                }}>
                  {post.read_time}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--ink-3)",
                }}>
                  ♥ {post.likes}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <style>{`
        .blog-list-item:hover h2 { color: var(--accent); }
        .blog-list-item:hover { opacity: 0.85; }
        @media (max-width: 560px) {
          .blog-list-item { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}