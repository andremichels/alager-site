// Alager Site — Blog post detail (fetches by slug)
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PostDetailClient } from "./PostDetailClient";
import { JsonLd } from "@/components/atoms/JsonLd";
import { SITE_URL, siteTitle, defaultDescription, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  const canonicalSlug = post?.slug?.current ?? slug;
  const title = post?.title?.[locale] ?? siteTitle[locale];
  const description = post?.excerpt?.[locale] ?? defaultDescription[locale];
  return buildPageMetadata(locale, `blog/${canonicalSlug}`, {
    title,
    description,
    image: post?.imageUrl,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const canonicalSlug = post.slug?.current ?? slug;
  const canonicalUrl = `${SITE_URL}/${locale}/blog/${canonicalSlug}`;
  const title = post.title?.[locale] ?? "";
  const description = post.excerpt?.[locale] ?? "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: title,
    description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale === "pt" ? "pt-BR" : locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    image: post.imageUrl ? [post.imageUrl] : undefined,
    articleSection: post.cat?.[locale],
    author: { "@type": "Organization", name: "ALAGER", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ALAGER",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/${locale}/blog`,
      },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PostDetailClient locale={locale} post={post} />
    </>
  );
}
