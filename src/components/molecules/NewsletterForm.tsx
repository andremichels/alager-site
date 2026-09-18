// Molecule: NewsletterForm — email input + subscribe button for footer
// Used in Footer organism
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import { track } from "@/lib/analytics";

interface NewsletterFormProps {
  placeholder: string;
  ctaLabel: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ placeholder, ctaLabel }: NewsletterFormProps) {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const ok = res.ok;
      setStatus(ok ? "success" : "error");
      if (ok) track("newsletter_subscribed");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ color: "var(--color-sage)", fontSize: 14 }}>
        {t("subscribed")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={status === "loading"}
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
        <Button variant="gold" disabled={status === "loading"}>
          {status === "loading" ? "…" : ctaLabel}
        </Button>
      </div>
      {status === "error" && (
        <div
          style={{
            color: "#e8b4a0",
            fontSize: 12,
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          {t("newsletterError")}
        </div>
      )}
    </form>
  );
}
