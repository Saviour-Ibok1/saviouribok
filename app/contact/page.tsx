import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Saviour Ibok — open to work, collaborations, and conversations.",
};

const SOCIAL_LINKS = [
  { label: "GitHub",    href: "https://github.com/saviouribok",      icon: "⌥", desc: "See my code"         },
  { label: "LinkedIn",  href: "https://linkedin.com/in/saviouribok",  icon: "◈", desc: "Connect with me"     },
  { label: "X",         href: "https://x.com/saviouribok",           icon: "✦", desc: "Follow my thoughts"  },
  { label: "WhatsApp",  href: "https://wa.me/234000000000",           icon: "◎", desc: "Message me directly" },
];

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "var(--light)", minHeight: "calc(100vh - 64px)" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "3rem 2rem 4rem", display: "flex", flexDirection: "column", gap: "2.25rem" }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
            fontWeight: 400,
            color: "var(--ink)",
            margin: 0,
            lineHeight: 1.25,
          }}>
            Let's work{" "}
            <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>together.</em>
          </h1>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            color: "var(--ink-3)",
            margin: 0,
            lineHeight: 1.7,
          }}>
            Have a project in mind, a role to fill, or just want to talk? Fill
            in the form and I'll get back to you within 48 hours.
          </p>
        </div>

        {/* Live contact form */}
        <ContactForm />

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ flex: 1, height: "1px", backgroundColor: "var(--light-3)" }} />
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
            whiteSpace: "nowrap",
          }}>
            Or find me on
          </span>
          <span style={{ flex: 1, height: "1px", backgroundColor: "var(--light-3)" }} />
        </div>

        {/* Social links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1rem",
                backgroundColor: "var(--light-2)",
                border: "1px solid var(--light-3)",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "1rem", color: "var(--accent)", flexShrink: 0 }}>{s.icon}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem", flex: 1, minWidth: 0 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 500, color: "var(--ink)" }}>
                  {s.label}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.04em", color: "var(--ink-3)" }}>
                  {s.desc}
                </span>
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-3)", flexShrink: 0 }}>→</span>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}