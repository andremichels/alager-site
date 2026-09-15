// Alager Site — Energias Renováveis (fetches data, passes to client)
import { getEnergySources, getCountries, getPageHeader } from "@/lib/sanity";
import { ENERGY_SOURCES } from "@/data/energy-sources";
import { COUNTRIES } from "@/data/countries";
import EnergiasClient from "./EnergiasClient";

export default async function EnergiasPage() {
  const [sanitySources, sanityCountries, header] = await Promise.all([
    getEnergySources(),
    getCountries(),
    getPageHeader("energy"),
  ]);

  const sources = sanitySources.length ? sanitySources : ENERGY_SOURCES;
  const countries = sanityCountries.length ? sanityCountries : COUNTRIES;

  return <EnergiasClient sources={sources} countries={countries} header={header} />;
}
