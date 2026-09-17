// Alager Site — Publica os rascunhos do WhatsApp (newsItems + events) no Sanity
// Converte cada `drafts.*` em documento publicado (deleta o draft no processo).
// Usage: set -a && source .env.local && set +a && npx tsx sanity/publish-whatsapp.ts
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pgk66klx",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-25",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  const drafts = await client.fetch(
    `*[_type in ["newsItem","event"] && _id match "drafts.*"]{ _id, _type, _rev }`,
    {},
    { perspective: "raw" }
  );

  if (drafts.length === 0) {
    console.log("Nenhum rascunho (newsItem/event) para publicar.");
    return;
  }

  console.log(`Publicando ${drafts.length} rascunhos…`);
  let ok = 0;
  let fail = 0;

  for (const d of drafts) {
    const publishedId = d._id.replace(/^drafts\./, "");
    try {
      await client.action({
        actionType: "sanity.action.document.publish",
        draftId: d._id,
        publishedId,
        ifDraftRevisionId: d._rev,
      });
      ok++;
    } catch (e) {
      fail++;
      console.error(`  ❌ ${d._id}: ${e instanceof Error ? e.message : e}`);
    }
  }

  console.log(`✅ Publicados: ${ok} de ${drafts.length}${fail ? ` (${fail} falhas)` : ""}.`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Falhou:", e.message);
    process.exit(1);
  });
