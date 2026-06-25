// Alager Site — Home page (fetches data, passes to client)
import { getPosts } from "@/lib/sanity";
import { HomeClient } from "./HomeClient";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getPosts();

  return <HomeClient locale={locale} posts={posts.slice(0, 3)} />;
}
