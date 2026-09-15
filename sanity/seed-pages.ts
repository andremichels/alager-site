// Alager Site — Seed membership tiers + page headers + principles (idempotent)
// Usage: set -a && source .env.local && set +a && npx tsx sanity/seed-pages.ts
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

function load(ns: string, locale: string): any {
  const path = join(process.cwd(), "messages", `${locale}.json`);
  return JSON.parse(readFileSync(path, "utf8"))[ns];
}

interface TierMsg {
  name: string;
  price: string;
  desc: string;
  features: string[];
}
interface ValueMsg {
  t: string;
  b: string;
}

function main() {
  const join = { pt: load("join", "pt"), es: load("join", "es"), en: load("join", "en") };
  const about = { pt: load("about", "pt"), es: load("about", "es"), en: load("about", "en") };
  const energy = { pt: load("energy", "pt"), es: load("energy", "es"), en: load("energy", "en") };
  const blog = { pt: load("blog", "pt"), es: load("blog", "es"), en: load("blog", "en") };

  const tr = (pt: string, es: string, en: string) => ({ pt, es, en });

  // 1. Membership tiers
  const tierKeys = ["institutional", "corporate", "academic"];
  const ptTiers = join.pt.tiers as TierMsg[];
  const esTiers = join.es.tiers as TierMsg[];
  const enTiers = join.en.tiers as TierMsg[];
  const tierDocs = ptTiers.map((t, i) => ({
    _id: `membershipTier.${tierKeys[i]}`,
    _type: "membershipTier",
    key: tierKeys[i],
    order: i,
    name: tr(t.name, esTiers[i].name, enTiers[i].name),
    price: tr(t.price, esTiers[i].price, enTiers[i].price),
    desc: tr(t.desc, esTiers[i].desc, enTiers[i].desc),
    features: t.features.map((f, j) => tr(f, esTiers[i].features[j], enTiers[i].features[j])),
  }));

  // 2. Page headers (headline + lead)
  const pages = [
    { page: "about", pt: about.pt, es: about.es, en: about.en },
    { page: "energy", pt: energy.pt, es: energy.es, en: energy.en },
    { page: "blog", pt: blog.pt, es: blog.es, en: blog.en },
  ];
  const headerDocs = pages.map((p) => ({
    _id: `pageHeader.${p.page}`,
    _type: "pageHeader",
    page: p.page,
    headline: tr(p.pt.headline, p.es.headline, p.en.headline),
    lead: tr(p.pt.lead, p.es.lead, p.en.lead),
  }));

  // 3. Principles (values)
  const ptValues = about.pt.values as ValueMsg[];
  const esValues = about.es.values as ValueMsg[];
  const enValues = about.en.values as ValueMsg[];
  const principleDocs = ptValues.map((v, i) => ({
    _id: `principle.${i + 1}`,
    _type: "principle",
    order: i,
    t: tr(v.t, esValues[i].t, enValues[i].t),
    b: tr(v.b, esValues[i].b, enValues[i].b),
  }));

  const all: any[] = [...tierDocs, ...headerDocs, ...principleDocs];
  return Promise.all(all.map((doc) => client.createOrReplace(doc)));
}

main()
  .then(() => {
    console.log("✅ Seed páginas: 3 tiers + 3 pageHeader + 4 principle (createOrReplace, id fixo).");
  })
  .catch((err) => {
    console.error("❌ Seed páginas falhou:", err.message);
    process.exit(1);
  });
