// Alager Site — Seed energySource + country (idempotent)
// Usage: set -a && source .env.local && set +a && npx tsx sanity/seed-energy-countries.ts
import { createClient } from "@sanity/client";
import { ENERGY_SOURCES } from "../src/data/energy-sources";
import { COUNTRIES } from "../src/data/countries";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-25",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {
  const energyCount = await client.fetch(`count(*[_type == "energySource"])`);
  if (energyCount > 0) {
    console.log(`⚠️ energySource já tem ${energyCount} docs — pulando.`);
  } else {
    for (const [i, source] of ENERGY_SOURCES.entries()) {
      await client.create({
        _type: "energySource",
        key: source.key,
        name: source.name,
        order: i,
        body: source.body,
        focus: source.focus,
        stats: source.stats.map((s) => ({ value: s.value, label: s.label })),
      });
      console.log(`  ✓ Energy source: ${source.key}`);
    }
  }

  const countryCount = await client.fetch(`count(*[_type == "country"])`);
  if (countryCount > 0) {
    console.log(`⚠️ country já tem ${countryCount} docs — pulando.`);
  } else {
    for (const c of COUNTRIES) {
      await client.create({
        _type: "country",
        code: c.code,
        name: c.name,
        members: c.members,
        capacity: c.capacity,
        member: c.member,
      });
      console.log(`  ✓ Country: ${c.code}`);
    }
  }

  const finalEnergy = await client.fetch(`count(*[_type == "energySource"])`);
  const finalCountry = await client.fetch(`count(*[_type == "country"])`);
  console.log(`\n✅ energySource: ${finalEnergy} docs | country: ${finalCountry} docs.`);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
