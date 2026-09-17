// Alager Site — Notícias / Radar client (lista + filtro por tema)
"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { Tag } from "@/components/atoms/Tag";
import type { NewsItem, Topic } from "@/lib/sanity";

interface NoticiasClientProps {
  locale: string;
  items: NewsItem[];
  topics: Topic[];
}

function formatDate(iso: string, lang: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const months: Record<string, string[]> = {
    pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    en: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
  };
  return `${String(d).padStart(2, "0")} ${(months[lang] || months.pt)[m - 1]} ${y}`;
}

export function NoticiasClient({ locale, items, topics }: NoticiasClientProps) {
  const t = useTranslations("noticias");
  // PT-only por enquanto: cai pra pt quando es/en não estiverem traduzidos.
  const L = (v?: Record<string, string>) => v?.[locale] || v?.pt || "";
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((i) => i.topic?._id === active);
  }, [items, active]);

  return (
    <main>
      <section style={{ paddingTop: 80, paddingBottom: 48 }}>
        <div className="wrap">
          <Kicker>{t("kicker")}</Kicker>
          <Display variant="display-1" style={{ marginTop: 24, marginBottom: 32, maxWidth: 1000 }}>
            {t("headline")}
          </Display>
          <BodyText variant="lead" style={{ maxWidth: 720 }}>
            {t("lead")}
          </BodyText>
        </div>
      </section>

      <section style={{ paddingBottom: 96 }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            <Tag active={active === "all"} onClick={() => setActive("all")}>
              {t("filterAll")}
            </Tag>
            {topics.map((tp) => (
              <Tag key={tp._id} active={active === tp._id} onClick={() => setActive(tp._id)}>
                {L(tp.title)}
              </Tag>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", padding: 80, color: "var(--color-muted)" }}>
              {t("empty")}
            </p>
          ) : (
            <div>
              {filtered.map((item) => (
                <article key={item._id} style={{ padding: "28px 0", borderTop: "1px solid var(--color-line)" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      marginBottom: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    {item.topic && (
                      <span
                        className="mono"
                        style={{
                          color: "var(--color-gold-deep)",
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {L(item.topic.title)}
                      </span>
                    )}
                    <span className="mono" style={{ color: "var(--color-muted)", fontSize: 12 }}>
                      {[item.outlet, item.date ? formatDate(item.date, locale) : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </div>
                  <h3
                    className="serif"
                    style={{
                      fontSize: 22,
                      lineHeight: 1.2,
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      marginBottom: 8,
                    }}
                  >
                    {L(item.title)}
                  </h3>
                  {L(item.summary) && (
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.55,
                        color: "var(--color-ink-2)",
                        marginBottom: 12,
                      }}
                    >
                      {L(item.summary)}
                    </p>
                  )}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono"
                      style={{ color: "var(--color-green)", textDecoration: "none", fontSize: 13 }}
                    >
                      {t("readSource")} →
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
