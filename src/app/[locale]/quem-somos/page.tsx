// Alager Site — Quem Somos (fetches data, passes to client)
import type { Metadata } from "next";
import {
  getBoardMembers,
  getTimelineEntries,
  getInstitutionalText,
  getPrinciples,
  getPageHeader,
} from "@/lib/sanity";
import { QuemSomosClient } from "./QuemSomosClient";
import { buildPageMetadata, pageMeta } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = pageMeta.about[locale] ?? pageMeta.about.pt;
  return buildPageMetadata(locale, "quem-somos", m);
}

export default async function QuemSomosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [boardMembers, timelineEntries, mission, vision, governance, header, principles] =
    await Promise.all([
      getBoardMembers(),
      getTimelineEntries(),
      getInstitutionalText("about-mission"),
      getInstitutionalText("about-vision"),
      getInstitutionalText("about-governance"),
      getPageHeader("about"),
      getPrinciples(),
    ]);

  return (
    <QuemSomosClient
      locale={locale}
      boardMembers={boardMembers}
      timelineEntries={timelineEntries}
      mission={mission?.[locale]}
      vision={vision?.[locale]}
      governance={governance?.[locale]}
      headline={header?.headline?.[locale]}
      lead={header?.lead?.[locale]}
      principles={principles}
    />
  );
}
