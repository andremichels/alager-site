// Alager Site — Sanity client + typed fetch functions
import { createClient } from "next-sanity";
import { cache } from "react";
import type { EnergySourceInfo } from "@/data/energy-sources";
import type { Country } from "@/data/countries";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-25";
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

export interface HomePillar {
  n: string;
  t: Record<string, string>;
  b: Record<string, string>;
}

export interface HomeSettings {
  heroKicker?: Record<string, string>;
  heroHeadline?: Record<string, string>;
  heroLead?: Record<string, string>;
  heroCtaPrimary?: Record<string, string>;
  heroCtaSecondary?: Record<string, string>;
  pillarsKicker?: Record<string, string>;
  pillars?: HomePillar[];
  voiceKicker?: Record<string, string>;
  voiceQuote?: Record<string, string>;
  voiceName?: string;
  voiceRole?: Record<string, string>;
  voiceBody?: Record<string, string>;
  newsKicker?: Record<string, string>;
  newsTitle?: Record<string, string>;
  newsAll?: Record<string, string>;
  joinKicker?: Record<string, string>;
  joinTitle?: Record<string, string>;
  joinBody?: Record<string, string>;
}

export interface MembershipTier {
  key: string;
  name: Record<string, string>;
  price: Record<string, string>;
  desc: Record<string, string>;
  features: Record<string, string>[];
  order: number;
}

export interface Principle {
  t: Record<string, string>;
  b: Record<string, string>;
  order: number;
}

export interface PageHeader {
  page: string;
  headline?: Record<string, string>;
  lead?: Record<string, string>;
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
  async (section: string): Promise<Record<string, string> | null> => {
    const result = await sanityClient.fetch(
      `*[_type == "institutionalText" && section == $section][0] { content }`,
      { section }
    );
    return result?.content || null;
  }
);

export const getEnergySources = cache(async (): Promise<EnergySourceInfo[]> => {
  return sanityClient.fetch(`*[_type == "energySource"] | order(order asc) {
    key, name, body, focus,
    "stats": stats[] { value, label }
  }`);
});

export const getCountries = cache(async (): Promise<Country[]> => {
  return sanityClient.fetch(`*[_type == "country"] | order(code asc) {
    code, name, members, capacity, member
  }`);
});

export const getHomeSettings = cache(async (): Promise<HomeSettings | null> => {
  return sanityClient.fetch(`*[_type == "homeSettings"][0] {
    heroKicker, heroHeadline, heroLead, heroCtaPrimary, heroCtaSecondary,
    pillarsKicker,
    "pillars": pillars[] { n, t, b },
    voiceKicker, voiceQuote, voiceName, voiceRole, voiceBody,
    newsKicker, newsTitle, newsAll,
    joinKicker, joinTitle, joinBody
  }`);
});

export const getMembershipTiers = cache(async (): Promise<MembershipTier[]> => {
  return sanityClient.fetch(`*[_type == "membershipTier"] | order(order asc) {
    key, name, price, desc, features, order
  }`);
});

export const getPrinciples = cache(async (): Promise<Principle[]> => {
  return sanityClient.fetch(`*[_type == "principle"] | order(order asc) {
    t, b, order
  }`);
});

export const getPageHeader = cache(
  async (page: string): Promise<PageHeader | null> => {
    return sanityClient.fetch(
      `*[_type == "pageHeader" && page == $page][0] { page, headline, lead }`,
      { page }
    );
  }
);
