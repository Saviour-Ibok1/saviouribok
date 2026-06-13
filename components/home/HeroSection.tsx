// Server Component — no interactivity needed, all effects are CSS
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Radial glow — orange top-right */}
      <div className="hero-glow hero-glow-orange" aria-hidden="true" />
      {/* Radial glow — blue bottom-left */}
      <div className="hero-glow hero-glow-blue" aria-hidden="true" />
      {/* Noise texture */}
      <div className="hero-noise" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          <span className="label-light">Open to work &amp; collaborations</span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          Developer. Analyst.
          <br />
          <em className="hero-headline-italic">Marketer. All three, on purpose.</em>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          I'm Saviour Ibok — I build full-stack products, extract meaning from
          data, and craft content strategies that move people. This is where I
          write about all three.
        </p>

        {/* Discipline pills */}
        <div className="hero-pills">
          <Link href="/projects?filter=development" className="hero-pill hero-pill-dev">
            Full-Stack Dev
          </Link>
          <Link href="/projects?filter=data" className="hero-pill hero-pill-data">
            ◎ Data Analysis
          </Link>
          <Link href="/projects?filter=marketing" className="hero-pill hero-pill-marketing">
            ↗ Digital Marketing
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="scroll-hint">↓</span>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: calc(100vh - 64px);
          background-color: var(--dark);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 5rem 1.5rem 6rem;
        }

        /* ── Glows ── */
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(120px);
          z-index: 0;
        }
        .hero-glow-orange {
          width: 600px;
          height: 600px;
          top: -180px;
          right: -120px;
          background: radial-gradient(circle, rgba(232,97,42,0.18) 0%, transparent 70%);
        }
        .hero-glow-blue {
          width: 500px;
          height: 500px;
          bottom: -100px;
          left: -80px;
          background: radial-gradient(circle, rgba(74,158,255,0.13) 0%, transparent 70%);
        }

        /* ── Noise ── */
        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px 200px;
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: overlay;
        }

        /* ── Content ── */
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 780px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* ── Eyebrow ── */
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hero-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent);
          display: inline-block;
          flex-shrink: 0;
        }

        /* ── Headline ── */
        .hero-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: var(--light);
          margin: 0;
        }
        .hero-headline-italic {
          font-style: italic;
          color: rgba(245, 242, 237, 0.5);
        }

        /* ── Subtitle ── */
        .hero-subtitle {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(245, 242, 237, 0.55);
          margin: 0;
          max-width: 560px;
        }

        /* ── Pills ── */
        .hero-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.625rem;
          margin-top: 0.25rem;
        }
        .hero-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.45rem 1.1rem;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.05em;
          text-decoration: none;
          border: 1px solid;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .hero-pill-dev {
          color: var(--blue);
          border-color: rgba(74, 158, 255, 0.3);
          background-color: rgba(74, 158, 255, 0.06);
        }
        .hero-pill-dev:hover {
          background-color: rgba(74, 158, 255, 0.14);
        }
        .hero-pill-data {
          color: var(--green);
          border-color: rgba(47, 179, 128, 0.3);
          background-color: rgba(47, 179, 128, 0.06);
        }
        .hero-pill-data:hover {
          background-color: rgba(47, 179, 128, 0.14);
        }
        .hero-pill-marketing {
          color: var(--accent);
          border-color: rgba(232, 97, 42, 0.3);
          background-color: rgba(232, 97, 42, 0.06);
        }
        .hero-pill-marketing:hover {
          background-color: rgba(232, 97, 42, 0.14);
        }

        /* ── Scroll hint ── */
        .hero-scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.2);
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .hero-section { padding: 4rem 1.25rem 5rem; }
          .hero-subtitle { font-size: 0.95rem; }
        }
      `}</style>
    </section>
  );
}