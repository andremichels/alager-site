// Alager Site — Associe-se (fetches data, passes to client)
import type { Metadata } from "next";
import { getCountries, getMembershipTiers } from "@/lib/sanity";
import { COUNTRIES } from "@/data/countries";
import AssocieSeClient from "./AssocieSeClient";
import { buildPageMetadata, pageMeta } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = pageMeta.join[locale] ?? pageMeta.join.pt;
  return buildPageMetadata(locale, "associe-se", m);
}

export default async function AssocieSePage() {
  const [sanityCountries, tiers] = await Promise.all([
    getCountries(),
    getMembershipTiers(),
  ]);

  const countries = sanityCountries.length ? sanityCountries : COUNTRIES;

  return <AssocieSeClient countries={countries} tiers={tiers} />;
}
