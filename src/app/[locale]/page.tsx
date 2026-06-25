// Alager Site — Home page with full organisms
import { useTranslations, useLocale } from "next-intl";
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

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("home");
  const tBlog = useTranslations("blog");

  const memberTotal = COUNTRIES.filter((c) => c.member).reduce((a, c) => a + c.members, 0);
  const capacityTotal = COUNTRIES.filter((c) => c.member).reduce((a, c) => a + c.capacity, 0);
  const countryTotal = COUNTRIES.filter((c) => c.member).length;

  // Placeholder posts (will come from Sanity later)
  const placeholderPosts = [
    { title: "Brasil avança com marco regulatório para eólicas offshore", excerpt: "Projeto de lei aprovado no Senado estabelece critérios para cessão de áreas marítimas.", cat: "Regulação", date: "15 jun 2026", read: 6 },
    { title: "ALAGER participa de audiência sobre integração energética no Mercosul", excerpt: "Posicionamento conjunto entregue à Comissão de Infraestrutura do bloco.", cat: "Posições", date: "10 jun 2026", read: 4 },
    { title: "Colômbia lança leilão de armazenamento", excerpt: "Primeiro leilão dedicado exclusivamente a baterias na América Latina.", cat: "Mercado", date: "28 mai 2026", read: 5, membersOnly: true },
  ];

  return (
    <main>
      {/* ═══════════ HERO ═══════════ */}
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
              <Button variant="primary" href="/pt/associe-se">
                {t("ctaPrimary")} <Icon.Arrow />
              </Button>
              <Button variant="outline" href="/pt/quem-somos">
                {t("ctaSecondary")}
              </Button>
            </div>

            {/* Stat strip */}
            <div
              style={{
                marginTop: 72,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
                paddingTop: 32,
                borderTop: "1px solid var(--color-line)",
              }}
            >
              <StatCounter value={countryTotal} label="Países representados" />
              <StatCounter value={memberTotal} label="Associados ativos" />
              <StatCounter value={Math.round(capacityTotal)} suffix=" GW" label="Capacidade combinada" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MAP ═══════════ */}
      <HomeMapSection
        locale="pt"
        mapTitle={t("mapTitle")}
        mapKicker={t("mapKicker")}
        mapBody={t("mapBody")}
        mapLegendMember={t("mapLegendMember")}
        mapLegendObs={t("mapLegendObs")}
      />

      {/* ═══════════ PILLARS ═══════════ */}
      <section className="section" style={{ background: "var(--color-cream-deep)" }}>
        <div className="wrap">
          <Kicker>{t("pillarsKicker")}</Kicker>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 32,
              marginTop: 40,
            }}
          >
            {t.raw("pillars").map(
              (p: { n: string; t: string; b: string }, i: number) => (
                <PillarCard key={i} number={p.n} title={p.t} body={p.b} />
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ VOICE (President quote) ═══════════ */}
      <section className="section">
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: 48,
              alignItems: "start",
            }}
          >
            <div>
              <Kicker>{t("voiceKicker")}</Kicker>
              <PhotoPlaceholder
                label="FOTO · MARCELO RENAULT · 3:4"
                aspectRatio="3/4"
              />
              <div style={{ marginTop: 16 }}>
                <div className="serif" style={{ fontSize: 22 }}>
                  {t("voiceName")}
                </div>
                <div className="mono" style={{ color: "var(--color-muted)", marginTop: 4 }}>
                  {t("voiceRole")}
                </div>
              </div>
            </div>
            <div style={{ paddingTop: 24 }}>
              <div
                className="serif"
                style={{
                  fontSize: "clamp(28px, 3vw, 44px)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  color: "var(--color-green-deep)",
                }}
              >
                {t("voiceQuote")}
              </div>
              <div style={{ width: "100%", height: 1, background: "var(--color-line)", margin: "40px 0" }} />
              <BodyText style={{ maxWidth: 620 }}>
                A presidência da ALAGER é eleita pela Assembleia Geral para mandatos de dois anos, com recondução permitida uma única vez.
              </BodyText>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ NEWS (latest posts) ═══════════ */}
      <section className="section" style={{ background: "var(--color-green-deep)", color: "var(--color-cream)" }}>
        <div className="wrap">
          <div className="eyebrow-row" style={{ alignItems: "flex-end" }}>
            <div>
              <Kicker gold>{t("newsKicker")}</Kicker>
              <Display variant="display-2" style={{ color: "var(--color-cream)", marginTop: 16 }}>
                {t("newsTitle")}
              </Display>
            </div>
            <Button variant="gold" href="/pt/blog">
              {t("newsAll")}
            </Button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginTop: 48 }}>
            {placeholderPosts.map((post, i) => (
              <article
                key={i}
                style={{ paddingTop: 24, borderTop: "1px solid #ffffff30" }}
              >
                <div className="flex between" style={{ marginBottom: 24 }}>
                  <span className="mono" style={{ color: "var(--color-gold)" }}>
                    {post.cat}
                  </span>
                  <span className="mono" style={{ color: "#9ab1a3" }}>
                    {post.date}
                  </span>
                </div>
                <h3
                  className="serif"
                  style={{
                    fontSize: 24,
                    lineHeight: 1.2,
                    color: "var(--color-cream)",
                    letterSpacing: "-0.01em",
                    fontWeight: 400,
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ marginTop: 16, fontSize: 14, color: "#c6d4c9", lineHeight: 1.55 }}>
                  {post.excerpt}
                </p>
                <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="mono" style={{ color: "var(--color-gold)", cursor: "pointer" }}>
                    {tBlog("readMore")} →
                  </span>
                  <span className="mono" style={{ color: "#9ab1a3" }}>
                    {post.read} {tBlog("minRead")}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ JOIN CTA ═══════════ */}
      <section className="section">
        <div className="wrap">
          <div
            style={{
              background: "var(--color-green)",
              padding: "80px 64px",
              color: "var(--color-cream)",
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 64,
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, right: 0, width: 360, height: 360, opacity: 0.05 }}>
              <LogoMark size={360} color="var(--color-cream)" accent="var(--color-gold)" />
            </div>
            <div>
              <Kicker gold>{t("joinKicker")}</Kicker>
              <Display variant="display-2" style={{ marginTop: 20, color: "var(--color-cream)" }}>
                {t("joinTitle")}
              </Display>
              <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.55, color: "#c6d4c9", maxWidth: 600 }}>
                {t("joinBody")}
              </p>
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              <Button variant="gold" href="/pt/associe-se" style={{ justifyContent: "center" }}>
                {t("ctaPrimary")} <Icon.Arrow />
              </Button>
              <button
                className="btn"
                style={{
                  background: "transparent",
                  border: "1px solid #ffffff40",
                  color: "var(--color-cream)",
                  justifyContent: "center",
                }}
              >
                Conheça a estrutura
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
