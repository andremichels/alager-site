// Alager Site — Sanity client + typed fetch functions
import { createClient } from "next-sanity";
import { cache } from "react";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2025-01-01";
const token = process.env.SANITY_API_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  token,
});

// ═══════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════

export interface Post {
  _id: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  body?: Record<string, string>;
  cat: Record<string, string>;
  slug?: { current: string };
  date: string;
  read: number;
  featured: boolean;
  membersOnly: boolean;
  imageUrl?: string;
}

export interface BoardMember {
  _id: string;
  name: string;
  role: Record<string, string>;
  country: string;
  order: number;
  imageUrl?: string;
}

export interface TimelineEntry {
  _id: string;
  year: number;
  title: Record<string, string>;
  body: Record<string, string>;
}

// ═══════════════════════════════════════════════
// Fetch functions (cached with React cache)
// ═══════════════════════════════════════════════

export const getPosts = cache(async (): Promise<Post[]> => {
  return sanityClient.fetch(`*[_type == "post"] | order(date desc) {
    _id,
    title,
    excerpt,
    cat,
    "slug": slug { current },
    date,
    read,
    featured,
    membersOnly,
    "imageUrl": mainImage.asset->url
  }`);
});

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      excerpt,
      body,
      cat,
      "slug": slug { current },
      date,
      read,
      featured,
      membersOnly,
      "imageUrl": mainImage.asset->url
    }`,
    { slug }
  );
});

export const getBoardMembers = cache(async (): Promise<BoardMember[]> => {
  return sanityClient.fetch(`*[_type == "boardMember"] | order(order asc) {
    _id, name, role, country, order,
    "imageUrl": photo.asset->url
  }`);
});

export const getTimelineEntries = cache(async (): Promise<TimelineEntry[]> => {
  return sanityClient.fetch(`*[_type == "timelineEntry"] | order(year asc) {
    _id, year, title, body
  }`);
});

export const getInstitutionalText = cache(
  async (section: string): Promise<string | null> => {
    const result = await sanityClient.fetch(
      `*[_type == "institutionalText" && section == $section][0] { content }`,
      { section }
    );
    return result?.content || null;
  }
);
