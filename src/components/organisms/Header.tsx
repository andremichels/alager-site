// Organism: Header — topbar verde escuro + sticky nav cream com blur
"use client";

import { useTranslations } from "next-intl";
import { LogoMark } from "@/components/atoms/LogoMark";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Button } from "@/components/atoms/Button";
import { NavLink } from "@/components/molecules/NavLink";
import { LangSwitcher } from "@/components/molecules/LangSwitcher";
import { usePathname } from "next/navigation";

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations("nav");
  const tTop = useTranslations("top");
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}`, label: t("home"), id: "home" },
    { href: `/${locale}/quem-somos`, label: t("about"), id: "about" },
    { href: `/${locale}/energias-renovaveis`, label: t("energy"), id: "energy" },
    { href: `/${locale}/blog`, label: t("blog"), id: "blog" },
    { href: `/${locale}/associe-se`, label: t("join"), id: "join" },
  ];

  // Determine active link from pathname
  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <header>
      {/* Topbar — dark green, 10.5px mono */}
      <div
        style={{
          background: "var(--color-green-deep)",
          padding: "8px 0",
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          color: "var(--color-cream)",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <span style={{ opacity: 0.65 }}>{tTop("tagline")}</span>
            <span style={{ opacity: 0.45 }}>{tTop("since")}</span>
          </div>
          <LangSwitcher currentLocale={locale} />
        </div>
      </div>

      {/* Nav — cream, sticky, backdrop blur */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(245,242,234,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-line)",
          padding: "18px 0",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo + wordmark */}
          <a
            href={`/${locale}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
            <LogoMark size={34} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                letterSpacing: "0.12em",
                color: "var(--color-green)",
                fontWeight: 600,
              }}
            >
              ALAGER
            </span>
          </a>

          {/* Nav links */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
              />
            ))}
          </div>

          {/* CTA */}
          <Button variant="primary" href={`/${locale}/associe-se`}>
            {t("cta")}
          </Button>
        </div>
      </nav>
    </header>
  );
}
