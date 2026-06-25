// Organism: Header — responsive: hamburger menu on mobile
"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/atoms/LogoMark";
import { Button } from "@/components/atoms/Button";
import { NavLink } from "@/components/molecules/NavLink";
import { LangSwitcher } from "@/components/molecules/LangSwitcher";

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations("nav");
  const tTop = useTranslations("top");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on escape
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: `/${locale}`, label: t("home"), id: "home" },
    { href: `/${locale}/quem-somos`, label: t("about"), id: "about" },
    { href: `/${locale}/energias-renovaveis`, label: t("energy"), id: "energy" },
    { href: `/${locale}/blog`, label: t("blog"), id: "blog" },
    { href: `/${locale}/associe-se`, label: t("join"), id: "join" },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <header>
      {/* Topbar */}
      <div style={{
        background: "var(--color-green-deep)",
        padding: "8px 0",
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        color: "var(--color-cream)",
      }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 32 }}>
            <span className="topbar-text" style={{ opacity: 0.65 }}>{tTop("tagline")}</span>
            <span className="topbar-text" style={{ opacity: 0.45 }}>{tTop("since")}</span>
          </div>
          <LangSwitcher currentLocale={locale} />
        </div>
      </div>

      {/* Nav */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(245,242,234,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-line)",
        padding: "14px 0",
      }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href={`/${locale}`} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", zIndex: 51 }}>
            <LogoMark size={32} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.12em", color: "var(--color-green)", fontWeight: 600 }}>
              ALAGER
            </span>
          </a>

          {/* Desktop nav */}
          <div className="topbar-text" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {navLinks.map((link) => (
              <NavLink key={link.id} href={link.href} label={link.label} active={isActive(link.href)} />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="topbar-text">
            <Button variant="primary" href={`/${locale}/associe-se`}>
              {t("cta")}
            </Button>
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="hamburger-btn"
            style={{
              display: "none",
              zIndex: 51,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
            }}
          >
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="var(--color-green)" strokeWidth="2">
              {menuOpen ? (
                <path d="M4 4l16 8M4 12l16-8" />
              ) : (
                <>
                  <line x1="0" y1="1" x2="24" y2="1" />
                  <line x1="0" y1="8" x2="24" y2="8" />
                  <line x1="0" y1="15" x2="24" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile overlay menu */}
        {menuOpen && (
          <div style={{
            position: "fixed",
            inset: 0,
            top: 0,
            zIndex: 49,
            background: "var(--color-cream)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 32,
            padding: 24,
          }}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(28px, 6vw, 44px)",
                  color: isActive(link.href) ? "var(--color-green)" : "var(--color-ink)",
                  textDecoration: "none",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  borderBottom: isActive(link.href) ? "2px solid var(--color-gold)" : "none",
                  paddingBottom: 4,
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ marginTop: 24 }}>
              <Button variant="primary" href={`/${locale}/associe-se`}>
                {t("cta")}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Inline CSS for hamburger visibility */}
      <style jsx>{`
        .hamburger-btn {
          display: none !important;
        }
        @media (max-width: 768px) {
          .hamburger-btn {
            display: flex !important;
          }
          .topbar-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
