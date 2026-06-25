// Alager Site — Quem Somos page
import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { StatCounter } from "@/components/molecules/StatCounter";
import { PillarCard } from "@/components/molecules/PillarCard";
import { TimelineEntry } from "@/components/molecules/TimelineEntry";
import { BoardMemberCard } from "@/components/molecules/BoardMemberCard";
import { BOARD_PLACEHOLDER, TIMELINE_PLACEHOLDER } from "@/data/placeholder";

export default function QuemSomosPage() {
  const t = useTranslations("about");

  return (
    <main>
      {/* HERO */}
      <section style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div className="wrap">
          <Kicker>{t("kicker")}</Kicker>
          <Display variant="display-1" style={{ marginTop: 24, marginBottom: 40, maxWidth: 1100 }}>
            {t("headline")}
          </Display>
          <BodyText variant="lead" style={{ maxWidth: 720 }}>
            {t("lead")}
          </BodyText>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="section-tight" style={{ background: "var(--color-green)", color: "var(--color-cream)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            <div>
              <Kicker gold>{t("missionKicker")}</Kicker>
              <p
                className="serif"
                style={{
                  fontSize: "clamp(24px, 2.4vw, 36px)",
                  lineHeight: 1.25,
                  marginTop: 20,
                  color: "var(--color-cream)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                {t("mission")}
              </p>
            </div>
            <div>
              <Kicker gold>{t("visionKicker")}</Kicker>
              <p
                className="serif"
                style={{
                  fontSize: "clamp(24px, 2.4vw, 36px)",
                  lineHeight: 1.25,
                  marginTop: 20,
                  color: "var(--color-cream)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                {t("vision")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES / PRINCIPLES */}
      <section className="section">
        <div className="wrap">
          <Kicker>{t("valuesKicker")}</Kicker>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              marginTop: 40,
              borderTop: "1px solid var(--color-line-strong)",
            }}
          >
            {t.raw("values").map(
              (v: { t: string; b: string }, i: number) => (
                <div
                  key={i}
                  style={{
                    padding: "32px 24px 32px 0",
                    borderRight: i < 3 ? "1px solid var(--color-line)" : "none",
                    paddingLeft: i > 0 ? 24 : 0,
                  }}
                >
                  <MonoLabel color="var(--color-gold-deep)">
                    {String(i + 1).padStart(2, "0")}
                  </MonoLabel>
                  <Display variant="h2" style={{ marginTop: 16, marginBottom: 16 }}>
                    {v.t}
                  </Display>
                  <BodyText style={{ fontSize: 14.5 }}>{v.b}</BodyText>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section" style={{ background: "var(--color-cream-deep)" }}>
        <div className="wrap">
          <Kicker>{t("timelineKicker")}</Kicker>
          <Display variant="h1" style={{ marginTop: 16, maxWidth: 700, marginBottom: 56 }}>
            {t("timelineTitle")}
          </Display>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 80,
                top: 12,
                bottom: 12,
                width: 1,
                background: "var(--color-line-strong)",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {TIMELINE_PLACEHOLDER.map((entry, i) => (
                <TimelineEntry
                  key={i}
                  year={entry.year}
                  title={entry.title.pt}
                  body={entry.body.pt}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOARD */}
      <section className="section">
        <div className="wrap">
          <Kicker>{t("teamKicker")}</Kicker>
          <Display variant="h1" style={{ marginTop: 16, marginBottom: 48 }}>
            {t("teamTitle")}
          </Display>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {BOARD_PLACEHOLDER.map((m, i) => (
              <BoardMemberCard
                key={i}
                name={m.name}
                role={m.role.pt}
                country={m.country}
                order={m.order}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section className="section" style={{ background: "var(--color-green-deep)", color: "var(--color-cream)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start" }}>
            <div>
              <Kicker gold>{t("governanceKicker")}</Kicker>
              <Display variant="display-2" style={{ marginTop: 20, color: "var(--color-cream)" }}>
                {t("governanceTitle")}
              </Display>
            </div>
            <div>
              <BodyText variant="lead" style={{ color: "#d8e3d8", maxWidth: 640 }}>
                {t("governanceBody")}
              </BodyText>

              <div
                style={{
                  marginTop: 40,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 24,
                  paddingTop: 32,
                  borderTop: "1px solid #ffffff30",
                }}
              >
                <div>
                  <div className="serif" style={{ fontSize: 40, color: "var(--color-cream)" }}>13</div>
                  <MonoLabel color="#9ab1a3">Conselheiros titulares</MonoLabel>
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 40, color: "var(--color-cream)" }}>06</div>
                  <MonoLabel color="#9ab1a3">Grupos técnicos ativos</MonoLabel>
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 40, color: "var(--color-cream)" }}>02</div>
                  <MonoLabel color="#9ab1a3">Mandato (anos)</MonoLabel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
