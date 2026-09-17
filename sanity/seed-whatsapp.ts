// Alager Site — Importa a curadoria do WhatsApp (curated.json) para o Sanity
// Topics são publicados (taxonomia). NewsItems e Events entram como DRAFT para revisão.
// Usage: set -a && source .env.local && set +a && npx tsx sanity/seed-whatsapp.ts
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pgk66klx",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-25",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const data = JSON.parse(
  readFileSync(join(process.cwd(), "whatsapp-data", "curated.json"), "utf8")
);

const pt = (value: string) => ({ pt: value });

async function main() {
  // 1. Topics (publicados — taxonomia estável)
  const topicDocs = data.topics.map((t: any) => ({
    _id: `topic.${t.slug}`,
    _type: "topic",
    title: pt(t.pt),
    slug: { _type: "slug", current: t.slug },
    order: t.order,
  }));

  // 2. NewsItems (draft)
  const newsDocs = data.newsItems.map((n: any, i: number) => ({
    _id: `drafts.newsitem-${i + 1}`,
    _type: "newsItem",
    title: pt(n.title),
    summary: pt(n.summary),
    outlet: n.outlet,
    url: n.url,
    date: n.date,
    topic: n.topic ? { _type: "reference", _ref: `topic.${n.topic}` } : undefined,
    featured: !!n.featured,
  }));

  // 3. Events (draft)
  const eventDocs = data.events.map((e: any, i: number) => ({
    _id: `drafts.event-${i + 1}`,
    _type: "event",
    name: pt(e.name),
    description: pt(e.description),
    dateStart: e.dateStart,
    url: e.url,
    origin: e.origin || "external",
  }));

  // topics primeiro (referências precisam existir), depois news/events
  await Promise.all(topicDocs.map((doc: any) => client.createOrReplace(doc)));
  await Promise.all(
    [...newsDocs, ...eventDocs].map((doc: any) => client.createOrReplace(doc))
  );

  console.log(
    `✅ Importados: ${topicDocs.length} topics + ${newsDocs.length} newsItems (draft) + ${eventDocs.length} events (draft).`
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Import falhou:", err.message);
    process.exit(1);
  });
