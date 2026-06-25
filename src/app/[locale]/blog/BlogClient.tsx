// Alager Site — Blog page client component (responsive)
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
import type { Post } from "@/lib/sanity";

interface BlogClientProps { locale: string; posts: Post[]; }

function formatDate(iso: string, lang: string) {
  const d = new Date(iso);
  const m: Record<string, string[]> = { pt: ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"], es: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"], en: ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"] };
  return `${String(d.getDate()).padStart(2,"0")} ${(m[lang]||m.pt)[d.getMonth()]} ${d.getFullYear()}`;
}

export function BlogClient({ locale, posts }: BlogClientProps) {
  const t = useTranslations("blog");
  const cats = [t("all"), ...t.raw("categories")];
  const [activeCat, setActiveCat] = useState(t("all"));
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let r = posts;
    if (activeCat !== t("all")) r = r.filter(p => (p.cat as any)[locale] === activeCat);
    if (search.trim()) { const q = search.toLowerCase(); r = r.filter(p => ((p.title as any)[locale]||"").toLowerCase().includes(q)||((p.excerpt as any)[locale]||"").toLowerCase().includes(q)); }
    return r;
  }, [posts, activeCat, search, locale, t]);

  const featured = filtered[0], rest = filtered.slice(1);

  return (
    <main>
      <section style={{ paddingTop: 80, paddingBottom: 48 }}><div className="wrap"><Kicker>{t("kicker")}</Kicker><Display variant="display-1" style={{ marginTop: 24, marginBottom: 32, maxWidth: 1000 }}>{t("headline")}</Display><BodyText variant="lead" style={{ maxWidth: 720 }}>{t("lead")}</BodyText></div></section>
      <section style={{ paddingBottom: 64 }}><div className="wrap">
        <div className="mobile-stack" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 48, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{cats.map((c: string) => <Tag key={c} active={activeCat===c} onClick={()=>setActiveCat(c)}>{c}</Tag>)}</div>
          <div className="mobile-full" style={{ width: 280 }}><SearchInput placeholder={t("search")} value={search} onChange={setSearch}/></div>
        </div>
        {filtered.length===0 ? <p style={{ textAlign:"center", padding:80, color:"var(--color-muted)" }}>{t("empty")}</p> : <>
          {featured && <div className="grid-2" style={{ gap: 48, marginBottom: 64, paddingBottom: 48, borderBottom:"1px solid var(--color-line-strong)" }}><PhotoPlaceholder label={`IMAGEM · ${(featured.cat as any)[locale]?.toUpperCase()||"BLOG"} · 5:4`} aspectRatio="5/4"/><BlogPostCard title={(featured.title as any)[locale]||""} excerpt={(featured.excerpt as any)[locale]||""} category={(featured.cat as any)[locale]||""} date={formatDate(featured.date,locale)} readTime={featured.read} readMoreLabel={t("readMore")} minReadLabel={t("minRead")} membersOnly={featured.membersOnly} membersLabel={t("members")} featured/></div>}
          <div className="grid-3" style={{ gap: "32px 32px" }}>{rest.map(p=><BlogPostCard key={p._id} title={(p.title as any)[locale]||""} excerpt={(p.excerpt as any)[locale]||""} category={(p.cat as any)[locale]||""} date={formatDate(p.date,locale)} readTime={p.read} readMoreLabel={t("readMore")} minReadLabel={t("minRead")} membersOnly={p.membersOnly} membersLabel={t("members")}/>)}</div>
        </>}
      </div></section>
    </main>
  );
}
