// Alager Site — sitemap.xml (all locales + blog posts, with hreflang alternates)
import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES } from "@/lib/seo";
import { getPosts } from "@/lib/sanity";

export const revalidate = 3600;

const STATIC_PATHS: { path: string; priority: number; changeFrequency: string }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "quem-somos", priority: 0.8, changeFrequency: "monthly" },
  { path: "energias-renovaveis", priority: 0.8, changeFrequency: "monthly" },
  { path: "associe-se", priority: 0.8, changeFrequency: "monthly" },
  { path: "blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "politica-de-privacidade", priority: 0.2, changeFrequency: "yearly" },
];

function languagesFor(path: string) {
  const suffix = path ? `/${path}` : "";
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[l] = `${SITE_URL}/${l}${suffix}`;
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of STATIC_PATHS) {
    const suffix = path ? `/${path}` : "";
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${suffix}`,
        lastModified: new Date(),
        changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
        priority,
        alternates: { languages: languagesFor(path) },
      });
    }
  }

  const posts = await getPosts();
  for (const post of posts) {
    const slug = post.slug?.current;
    if (!slug) continue;
    const path = `blog/${slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}/${path}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: languagesFor(path) },
      });
    }
  }

  return entries;
}
