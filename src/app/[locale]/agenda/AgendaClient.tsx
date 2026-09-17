// Alager Site — Agenda client (lista de eventos)
"use client";

import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import type { EventItem } from "@/lib/sanity";

interface AgendaClientProps {
  locale: string;
  events: EventItem[];
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

export function AgendaClient({ locale, events }: AgendaClientProps) {
  const t = useTranslations("agenda");
  // PT-only por enquanto: cai pra pt quando es/en não estiverem traduzidos.
  const L = (v?: Record<string, string>) => v?.[locale] || v?.pt || "";

  const range = (ev: EventItem) => {
    const start = ev.dateStart ? formatDate(ev.dateStart, locale) : null;
    const end = ev.dateEnd && ev.dateEnd !== ev.dateStart ? formatDate(ev.dateEnd, locale) : null;
    return [start, end].filter(Boolean).join(" — ");
  };

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
          {events.length === 0 ? (
            <p style={{ textAlign: "center", padding: 80, color: "var(--color-muted)" }}>
              {t("empty")}
            </p>
          ) : (
            <div>
              {events.map((ev) => (
                <article key={ev._id} style={{ padding: "28px 0", borderTop: "1px solid var(--color-line)" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                  >
                    <h3
                      className="serif"
                      style={{ fontSize: 22, lineHeight: 1.2, fontWeight: 400, letterSpacing: "-0.01em" }}
                    >
                      {L(ev.name)}
                    </h3>
                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono"
                        style={{
                          color: "var(--color-green)",
                          textDecoration: "none",
                          fontSize: 13,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t("register")} →
                      </a>
                    )}
                  </div>
                  <div className="mono" style={{ color: "var(--color-muted)", fontSize: 12, marginTop: 8, marginBottom: 8 }}>
                    {[range(ev), ev.location].filter(Boolean).join(" · ")}
                  </div>
                  {L(ev.description) && (
                    <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--color-ink-2)" }}>
                      {L(ev.description)}
                    </p>
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
