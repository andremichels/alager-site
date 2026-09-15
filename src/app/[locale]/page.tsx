// Alager Site — Home page (fetches data, passes to client)
import { getPosts, getHomeSettings, getCountries } from "@/lib/sanity";
import { COUNTRIES } from "@/data/countries";
import { HomeClient } from "./HomeClient";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [posts, home, sanityCountries] = await Promise.all([
    getPosts(),
    getHomeSettings(),
    getCountries(),
  ]);

  const countries = sanityCountries.length ? sanityCountries : COUNTRIES;

  return (
    <HomeClient
      locale={locale}
      posts={posts.slice(0, 3)}
      home={home}
      countries={countries}
    />
  );
}
