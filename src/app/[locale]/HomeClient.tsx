// Alager Site — Home page client component
"use client";

import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { StatCounter } from "@/components/molecules/StatCounter";
import { PillarCard } from "@/components/molecules/PillarCard";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { LogoMark } from "@/components/atoms/LogoMark";
import { HomeMapSection } from "@/components/organisms/HomeMapSection";
import { COUNTRIES } from "@/data/countries";
import type { Post } from "@/lib/sanity";

interface HomeClientProps {
  locale: string;
  posts: Post[];
}

function formatDate(iso: string, lang: string) {
  const d = new Date(iso);
  const months: Record<string, string[]> = {
    pt: ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],
    es: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
    en: ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],
  };
  const m = months[lang] || months.pt;
  return `${String(d.getDate()).padStart(2, "0")} ${m[d.getMonth()]} ${d.getFullYear()}`;
}

export function HomeClient({ locale, posts }: HomeClientProps) {
  const t = useTranslations("home");
  const tBlog = useTranslations("blog");

  const memberTotal = COUNTRIES.filter((c) => c.member).reduce((a, c) => a + c.members, 0);
  const capacityTotal = COUNTRIES.filter((c) => c.member).reduce((a, c) => a + c.capacity, 0);
  const countryTotal = COUNTRIES.filter((c) => c.member).length;

  return (
    <main>
      {/* HERO */}
      <section style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div className="wrap">
          <div style={{ maxWidth: 900 }}>
            <Kicker>{t("kicker")}</Kicker>
            <Display variant="display-1" style={{ marginTop: 24, marginBottom: 32 }}>
              {t("headline")}
            </Display>
            <BodyText variant="lead" style={{ maxWidth: 540, marginBottom: 40 }}>
              {t("lead")}
            </BodyText>
            <div className="flex gap-16" style={{ flexWrap: "wrap" }}>
              <Button variant="primary" href={`/${locale}/associe-se`}>
                {t("ctaPrimary")} <Icon.Arrow />
              </Button>
              <Button variant="outline" href={`/${locale}/quem-somos`}>
                {t("ctaSecondary")}
              </Button>
            </div>
            <div className="grid-3" style={{ marginTop: 72, gap: 24, paddingTop: 32, borderTop: "1px solid var(--color-line)" }}>
              <StatCounter value={countryTotal} label="Países representados" />
              <StatCounter value={memberTotal} label="Associados ativos" />
              <StatCounter value={Math.round(capacityTotal)} suffix=" GW" label="Capacidade combinada" />
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <HomeMapSection
        locale={locale}
        mapTitle={t("mapTitle")}
        mapKicker={t("mapKicker")}
        mapBody={t("mapBody")}
        mapLegendMember={t("mapLegendMember")}
        mapLegendObs={t("mapLegendObs")}
      />

      {/* PILLARS */}
      <section className="section" style={{ background: "var(--color-cream-deep)" }}>
        <div className="wrap">
          <Kicker>{t("pillarsKicker")}</Kicker>
          <div className="grid-4" style={{ gap: 32, marginTop: 40 }}>
            {(t.raw("pillars") as any[]).map((p: any, i: number) => (
              <PillarCard key={i} number={p.n} title={p.t} body={p.b} />
            ))}
          </div>
        </div>
      </section>

      {/* VOICE */}
      <section className="section">
        <div className="wrap">
          <div className="grid-1-2" style={{ gap: 48, alignItems: "start" }}>
            <div>
              <Kicker>{t("voiceKicker")}</Kicker>
              <PhotoPlaceholder label="FOTO · MARCELO RENAULT · 3:4" aspectRatio="3/4" />
              <div style={{ marginTop: 16 }}>
                <div className="serif" style={{ fontSize: 22 }}>{t("voiceName")}</div>
                <div className="mono" style={{ color: "var(--color-muted)", marginTop: 4 }}>{t("voiceRole")}</div>
              </div>
            </div>
            <div style={{ paddingTop: 24 }}>
              <div className="serif" style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.25, letterSpacing: "-0.01em", color: "var(--color-green-deep)" }}>
                {t("voiceQuote")}
              </div>
              <div style={{ width: "100%", height: 1, background: "var(--color-line)", margin: "40px 0" }} />
              <BodyText style={{ maxWidth: 620 }}>A presidência da ALAGER é eleita pela Assembleia Geral para mandatos de dois anos.</BodyText>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS (from Sanity) */}
      <section className="section" style={{ background: "var(--color-green-deep)", color: "var(--color-cream)" }}>
        <div className="wrap">
          <div className="eyebrow-row" style={{ alignItems: "flex-end" }}>
            <div>
              <Kicker gold>{t("newsKicker")}</Kicker>
              <Display variant="display-2" style={{ color: "var(--color-cream)", marginTop: 16 }}>
                {t("newsTitle")}
              </Display>
            </div>
            <Button variant="gold" href={`/${locale}/blog`}>{t("newsAll")}</Button>
          </div>
          <div className="grid-3" style={{ gap: 32, marginTop: 48 }}>
            {posts.map((post, i) => (
              <article key={post._id || i} style={{ paddingTop: 24, borderTop: "1px solid #ffffff30" }}>
                <div className="flex between" style={{ marginBottom: 24 }}>
                  <span className="mono" style={{ color: "var(--color-gold)" }}>{(post.cat as any)[locale] || ""}</span>
                  <span className="mono" style={{ color: "#9ab1a3" }}>{formatDate(post.date, locale)}</span>
                </div>
                <h3 className="serif" style={{ fontSize: 24, lineHeight: 1.2, color: "var(--color-cream)", letterSpacing: "-0.01em", fontWeight: 400 }}>
                  {(post.title as any)[locale] || ""}
                </h3>
                <p style={{ marginTop: 16, fontSize: 14, color: "#c6d4c9", lineHeight: 1.55 }}>
                  {(post.excerpt as any)[locale] || ""}
                </p>
                <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <a href={`/${locale}/blog`} className="mono" style={{ color: "var(--color-gold)", textDecoration: "none" }}>{tBlog("readMore")} →</a>
                  <span className="mono" style={{ color: "#9ab1a3" }}>{post.read} {tBlog("minRead")}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="section">
        <div className="wrap">
          <div className="grid-2-1" style={{ background: "var(--color-green)", padding: "80px 64px", color: "var(--color-cream)", gap: 64, alignItems: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 360, height: 360, opacity: 0.05 }}>
              <LogoMark size={360} color="var(--color-cream)" accent="var(--color-gold)" />
            </div>
            <div>
              <Kicker gold>{t("joinKicker")}</Kicker>
              <Display variant="display-2" style={{ marginTop: 20, color: "var(--color-cream)" }}>{t("joinTitle")}</Display>
              <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.55, color: "#c6d4c9", maxWidth: 600 }}>{t("joinBody")}</p>
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              <Button variant="gold" href={`/${locale}/associe-se`} style={{ justifyContent: "center" }}>
                {t("ctaPrimary")} <Icon.Arrow />
              </Button>
              <button className="btn" style={{ background: "transparent", border: "1px solid #ffffff40", color: "var(--color-cream)", justifyContent: "center" }}>
                Conheça a estrutura
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
