import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/saviouribok",     external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/saviouribok", external: true },
  { label: "X",        href: "https://x.com/saviouribok",          external: true },
  { label: "WhatsApp", href: "https://wa.me/234000000000",          external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Left — logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="pulse-dot" aria-hidden="true" />
          <Link href="/" className="footer-logo">
            Saviour Ibok
          </Link>
        </div>

        {/* Centre — copyright */}
        <span className="footer-copy">© {year} SAVIOUR IBOK</span>

        {/* Right — social links */}
        <div className="footer-socials">
          {SOCIAL_LINKS.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              className="footer-social-link"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--dark-2);
          border-top: 1px solid var(--border);
          padding: 2rem 1.5rem;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
        }
        .footer-logo {
          font-family: var(--font-serif);
          font-size: 1rem;
          color: rgba(245,242,237,0.7);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-logo:hover { color: rgba(245,242,237,1); }
        .footer-copy {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.25);
          text-align: center;
          white-space: nowrap;
        }
        .footer-socials {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1.25rem;
        }
        .footer-social-link {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-social-link:hover { color: rgba(255,255,255,0.75); }
        @media (max-width: 600px) {
          .footer-inner {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
            gap: 1.25rem;
          }
          .footer-socials { justify-content: center; }
        }
      `}</style>
    </footer>
  );
}