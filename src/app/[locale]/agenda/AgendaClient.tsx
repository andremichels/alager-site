// Alager Site — Agenda client (cards em grade)
"use client";

import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { EventCard } from "@/components/molecules/EventCard";
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
      <section style={{ paddingTop: 80, paddingBottom: 56 }}>
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

      <section style={{ background: "var(--color-cream-deep)", paddingTop: 64, paddingBottom: 96 }}>
        <div className="wrap">
          {events.length === 0 ? (
            <p style={{ textAlign: "center", padding: 80, color: "var(--color-muted)" }}>
              {t("empty")}
            </p>
          ) : (
            <div className="grid-3" style={{ gap: 32 }}>
              {events.map((ev) => (
                <EventCard
                  key={ev._id}
                  name={L(ev.name)}
                  description={L(ev.description) || undefined}
                  meta={[range(ev), ev.location].filter(Boolean).join(" · ") || undefined}
                  url={ev.url}
                  registerLabel={t("register")}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
