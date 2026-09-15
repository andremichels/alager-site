// Alager Site — Quem Somos client component (responsive)
"use client";

import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { StatCounter } from "@/components/molecules/StatCounter";
import { TimelineEntry } from "@/components/molecules/TimelineEntry";
import { BoardMemberCard } from "@/components/molecules/BoardMemberCard";
import type { BoardMember, TimelineEntry as TimelineEntryType, Principle } from "@/lib/sanity";

interface QuemSomosClientProps {
  locale: string;
  boardMembers: BoardMember[];
  timelineEntries: TimelineEntryType[];
  mission?: string;
  vision?: string;
  governance?: string;
  headline?: string;
  lead?: string;
  principles?: Principle[];
}

export function QuemSomosClient({
  locale,
  boardMembers,
  timelineEntries,
  mission,
  vision,
  governance,
  headline,
  lead,
  principles,
}: QuemSomosClientProps) {
  const t = useTranslations("about");

  const headlineText = headline || t("headline");
  const leadText = lead || t("lead");
  const L = (v?: Record<string, string>) => v?.[locale] || "";
  const sanityValues = principles?.map((p) => ({ t: L(p.t), b: L(p.b) }));
  const values = sanityValues?.length
    ? sanityValues
    : (t.raw("values") as { t: string; b: string }[]);

  return (
    <main>
      <section style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div className="wrap">
          <Kicker>{t("kicker")}</Kicker>
          <Display variant="display-1" style={{ marginTop: 24, marginBottom: 40, maxWidth: 1100 }}>{headlineText}</Display>
          <BodyText variant="lead" style={{ maxWidth: 720 }}>{leadText}</BodyText>
        </div>
      </section>

      {/* Mission/Vision — responsive grid */}
      <section className="section-tight" style={{ background: "var(--color-green)", color: "var(--color-cream)" }}>
        <div className="wrap">
          <div className="grid-2" style={{ gap: 64 }}>
            <div><Kicker gold>{t("missionKicker")}</Kicker><p className="serif" style={{ fontSize: "clamp(24px, 2.4vw, 36px)", lineHeight: 1.25, marginTop: 20, color: "var(--color-cream)", fontWeight: 400, letterSpacing: "-0.01em" }}>{mission || t("mission")}</p></div>
            <div><Kicker gold>{t("visionKicker")}</Kicker><p className="serif" style={{ fontSize: "clamp(24px, 2.4vw, 36px)", lineHeight: 1.25, marginTop: 20, color: "var(--color-cream)", fontWeight: 400, letterSpacing: "-0.01em" }}>{vision || t("vision")}</p></div>
          </div>
        </div>
      </section>

      {/* Values — responsive grid */}
      <section className="section">
        <div className="wrap">
          <Kicker>{t("valuesKicker")}</Kicker>
          <div className="grid-4" style={{ gap: 0, marginTop: 40, borderTop: "1px solid var(--color-line-strong)" }}>
            {values.map((v, i) => (
              <div key={i} style={{ padding: "32px 24px 32px 0", paddingLeft: i > 0 ? 24 : 0 }}>
                <MonoLabel color="var(--color-gold-deep)">{String(i + 1).padStart(2, "0")}</MonoLabel>
                <Display variant="h2" style={{ marginTop: 16, marginBottom: 16 }}>{v.t}</Display>
                <BodyText style={{ fontSize: 14.5 }}>{v.b}</BodyText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: "var(--color-cream-deep)" }}>
        <div className="wrap">
          <Kicker>{t("timelineKicker")}</Kicker>
          <Display variant="h1" style={{ marginTop: 16, maxWidth: 700, marginBottom: 56 }}>{t("timelineTitle")}</Display>
          <div style={{ position: "relative" }}>
            <div className="mobile-hidden" style={{ position: "absolute", left: 80, top: 12, bottom: 12, width: 1, background: "var(--color-line-strong)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {timelineEntries.map((entry, i) => (
                <TimelineEntry key={entry._id || i} year={entry.year} title={(entry.title as any)[locale] || ""} body={(entry.body as any)[locale] || ""} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Board — responsive grid */}
      <section className="section">
        <div className="wrap">
          <Kicker>{t("teamKicker")}</Kicker>
          <Display variant="h1" style={{ marginTop: 16, marginBottom: 48 }}>{t("teamTitle")}</Display>
          <div className="grid-3" style={{ gap: 32 }}>
            {boardMembers.map((m, i) => (
              <BoardMemberCard key={m._id || i} name={m.name} role={(m.role as any)[locale] || ""} country={m.country} order={m.order} imageUrl={m.imageUrl} />
            ))}
          </div>
        </div>
      </section>

      {/* Governance — responsive grid */}
      <section className="section" style={{ background: "var(--color-green-deep)", color: "var(--color-cream)" }}>
        <div className="wrap">
          <div className="grid-1-2" style={{ gap: 64, alignItems: "start" }}>
            <div><Kicker gold>{t("governanceKicker")}</Kicker><Display variant="display-2" style={{ marginTop: 20, color: "var(--color-cream)" }}>{t("governanceTitle")}</Display></div>
            <div>
              <BodyText variant="lead" style={{ color: "#d8e3d8", maxWidth: 640 }}>{governance || t("governanceBody")}</BodyText>
              <div className="grid-3" style={{ marginTop: 40, gap: 24, paddingTop: 32, borderTop: "1px solid #ffffff30" }}>
                <StatCounter value={13} label={t("statCouncil")} />
                <StatCounter value={6} label={t("statGroups")} />
                <StatCounter value={2} label={t("statTerm")} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
