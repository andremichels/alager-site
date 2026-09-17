// Alager Site — Agenda (fetches data, passes to client)
import type { Metadata } from "next";
import { getEvents } from "@/lib/sanity";
import { AgendaClient } from "./AgendaClient";
import { buildPageMetadata, pageMeta } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = pageMeta.agenda[locale] ?? pageMeta.agenda.pt;
  return buildPageMetadata(locale, "agenda", m);
}

export default async function AgendaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const events = await getEvents();

  return <AgendaClient locale={locale} events={events} />;
}
