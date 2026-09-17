// Alager Site — Notícias / Radar client (cards em grade + filtro por tema + paginação)
"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { Tag } from "@/components/atoms/Tag";
import { NewsItemCard } from "@/components/molecules/NewsItemCard";
import { Pagination } from "@/components/molecules/Pagination";
import type { NewsItem, Topic } from "@/lib/sanity";

const PER_PAGE = 6;

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
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((i) => i.topic?._id === active);
  }, [items, active]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const caption =
    totalPages > 1
      ? `${t("pageOf", { page: safePage, total: totalPages })} · ${filtered.length} ${t("items")}`
      : undefined;

  const selectTopic = (id: string) => {
    setActive(id);
    setPage(1);
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

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 40 }}>
            <Tag active={active === "all"} onClick={() => selectTopic("all")}>
              {t("filterAll")}
            </Tag>
            {topics.map((tp) => (
              <Tag key={tp._id} active={active === tp._id} onClick={() => selectTopic(tp._id)}>
                {L(tp.title)}
              </Tag>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-cream-deep)", paddingTop: 64, paddingBottom: 96 }}>
        <div className="wrap">
          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", padding: 80, color: "var(--color-muted)" }}>
              {t("empty")}
            </p>
          ) : (
            <>
              <div className="grid-3" style={{ gap: 32 }}>
                {paged.map((item) => (
                  <NewsItemCard
                    key={item._id}
                    title={L(item.title)}
                    summary={L(item.summary) || undefined}
                    topicLabel={item.topic ? L(item.topic.title) : undefined}
                    meta={
                      [item.outlet, item.date ? formatDate(item.date, locale) : null]
                        .filter(Boolean)
                        .join(" · ") || undefined
                    }
                    url={item.url}
                    readSourceLabel={t("readSource")}
                  />
                ))}
              </div>
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onChange={setPage}
                caption={caption}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
