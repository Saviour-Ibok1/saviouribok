"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",     href: "/",         type: "page"    },
  { label: "Blog",     href: "/blog",     type: "page"    },
  { label: "About",    href: "/about",    type: "overlay" },
  { label: "Projects", href: "/projects", type: "overlay" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Add a slightly stronger background once user scrolls */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* Trap body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "64px",
          display: "flex",
          alignItems: "center",
          backgroundColor: scrolled
            ? "rgba(10,10,10,0.95)"
            : "rgba(10,10,10,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          transition: "background-color 0.3s ease",
        }}
      >
        <nav
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
            aria-label="Saviour Ibok — home"
          >
            <span className="pulse-dot" aria-hidden="true" />
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.1rem",
                color: "#f5f2ed",
                letterSpacing: "0.01em",
              }}
            >
              Saviour Ibok
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link${pathname === href ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}

            {/* Contact CTA pill */}
            <Link href="/contact" className="btn-accent" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }}>
              Contact
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "rgba(245,242,237,0.8)",
              cursor: "pointer",
              padding: "0.25rem",
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          backgroundColor: "rgba(10,10,10,0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          display: "flex",
          flexDirection: "column",
          padding: "5.5rem 1.5rem 2rem",
          gap: "0.25rem",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2rem",
              color: pathname === href ? "var(--accent)" : "rgba(245,242,237,0.85)",
              textDecoration: "none",
              padding: "0.6rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              transition: "color 0.2s ease",
            }}
          >
            {label}
          </Link>
        ))}

        <Link
          href="/contact"
          className="btn-accent"
          style={{ marginTop: "1.5rem", alignSelf: "flex-start" }}
        >
          Contact
        </Link>

        <span
          className="label-light"
          style={{ marginTop: "auto", paddingTop: "2rem" }}
        >
          saviouribok.com
        </span>
      </div>

      {/* ── Responsive styles (injected as a style tag) ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}