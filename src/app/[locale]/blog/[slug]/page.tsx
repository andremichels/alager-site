// Alager Site — Blog post detail (fetches by slug)
import { getPostBySlug } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PostDetailClient } from "./PostDetailClient";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return <PostDetailClient locale={locale} post={post} />;
}
