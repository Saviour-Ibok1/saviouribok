"use client";

import { useState, useEffect } from "react";

export default function LikeButton({
  slug,
  initialLikes,
}: {
  slug: string;
  initialLikes: number;
}) {
  const storageKey = `liked:${slug}`;
  const [likes, setLikes]   = useState(initialLikes);
  const [liked, setLiked]   = useState(false);
  const [loading, setLoading] = useState(false);

  // Restore liked state from localStorage on mount
  useEffect(() => {
    try {
      setLiked(localStorage.getItem(storageKey) === "1");
    } catch {
      // localStorage unavailable (private browsing etc.) — silently ignore
    }
  }, [storageKey]);

  async function handleLike() {
    if (liked || loading) return;

    // Optimistic update — feels instant
    setLikes((n) => n + 1);
    setLiked(true);
    setLoading(true);

    try {
      const res = await fetch("/api/like", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ slug }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // Sync with real server count
      setLikes(data.likes);
      localStorage.setItem(storageKey, "1");
    } catch {
      // Revert optimistic update on failure
      setLikes((n) => n - 1);
      setLiked(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      aria-label={liked ? `${likes} likes — already liked` : `Like this post — ${likes} likes`}
      className="like-btn"
      data-liked={liked}
    >
      <span className="like-icon" aria-hidden="true">
        {liked ? "♥" : "♡"}
      </span>
      <span className="like-count">{likes}</span>

      <style>{`
        .like-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1.1rem;
          border-radius: 9999px;
          border: 1px solid var(--light-3);
          background: transparent;
          cursor: pointer;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.15s ease;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          color: var(--ink-3);
        }
        .like-btn:hover:not(:disabled) {
          border-color: #e8612a;
          color: #e8612a;
          background-color: rgba(232, 97, 42, 0.05);
        }
        .like-btn:active:not(:disabled) {
          transform: scale(0.96);
        }
        .like-btn[data-liked="true"] {
          border-color: rgba(232, 97, 42, 0.4);
          background-color: rgba(232, 97, 42, 0.07);
          color: #e8612a;
          cursor: default;
        }
        .like-btn:disabled {
          opacity: ${loading ? "0.6" : "1"};
        }
        .like-icon {
          font-size: 0.9rem;
          line-height: 1;
          transition: transform 0.2s ease;
        }
        .like-btn[data-liked="true"] .like-icon {
          transform: scale(1.15);
        }
        .like-count {
          line-height: 1;
        }
      `}</style>
    </button>
  );
}