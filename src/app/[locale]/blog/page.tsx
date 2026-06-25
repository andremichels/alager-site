// Alager Site — Blog page (filterable grid)
"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { Tag } from "@/components/atoms/Tag";
import { SearchInput } from "@/components/molecules/SearchInput";
import { BlogPostCard } from "@/components/molecules/BlogPostCard";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";

// Placeholder posts (will come from Sanity)
const POSTS_PLACEHOLDER = [
  { id: 1, cat: "Regulação", title: "Brasil avança com marco regulatório para eólicas offshore", excerpt: "Projeto de lei aprovado no Senado estabelece critérios para cessão de áreas marítimas e contratação de potência.", date: "15 jun 2026", read: 6, membersOnly: false, featured: true },
  { id: 2, cat: "Posições", title: "ALAGER participa de audiência sobre integração energética no Mercosul", excerpt: "Posicionamento conjunto entregue à Comissão de Infraestrutura do bloco destaca a necessidade de harmonização regulatória.", date: "10 jun 2026", read: 4, membersOnly: false, featured: false },
  { id: 3, cat: "Mercado", title: "Colômbia lança leilão de armazenamento — o que muda para a região", excerpt: "Primeiro leilão dedicado exclusivamente a baterias na América Latina deve atrair 1.2 GW em projetos.", date: "28 mai 2026", read: 5, membersOnly: true, featured: false },
  { id: 4, cat: "Regulação", title: "Hidrogênio verde: Chile publica regras de certificação", excerpt: "Novo selo COR estabelece padrão que pode servir de modelo para países vizinhos.", date: "20 mai 2026", read: 7, membersOnly: false, featured: false },
  { id: 5, cat: "Inteligência", title: "Boletim Regulatório ALAGER — Maio 2026", excerpt: "Compilação das principais movimentações regulatórias nos 13 países membros.", date: "15 mai 2026", read: 12, membersOnly: true, featured: false },
  { id: 6, cat: "Eventos", title: "Fórum Latino-Americano de Transição Energética 2026", excerpt: "ALAGER coordena painel sobre financiamento de renováveis no maior encontro do setor na região.", date: "02 mai 2026", read: 3, membersOnly: false, featured: false },
  { id: 7, cat: "Mercado", title: "Argentina retoma leilões de renováveis após dois anos", excerpt: "Novo governo anuncia rodada de 2 GW com foco em solar e eólica no norte do país.", date: "18 abr 2026", read: 6, membersOnly: false, featured: false },
  { id: 8, cat: "Posições", title: "Nota técnica: proposta de taxonomia verde para a América Latina", excerpt: "Documento conjunto com 12 associações setoriais defende critérios regionais de classificação.", date: "05 abr 2026", read: 9, membersOnly: true, featured: false },
];

export default function BlogPage() {
  const t = useTranslations("blog");
  const categories = [t("all"), ...t.raw("categories")];
  const [activeCat, setActiveCat] = useState(t("all"));
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let posts = POSTS_PLACEHOLDER;
    if (activeCat !== t("all")) {
      posts = posts.filter((p) => p.cat === activeCat);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCat, search, t]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main>
      {/* HERO */}
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

      {/* FILTERS */}
      <section style={{ paddingBottom: 64 }}>
        <div className="wrap">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <Tag
                  key={cat}
                  active={activeCat === cat}
                  onClick={() => setActiveCat(cat)}
                >
                  {cat}
                </Tag>
              ))}
            </div>
            <div style={{ width: 280 }}>
              <SearchInput
                placeholder={t("search")}
                value={search}
                onChange={setSearch}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", padding: 80, color: "var(--color-muted)" }}>
              {t("empty")}
            </p>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 48,
                    marginBottom: 64,
                    paddingBottom: 48,
                    borderBottom: "1px solid var(--color-line-strong)",
                  }}
                >
                  <PhotoPlaceholder
                    label={`IMAGEM · ${featured.cat.toUpperCase()} · 5:4`}
                    aspectRatio="5/4"
                  />
                  <div>
                    <BlogPostCard
                      title={featured.title}
                      excerpt={featured.excerpt}
                      category={featured.cat}
                      date={featured.date}
                      readTime={featured.read}
                      readMoreLabel={t("readMore")}
                      minReadLabel={t("minRead")}
                      membersOnly={featured.membersOnly}
                      membersLabel={t("members")}
                      featured
                    />
                  </div>
                </div>
              )}

              {/* Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "32px 32px",
                }}
              >
                {rest.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    category={post.cat}
                    date={post.date}
                    readTime={post.read}
                    readMoreLabel={t("readMore")}
                    minReadLabel={t("minRead")}
                    membersOnly={post.membersOnly}
                    membersLabel={t("members")}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
