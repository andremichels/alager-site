// Molecule: LangSwitcher — 3-button language toggle (PT/ES/EN)
// Used in Header topbar
"use client";

import { useRouter, usePathname } from "next/navigation";

interface LangSwitcherProps {
  currentLocale: string;
}

const locales = [
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export function LangSwitcher({ currentLocale }: LangSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div style={{ display: "inline-flex", gap: 2 }}>
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchTo(code)}
          style={{
            padding: "4px 8px",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.06em",
            background: code === currentLocale ? "var(--color-green)" : "transparent",
            color: code === currentLocale ? "var(--color-cream)" : "var(--color-cream)",
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
