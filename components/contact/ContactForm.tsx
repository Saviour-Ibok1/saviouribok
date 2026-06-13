"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const SUBJECTS = [
  { value: "",           label: "Select a topic…"          },
  { value: "project",   label: "Project collaboration"     },
  { value: "freelance", label: "Freelance / contract work" },
  { value: "fulltime",  label: "Full-time opportunity"     },
  { value: "feedback",  label: "Feedback on my work"       },
  { value: "other",     label: "Something else"            },
];

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg]   = useState("");

  const [fields, setFields] = useState({
    name:    "",
    email:   "",
    subject: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name:    "",
    email:   "",
    message: "",
  });

  function update(field: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    // Clear field error on change
    if (field in fieldErrors) {
      setFieldErrors((e) => ({ ...e, [field]: "" }));
    }
  }

  function validate(): boolean {
    const errors = { name: "", email: "", message: "" };
    let valid = true;

    if (fields.name.trim().length < 2) {
      errors.name = "Please enter your full name.";
      valid = false;
    }
    if (!fields.email.includes("@") || !fields.email.includes(".")) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (fields.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
      valid = false;
    }

    setFieldErrors(errors);
    return valid;
  }

  async function handleSubmit() {
    if (formState === "loading") return;
    if (!validate()) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(fields),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  }

  // Success state
  if (formState === "success") {
    return (
      <div className="contact-success">
        <span className="contact-success-icon">✓</span>
        <h3 className="contact-success-title">Message sent.</h3>
        <p className="contact-success-body">
          Thanks for reaching out, {fields.name.split(" ")[0]}. I'll get back
          to you within 48 hours.
        </p>
        <button
          onClick={() => {
            setFormState("idle");
            setFields({ name: "", email: "", subject: "", message: "" });
          }}
          className="contact-success-reset"
        >
          Send another message
        </button>

        <style>{`
          .contact-success {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.6rem;
            padding: 2rem;
            background-color: rgba(47, 179, 128, 0.06);
            border: 1px solid rgba(47, 179, 128, 0.25);
            border-radius: 8px;
          }
          .contact-success-icon {
            font-size: 1.4rem;
            color: #2fb380;
          }
          .contact-success-title {
            font-family: var(--font-serif);
            font-size: 1.3rem;
            font-weight: 400;
            color: var(--ink);
            margin: 0;
          }
          .contact-success-body {
            font-family: var(--font-sans);
            font-size: 0.9rem;
            color: var(--ink-2);
            margin: 0;
            line-height: 1.7;
          }
          .contact-success-reset {
            font-family: var(--font-mono);
            font-size: 0.68rem;
            letter-spacing: 0.07em;
            color: var(--ink-3);
            background: none;
            border: none;
            cursor: pointer;
            text-decoration: underline;
            text-underline-offset: 3px;
            padding: 0;
            margin-top: 0.25rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="contact-form-wrapper">
      {/* Fields */}
      <div className="cf-field">
        <label htmlFor="cf-name" className="cf-label label">Name</label>
        <input
          id="cf-name"
          type="text"
          placeholder="Your full name"
          value={fields.name}
          onChange={(e) => update("name", e.target.value)}
          className={`cf-input${fieldErrors.name ? " cf-input-error" : ""}`}
          autoComplete="name"
          disabled={formState === "loading"}
        />
        {fieldErrors.name && <span className="cf-error">{fieldErrors.name}</span>}
      </div>

      <div className="cf-field">
        <label htmlFor="cf-email" className="cf-label label">Email</label>
        <input
          id="cf-email"
          type="email"
          placeholder="you@example.com"
          value={fields.email}
          onChange={(e) => update("email", e.target.value)}
          className={`cf-input${fieldErrors.email ? " cf-input-error" : ""}`}
          autoComplete="email"
          disabled={formState === "loading"}
        />
        {fieldErrors.email && <span className="cf-error">{fieldErrors.email}</span>}
      </div>

      <div className="cf-field">
        <label htmlFor="cf-subject" className="cf-label label">Subject</label>
        <select
          id="cf-subject"
          value={fields.subject}
          onChange={(e) => update("subject", e.target.value)}
          className="cf-input cf-select"
          disabled={formState === "loading"}
        >
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="cf-field">
        <label htmlFor="cf-message" className="cf-label label">Message</label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="Tell me what's on your mind…"
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          className={`cf-input cf-textarea${fieldErrors.message ? " cf-input-error" : ""}`}
          disabled={formState === "loading"}
        />
        {fieldErrors.message && <span className="cf-error">{fieldErrors.message}</span>}
      </div>

      {/* Global error */}
      {formState === "error" && errorMsg && (
        <div className="cf-global-error">{errorMsg}</div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={formState === "loading"}
        className="btn-accent cf-submit"
      >
        {formState === "loading" ? "Sending…" : "Send message ↗"}
      </button>

      <style>{`
        .contact-form-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .cf-label {
          color: var(--ink-3) !important;
        }
        .cf-input {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--ink);
          background-color: var(--light-2);
          border: 1px solid var(--light-3);
          border-radius: 6px;
          padding: 0.65rem 0.875rem;
          width: 100%;
          outline: none;
          transition: border-color 0.15s ease, background-color 0.15s ease;
          appearance: none;
        }
        .cf-input::placeholder { color: var(--ink-3); }
        .cf-input:focus {
          border-color: var(--accent);
          background-color: var(--light);
        }
        .cf-input-error {
          border-color: #e24b4a !important;
        }
        .cf-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .cf-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237a7570' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.875rem center;
          padding-right: 2.25rem;
          cursor: pointer;
        }
        .cf-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.7;
        }
        .cf-error {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.04em;
          color: #e24b4a;
        }
        .cf-global-error {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          color: #e24b4a;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(226, 75, 74, 0.25);
          border-radius: 6px;
          background-color: rgba(226, 75, 74, 0.05);
        }
        .cf-submit {
          align-self: flex-start;
          font-size: 0.875rem;
          padding: 0.6rem 1.5rem;
        }
        .cf-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
}