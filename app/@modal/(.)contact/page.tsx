import OverlayShell from "@/components/overlay/OverlayShell";
import OverlayClose from "@/components/overlay/OverlayClose";
import ContactForm from "@/components/contact/ContactForm";

const SOCIAL_LINKS = [
  { label: "GitHub",    href: "https://github.com/saviouribok",      icon: "⌥", desc: "See my code"         },
  { label: "LinkedIn",  href: "https://linkedin.com/in/saviouribok",  icon: "◈", desc: "Connect with me"     },
  { label: "X",         href: "https://x.com/saviouribok",           icon: "✦", desc: "Follow my thoughts"  },
  { label: "WhatsApp",  href: "https://wa.me/234000000000",           icon: "◎", desc: "Message me directly" },
];

export default function ContactOverlay() {
  return (
    <OverlayShell>
      <OverlayClose label="Contact" />

      <div className="contact-body">
        {/* ── Header ── */}
        <div className="contact-header">
          <h1 className="contact-title">
            Let's work{" "}
            <em className="contact-title-italic">together.</em>
          </h1>
          <p className="contact-subtitle">
            Have a project in mind, a role to fill, or just want to talk? Fill
            in the form and I'll get back to you within 48 hours.
          </p>
        </div>

        {/* ── Live contact form ── */}
        <ContactForm />

        {/* ── Divider ── */}
        <div className="contact-divider">
          <span className="contact-divider-line" aria-hidden="true" />
          <span className="contact-divider-label label">Or find me on</span>
          <span className="contact-divider-line" aria-hidden="true" />
        </div>

        {/* ── Social links ── */}
        <div className="contact-socials">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
            >
              <span className="contact-social-icon">{s.icon}</span>
              <div className="contact-social-text">
                <span className="contact-social-label">{s.label}</span>
                <span className="contact-social-desc">{s.desc}</span>
              </div>
              <span className="contact-social-arrow">→</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .contact-body {
          display: flex;
          flex-direction: column;
          padding: 2.5rem 2rem 4rem;
          gap: 2.25rem;
          flex: 1;
        }
        .contact-header {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .contact-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 400;
          color: var(--ink);
          margin: 0;
          line-height: 1.25;
        }
        .contact-title-italic {
          font-style: italic;
          color: var(--ink-2);
        }
        .contact-subtitle {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--ink-3);
          margin: 0;
          line-height: 1.7;
          max-width: 460px;
        }
        .contact-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .contact-divider-line {
          flex: 1;
          height: 1px;
          background-color: var(--light-3);
        }
        .contact-divider-label {
          color: var(--ink-3);
          white-space: nowrap;
        }
        .contact-socials {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .contact-social-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          background-color: var(--light-2);
          border: 1px solid var(--light-3);
          border-radius: 8px;
          text-decoration: none;
          transition: border-color 0.15s ease, background-color 0.15s ease;
        }
        .contact-social-link:hover {
          border-color: var(--accent);
          background-color: var(--light);
        }
        .contact-social-icon {
          font-size: 1rem;
          color: var(--accent);
          flex-shrink: 0;
        }
        .contact-social-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          flex: 1;
          min-width: 0;
        }
        .contact-social-label {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--ink);
        }
        .contact-social-desc {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.04em;
          color: var(--ink-3);
        }
        .contact-social-arrow {
          font-size: 0.8rem;
          color: var(--ink-3);
          transition: color 0.15s ease, transform 0.15s ease;
          flex-shrink: 0;
        }
        .contact-social-link:hover .contact-social-arrow {
          color: var(--accent);
          transform: translateX(2px);
        }
        @media (max-width: 500px) {
          .contact-body { padding: 1.75rem 1.25rem 3rem; }
          .contact-socials { grid-template-columns: 1fr; }
        }
      `}</style>
    </OverlayShell>
  );
}