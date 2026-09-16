// Alager Site — Blog page (fetches data, passes to client)
import type { Metadata } from "next";
import { getPosts, getPageHeader } from "@/lib/sanity";
import { BlogClient } from "./BlogClient";
import { buildPageMetadata, pageMeta } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = pageMeta.blog[locale] ?? pageMeta.blog.pt;
  return buildPageMetadata(locale, "blog", m);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [posts, header] = await Promise.all([getPosts(), getPageHeader("blog")]);

  return <BlogClient locale={locale} posts={posts} header={header} />;
}
