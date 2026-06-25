// Molecule: NewsletterForm — email input + subscribe button for footer
// Used in Footer organism
"use client";

import { useState } from "react";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";

interface NewsletterFormProps {
  placeholder: string;
  ctaLabel: string;
}

export function NewsletterForm({ placeholder, ctaLabel }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubmitted(true);
      // TODO: connect to n8n webhook or newsletter service
    }
  };

  if (submitted) {
    return (
      <div style={{ color: "var(--color-sage)", fontSize: 14 }}>
        Inscrito ✓
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        style={{
          flex: 1,
          padding: "10px 14px",
          background: "transparent",
          border: "1px solid #ffffff30",
          color: "var(--color-cream)",
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          outline: "none",
        }}
      />
      <Button variant="gold" onClick={() => {}}>
        {ctaLabel}
      </Button>
    </form>
  );
}
