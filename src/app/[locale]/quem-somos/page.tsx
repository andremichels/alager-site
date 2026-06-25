// Alager Site — Quem Somos (fetches data, passes to client)
import { getBoardMembers, getTimelineEntries } from "@/lib/sanity";
import { QuemSomosClient } from "./QuemSomosClient";

export default async function QuemSomosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const boardMembers = await getBoardMembers();
  const timelineEntries = await getTimelineEntries();

  return (
    <QuemSomosClient
      locale={locale}
      boardMembers={boardMembers}
      timelineEntries={timelineEntries}
    />
  );
}
