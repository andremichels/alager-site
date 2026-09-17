// Alager Site — Notícias / Radar do setor (fetches data, passes to client)
import type { Metadata } from "next";
import { getNewsItems, getTopics } from "@/lib/sanity";
import { NoticiasClient } from "./NoticiasClient";
import { buildPageMetadata, pageMeta } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = pageMeta.noticias[locale] ?? pageMeta.noticias.pt;
  return buildPageMetadata(locale, "noticias", m);
}

export default async function NoticiasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [items, topics] = await Promise.all([getNewsItems(), getTopics()]);

  return <NoticiasClient locale={locale} items={items} topics={topics} />;
}
