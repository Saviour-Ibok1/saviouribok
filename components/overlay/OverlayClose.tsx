"use client";

import { useRouter } from "next/navigation";

interface OverlayCloseProps {
  label: string;
}

export default function OverlayClose({ label }: OverlayCloseProps) {
  const router = useRouter();

  return (
    <div className="overlay-close-bar">
      <span className="overlay-close-label">{label}</span>
      <button
        onClick={() => router.back()}
        className="overlay-close-btn"
        aria-label="Close panel"
      >
        ✕
      </button>

      <style>{`
        .overlay-close-bar {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: 52px;
          background-color: var(--light);
          border-bottom: 1px solid var(--light-3);
          flex-shrink: 0;
        }
        .overlay-close-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .overlay-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--light-3);
          background: transparent;
          color: var(--ink-2);
          font-size: 0.85rem;
          cursor: pointer;
          transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .overlay-close-btn:hover {
          background-color: var(--light-3);
          border-color: var(--light-3);
          color: var(--ink);
        }
        .overlay-close-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}