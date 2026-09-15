// Molecule: LangSwitcher — 3-button language toggle (PT/ES/EN)
// Used in Header topbar
"use client";

import { useRouter, usePathname } from "@/i18n/navigation";

interface LangSwitcherProps {
  currentLocale: string;
}

const locales = [
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
] as const;

export function LangSwitcher({ currentLocale }: LangSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div style={{ display: "inline-flex", gap: 2 }}>
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => router.replace(pathname, { locale: code })}
          style={{
            padding: "4px 8px",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.06em",
            background: code === currentLocale ? "var(--color-green)" : "transparent",
            color: "var(--color-cream)",
            border: "none",
            cursor: "pointer",
            opacity: code === currentLocale ? 1 : 0.6,
            transition: "opacity 0.15s",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
