import OverlayShell from "@/components/overlay/OverlayShell";
import OverlayClose from "@/components/overlay/OverlayClose";

const PROJECTS = [
  {
    emoji: "♟",
    title: "Chess App with Minimax AI",
    description:
      "A fully playable chess engine with Minimax + alpha-beta pruning, Elo tracking, and mobile-first single-file architecture.",
    tech: ["JavaScript", "Canvas API", "HTML/CSS"],
    category: "development",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    emoji: "📊",
    title: "Nigeria Tech Talent Data Analysis",
    description:
      "A data analysis project mapping the mismatch between technical training programmes and employer demand across six Nigerian states.",
    tech: ["Python", "Pandas", "Matplotlib", "SQL"],
    category: "data",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    emoji: "🌱",
    title: "AgroSpan GTM Strategy",
    description:
      "A 23-page go-to-market strategy for a fictional B2B agri-tech platform, covering positioning, channels, and messaging.",
    tech: ["Market Research", "Content Strategy", "Figma"],
    category: "marketing",
    liveUrl: "#",
    githubUrl: null,
  },
  {
    emoji: "🎮",
    title: "NOVA STRIKE — Space Shooter",
    description:
      "A Canvas-based 2D space shooter with wave progression, power-ups, and a high-score system. Built iteratively across multiple sessions.",
    tech: ["JavaScript", "Canvas API", "Web Audio"],
    category: "development",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    emoji: "📝",
    title: "JAMB CBT Simulator",
    description:
      "A full exam simulator with 320+ questions, practice and exam modes, and a timer — all in a single HTML file.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "development",
    liveUrl: "#",
    githubUrl: "#",
  },
];

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

export default function ProjectsOverlay() {
  return (
    <OverlayShell>
      <OverlayClose label="Projects" />

      <div className="projects-body">
        {/* ── Header ── */}
        <div className="projects-header">
          <h1 className="projects-title">
            Things I've built,{" "}
            <em className="projects-title-italic">analysed, and shipped.</em>
          </h1>
          <p className="projects-subtitle">
            A collection of projects across development, data, and marketing —
            each one a real attempt at something useful.
          </p>
        </div>

        {/* ── Filter buttons (UI only — logic wired in Phase 5) ── */}
        <div className="projects-filters">
          {FILTERS.map((f, i) => (
            <button
              key={f.value}
              className={`projects-filter-btn${i === 0 ? " projects-filter-btn--active" : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Project list ── */}
        <ul className="projects-list">
          {PROJECTS.map((p) => (
            <li key={p.title} className="project-item">
              <div className="project-item-thumb" aria-hidden="true">
                {p.emoji}
              </div>

              <div className="project-item-body">
                <div className="project-item-top">
                  <span className={`project-item-tag ${CATEGORY_CLASS[p.category]}`}>
                    {CATEGORY_LABEL[p.category]}
                  </span>
                  <h2 className="project-item-title">{p.title}</h2>
                  <p className="project-item-desc">{p.description}</p>
                </div>

                <div className="project-item-bottom">
                  <div className="project-item-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="project-item-tech-tag">{t}</span>
                    ))}
                  </div>

                  <div className="project-item-actions">
                    <a href={p.liveUrl} className="btn-accent project-btn" target="_blank" rel="noopener noreferrer">
                      Live ↗
                    </a>
                    {p.githubUrl && (
                      <a href={p.githubUrl} className="btn-ghost project-btn project-btn-ghost" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .projects-body {
          display: flex;
          flex-direction: column;
          padding: 2.5rem 2rem 4rem;
          gap: 2rem;
          flex: 1;
        }

        /* ── Header ── */
        .projects-header {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .projects-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 400;
          color: var(--ink);
          margin: 0;
          line-height: 1.25;
        }
        .projects-title-italic {
          font-style: italic;
          color: var(--ink-2);
        }
        .projects-subtitle {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--ink-3);
          margin: 0;
          line-height: 1.7;
        }

        /* ── Filters ── */
        .projects-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .projects-filter-btn {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 0.4rem 0.9rem;
          border-radius: 9999px;
          border: 1px solid var(--light-3);
          background: transparent;
          color: var(--ink-3);
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;
        }
        .projects-filter-btn:hover {
          border-color: var(--ink-3);
          color: var(--ink-2);
        }
        .projects-filter-btn--active {
          border-color: var(--accent);
          color: var(--accent);
          background-color: rgba(232, 97, 42, 0.06);
        }

        /* ── Project list ── */
        .projects-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .project-item {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--light-3);
          align-items: flex-start;
        }
        .project-item:first-child {
          border-top: 1px solid var(--light-3);
        }
        .project-item-thumb {
          width: 52px;
          height: 52px;
          border-radius: 10px;
          background-color: var(--light-2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .project-item-body {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex: 1;
          min-width: 0;
        }
        .project-item-top {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .project-item-tag {
          align-self: flex-start;
        }
        .project-item-title {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--ink);
          margin: 0;
          line-height: 1.3;
        }
        .project-item-desc {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          line-height: 1.7;
          color: var(--ink-2);
          margin: 0;
        }
        .project-item-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .project-item-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .project-item-tech-tag {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.05em;
          color: var(--ink-3);
          background-color: var(--light-2);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }
        .project-item-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        .project-btn {
          font-size: 0.75rem;
          padding: 0.35rem 0.85rem;
        }
        .project-btn-ghost {
          border-color: var(--light-3);
          color: var(--ink-2);
        }
        .project-btn-ghost:hover {
          border-color: var(--ink-3);
          color: var(--ink);
        }

        @media (max-width: 500px) {
          .projects-body { padding: 1.75rem 1.25rem 3rem; }
          .project-item-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </OverlayShell>
  );
}