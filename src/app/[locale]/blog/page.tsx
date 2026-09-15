// Alager Site — Blog page (fetches data, passes to client)
import { getPosts, getPageHeader } from "@/lib/sanity";
import { BlogClient } from "./BlogClient";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [posts, header] = await Promise.all([getPosts(), getPageHeader("blog")]);

  return <BlogClient locale={locale} posts={posts} header={header} />;
}
