// Alager Site — Blog page (fetches data, passes to client)
import { getPosts } from "@/lib/sanity";
import { BlogClient } from "./BlogClient";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getPosts();

  return <BlogClient locale={locale} posts={posts} />;
}
