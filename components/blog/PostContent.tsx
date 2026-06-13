"use client";

import ReactMarkdown from "react-markdown";

export default function PostContent({ content }: { content: string }) {
  return (
    <div className="post-content">
      <ReactMarkdown>{content}</ReactMarkdown>

      <style>{`
        .post-content {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          line-height: 1.9;
          color: var(--ink-2);
        }

        /* Headings */
        .post-content h1,
        .post-content h2,
        .post-content h3,
        .post-content h4 {
          font-family: var(--font-serif);
          font-weight: 400;
          color: var(--ink);
          margin: 2.5rem 0 0.75rem;
          line-height: 1.25;
        }
        .post-content h1 { font-size: 1.9rem; }
        .post-content h2 { font-size: 1.5rem; }
        .post-content h3 { font-size: 1.2rem; }
        .post-content h4 { font-size: 1rem; }

        /* Paragraphs */
        .post-content p {
          margin: 0 0 1.5rem;
        }
        .post-content p:last-child {
          margin-bottom: 0;
        }

        /* Bold and italic */
        .post-content strong {
          font-weight: 600;
          color: var(--ink);
        }
        .post-content em {
          font-style: italic;
        }

        /* Links */
        .post-content a {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.15s ease;
        }
        .post-content a:hover {
          color: var(--accent-2);
        }

        /* Blockquote */
        .post-content blockquote {
          margin: 2rem 0;
          padding: 1.25rem 1.5rem;
          border-left: 3px solid var(--accent);
          background-color: rgba(232, 97, 42, 0.04);
          border-radius: 0 6px 6px 0;
        }
        .post-content blockquote p {
          margin: 0;
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-style: italic;
          color: var(--ink);
        }

        /* Lists */
        .post-content ul,
        .post-content ol {
          margin: 0 0 1.5rem 1.25rem;
          padding: 0;
        }
        .post-content li {
          margin-bottom: 0.4rem;
        }
        .post-content ul li { list-style-type: disc; }
        .post-content ol li { list-style-type: decimal; }

        /* Inline code */
        .post-content code {
          font-family: var(--font-mono);
          font-size: 0.875em;
          background-color: var(--light-2);
          border: 1px solid var(--light-3);
          padding: 0.15em 0.4em;
          border-radius: 4px;
          color: var(--ink);
        }

        /* Code block */
        .post-content pre {
          background-color: var(--dark-3);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin: 0 0 1.5rem;
        }
        .post-content pre code {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          background: none;
          border: none;
          padding: 0;
          color: var(--light);
        }

        /* Horizontal rule */
        .post-content hr {
          border: none;
          border-top: 1px solid var(--light-3);
          margin: 2.5rem 0;
        }

        /* Images */
        .post-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}