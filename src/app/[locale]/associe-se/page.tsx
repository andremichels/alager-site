// Alager Site — Associe-se (fetches data, passes to client)
import { getCountries, getMembershipTiers } from "@/lib/sanity";
import { COUNTRIES } from "@/data/countries";
import AssocieSeClient from "./AssocieSeClient";

export default async function AssocieSePage() {
  const [sanityCountries, tiers] = await Promise.all([
    getCountries(),
    getMembershipTiers(),
  ]);

  const countries = sanityCountries.length ? sanityCountries : COUNTRIES;

  return <AssocieSeClient countries={countries} tiers={tiers} />;
}
