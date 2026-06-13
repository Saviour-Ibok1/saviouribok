import OverlayShell from "@/components/overlay/OverlayShell";
import OverlayClose from "@/components/overlay/OverlayClose";

const SKILLS = [
  { label: "Next.js",       category: "development" },
  { label: "TypeScript",    category: "development" },
  { label: "React",         category: "development" },
  { label: "Node.js",       category: "development" },
  { label: "Tailwind CSS",  category: "development" },
  { label: "SQL / Postgres",category: "data"        },
  { label: "Python",        category: "data"        },
  { label: "Data Viz",      category: "data"        },
  { label: "Spreadsheets",  category: "data"        },
  { label: "Supabase",      category: "data"        },
  { label: "GTM Strategy",  category: "marketing"   },
  { label: "Content Writing",category: "marketing"  },
  { label: "SEO",           category: "marketing"   },
  { label: "Social Media",  category: "marketing"   },
  { label: "Brand Strategy",category: "marketing"   },
];

const CERTS = [
  {
    name: "Google Data Analytics Certificate",
    issuer: "Google / Coursera",
    year: "2024",
    icon: "◎",
  },
  {
    name: "3MTT Technical Talent Programme",
    issuer: "Federal Ministry of Communications",
    year: "2024",
    icon: "◈",
  },
  {
    name: "Digital & Product Marketing Programme",
    issuer: "Coover Consults",
    year: "2025",
    icon: "↗",
  },
];

const SKILL_CLASS: Record<string, string> = {
  development: "tag-dev",
  data:        "tag-data",
  marketing:   "tag-marketing",
};

export default function AboutOverlay() {
  return (
    <OverlayShell>
      <OverlayClose label="About" />

      <div className="about-body">
        {/* ── Hero row ── */}
        <div className="about-hero-row">
          {/* Avatar placeholder */}
          <div className="about-avatar" aria-hidden="true">
            <span className="about-avatar-initials">SI</span>
          </div>

          <div className="about-hero-text">
            <h1 className="about-name">
              Saviour Joseph Ibok,{" "}
              <em className="about-name-italic">builder &amp; writer.</em>
            </h1>
            <p className="about-tagline">
              300L Computer Engineering · University of Uyo, Nigeria
            </p>
          </div>
        </div>

        {/* ── Bio ── */}
        <div className="about-section">
          <p className="about-bio">
            I'm a developer-in-training, a Google-certified data analyst, and a
            content marketer — not because I couldn't pick one, but because the
            intersection of all three is where the most interesting problems
            live. I build things that work, I find patterns in data, and I write
            about both.
          </p>
          <p className="about-bio">
            Currently a Content Marketing Lead at BRIMS Gadget Startup and
            Content Manager at ACES (Association of Computer Engineering
            Students, Uniuyo). I'm actively building projects across all three
            disciplines and documenting the process on this site.
          </p>
          <p className="about-bio">
            In 2024, a project I built — <em>The Bridge</em>, an AI-powered
            platform addressing graduate unemployment — won the 3MTT × NextGen
            Knowledge Showcase. That was the moment I stopped treating my
            interests as separate tracks and started treating them as one.
          </p>
        </div>

        {/* ── Skills ── */}
        <div className="about-section">
          <span className="about-section-label label">Capabilities</span>
          <div className="about-skills-grid">
            {SKILLS.map((s) => (
              <span key={s.label} className={`about-skill-chip ${SKILL_CLASS[s.category]}`}>
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Certs ── */}
        <div className="about-section">
          <span className="about-section-label label">Certifications</span>
          <ul className="about-certs-list">
            {CERTS.map((c) => (
              <li key={c.name} className="about-cert-item">
                <span className="about-cert-icon">{c.icon}</span>
                <div className="about-cert-text">
                  <span className="about-cert-name">{c.name}</span>
                  <span className="about-cert-meta">
                    {c.issuer} · {c.year}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .about-body {
          display: flex;
          flex-direction: column;
          padding: 2.5rem 2rem 4rem;
          gap: 2.5rem;
          flex: 1;
        }

        /* ── Hero row ── */
        .about-hero-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .about-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background-color: var(--light-3);
          border: 2px solid var(--light-3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .about-avatar-initials {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--ink-2);
          user-select: none;
        }
        .about-hero-text {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .about-name {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 400;
          color: var(--ink);
          margin: 0;
          line-height: 1.2;
        }
        .about-name-italic {
          font-style: italic;
          color: var(--ink-2);
        }
        .about-tagline {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: var(--ink-3);
          margin: 0;
        }

        /* ── Section ── */
        .about-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .about-section-label {
          color: var(--ink-3) !important;
        }

        /* ── Bio ── */
        .about-bio {
          font-family: var(--font-sans);
          font-size: 0.975rem;
          line-height: 1.85;
          color: var(--ink-2);
          margin: 0;
        }
        .about-bio em {
          font-style: italic;
          color: var(--ink);
        }

        /* ── Skills ── */
        .about-skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .about-skill-chip {
          font-size: 0.72rem;
          padding: 0.3rem 0.7rem;
        }

        /* ── Certs ── */
        .about-certs-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .about-cert-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--light-3);
        }
        .about-cert-item:first-child {
          border-top: 1px solid var(--light-3);
        }
        .about-cert-icon {
          font-size: 1rem;
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .about-cert-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .about-cert-name {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--ink);
        }
        .about-cert-meta {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          color: var(--ink-3);
        }

        @media (max-width: 500px) {
          .about-body { padding: 1.75rem 1.25rem 3rem; }
          .about-name { font-size: 1.3rem; }
        }
      `}</style>
    </OverlayShell>
  );
}