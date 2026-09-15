// Alager Site — Seed homeSettings singleton (idempotent)
// Usage: set -a && source .env.local && set +a && npx tsx sanity/seed-home-settings.ts
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-25",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

interface PillarMsg {
  n: string;
  t: string;
  b: string;
}

function loadHome(locale: string): Record<string, any> {
  const path = join(process.cwd(), "messages", `${locale}.json`);
  return JSON.parse(readFileSync(path, "utf8")).home;
}

function main() {
  const home = { pt: loadHome("pt"), es: loadHome("es"), en: loadHome("en") };

  // Build a trilingual localeString {pt, es, en} from a single message key.
  const tr = (key: string): Record<string, string> => ({
    pt: home.pt[key],
    es: home.es[key],
    en: home.en[key],
  });

  const ptPillars = home.pt.pillars as PillarMsg[];
  const esPillars = home.es.pillars as PillarMsg[];
  const enPillars = home.en.pillars as PillarMsg[];
  const pillars = ptPillars.map((p, i) => ({
    n: p.n,
    t: { pt: p.t, es: esPillars[i].t, en: enPillars[i].t },
    b: { pt: p.b, es: esPillars[i].b, en: enPillars[i].b },
  }));

  const doc = {
    _id: "homeSettings",
    _type: "homeSettings",
    heroKicker: tr("kicker"),
    heroHeadline: tr("headline"),
    heroLead: tr("lead"),
    heroCtaPrimary: tr("ctaPrimary"),
    heroCtaSecondary: tr("ctaSecondary"),
    pillarsKicker: tr("pillarsKicker"),
    pillars,
    voiceKicker: tr("voiceKicker"),
    voiceQuote: tr("voiceQuote"),
    voiceName: home.pt.voiceName, // proper noun — same across locales
    voiceRole: tr("voiceRole"),
    voiceBody: tr("voiceBody"),
    newsKicker: tr("newsKicker"),
    newsTitle: tr("newsTitle"),
    newsAll: tr("newsAll"),
    joinKicker: tr("joinKicker"),
    joinTitle: tr("joinTitle"),
    joinBody: tr("joinBody"),
  };

  return client.createOrReplace(doc);
}

main()
  .then(() => {
    console.log("✅ homeSettings singleton criado/atualizado (id fixo `homeSettings`).");
  })
  .catch((err) => {
    console.error("❌ Seed homeSettings falhou:", err.message);
    process.exit(1);
  });
