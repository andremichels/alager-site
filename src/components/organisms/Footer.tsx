// Organism: Footer — 4 columns: logo+address, navigation, institutional, newsletter
// Dark green background

import { useTranslations } from "next-intl";
import { LogoMark } from "@/components/atoms/LogoMark";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { NewsletterForm } from "@/components/molecules/NewsletterForm";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const navCol = [
    { label: tNav("home"), href: `/${locale}` },
    { label: tNav("about"), href: `/${locale}/quem-somos` },
    { label: tNav("energy"), href: `/${locale}/energias-renovaveis` },
    { label: tNav("blog"), href: `/${locale}/blog` },
    { label: tNav("join"), href: `/${locale}/associe-se` },
  ];

  const instCol = [
    { label: t("privacy"), href: "#" },
    { label: t("transparency"), href: "#" },
  ];

  const baseTextStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    color: "#b5c7b5",
    lineHeight: 1.7,
  };

  const linkStyle: React.CSSProperties = {
    ...baseTextStyle,
    textDecoration: "none",
    display: "block",
    marginBottom: 6,
  };

  return (
    <footer
      style={{
        background: "var(--color-green-deep)",
        padding: "80px 0 48px",
        color: "var(--color-cream)",
        marginTop: "auto",
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr",
            gap: 48,
          }}
        >
          {/* Col 1: Logo + address */}
          <div>
            <a
              href={`/${locale}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
                marginBottom: 24,
              }}
            >
              <LogoMark size={32} accent="var(--color-gold)" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  letterSpacing: "0.12em",
                  color: "var(--color-cream)",
                  fontWeight: 600,
                }}
              >
                ALAGER
              </span>
            </a>
            <p style={baseTextStyle}>{t("tagline")}</p>
            <div style={{ marginTop: 24 }}>
              <MonoLabel color="var(--color-gold)">
                {locale === "pt" ? "Sede" : locale === "es" ? "Sede" : "Headquarters"}
              </MonoLabel>
              <p style={{ ...baseTextStyle, marginTop: 8 }}>{t("addr")}</p>
              <p style={{ ...baseTextStyle, marginTop: 4 }}>{t("addrLine")}</p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <MonoLabel color="var(--color-gold)">{t("colNav")}</MonoLabel>
            <div style={{ marginTop: 16 }}>
              {navCol.map((link) => (
                <a key={link.href} href={link.href} style={linkStyle}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Institutional */}
          <div>
            <MonoLabel color="var(--color-gold)">{t("colAbout")}</MonoLabel>
            <div style={{ marginTop: 16 }}>
              {instCol.map((link) => (
                <a key={link.label} href={link.href} style={linkStyle}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <MonoLabel color="var(--color-gold)">{t("newsletter")}</MonoLabel>
            <p style={{ ...baseTextStyle, marginTop: 12, marginBottom: 16 }}>
              {t("newsletterDesc")}
            </p>
            <NewsletterForm
              placeholder={t("newsletterPh")}
              ctaLabel={t("newsletterCta")}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid #ffffff20",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <MonoLabel>{t("copy")}</MonoLabel>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#" style={{ color: "var(--color-muted)", textDecoration: "none" }}>
              <MonoLabel>{t("privacy")}</MonoLabel>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
