// Alager Site — Sanity types + typed fetch functions (via Live Content API)
import { draftMode } from "next/headers";
import { sanityFetch } from "@/lib/live";
import type { EnergySourceInfo } from "@/data/energy-sources";
import type { Country } from "@/data/countries";

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

export interface Topic {
  _id: string;
  title: Record<string, string>;
  slug?: { current: string };
  order?: number;
}

export interface NewsItem {
  _id: string;
  title: Record<string, string>;
  summary?: Record<string, string>;
  outlet?: string;
  url?: string;
  date?: string;
  topic?: { _id: string; title: Record<string, string>; slug?: { current: string } } | null;
  featured?: boolean;
  sharedBy?: string;
}

export interface EventItem {
  _id: string;
  name: Record<string, string>;
  dateStart?: string;
  dateEnd?: string;
  location?: string;
  url?: string;
  description?: Record<string, string>;
  imageUrl?: string;
  origin?: string;
  topic?: { _id: string; title: Record<string, string>; slug?: { current: string } } | null;
}

export interface SectorMetric {
  label?: Record<string, string>;
  value?: string;
  source?: string;
  date?: string;
}

export interface SectorData {
  kicker?: Record<string, string>;
  title?: Record<string, string>;
  metrics?: SectorMetric[];
}

// ═══════════════════════════════════════════════
// Fetch functions (via sanityFetch — stega + draft mode aware)
// ═══════════════════════════════════════════════

// Resolve perspective + stega explicitly. next-sanity v13 defaults to a
// draft perspective (via cookie) when a serverToken is present, which returns
// nothing for published-only documents — so we resolve it ourselves.
async function liveOptions() {
  const { isEnabled } = await draftMode();
  return {
    perspective: isEnabled ? ("drafts" as const) : ("published" as const),
    stega: isEnabled,
  };
}

export async function getPosts(): Promise<Post[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "post"] | order(date desc) {
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
    }`,
    ...(await liveOptions()),
  });
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "post" && (slug.current == $slug || _id == $slug)][0] {
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
    params: { slug },
    ...(await liveOptions()),
  });
  return (data as Post | null) ?? null;
}

export async function getBoardMembers(): Promise<BoardMember[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "boardMember"] | order(order asc) {
      _id, name, role, country, order,
      "imageUrl": photo.asset->url
    }`,
    ...(await liveOptions()),
  });
  return (data ?? []) as BoardMember[];
}

export async function getTimelineEntries(): Promise<TimelineEntry[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "timelineEntry"] | order(year asc) {
      _id, year, title, body
    }`,
    ...(await liveOptions()),
  });
  return (data ?? []) as TimelineEntry[];
}

export async function getInstitutionalText(
  section: string
): Promise<Record<string, string> | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "institutionalText" && section == $section][0] { content }`,
    params: { section },
    ...(await liveOptions()),
  });
  return (data as { content: Record<string, string> } | null)?.content ?? null;
}

export async function getEnergySources(): Promise<EnergySourceInfo[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "energySource"] | order(order asc) {
      key, name, body, focus,
      "stats": stats[] { value, label }
    }`,
    ...(await liveOptions()),
  });
  return (data ?? []) as EnergySourceInfo[];
}

export async function getCountries(): Promise<Country[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "country"] | order(code asc) {
      code, name, members, capacity, member
    }`,
    ...(await liveOptions()),
  });
  return (data ?? []) as Country[];
}

export async function getHomeSettings(): Promise<HomeSettings | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "homeSettings"][0] {
      heroKicker, heroHeadline, heroLead, heroCtaPrimary, heroCtaSecondary,
      pillarsKicker,
      "pillars": pillars[] { n, t, b },
      voiceKicker, voiceQuote, voiceName, voiceRole, voiceBody,
      newsKicker, newsTitle, newsAll,
      joinKicker, joinTitle, joinBody
    }`,
    ...(await liveOptions()),
  });
  return (data as HomeSettings | null) ?? null;
}

export async function getMembershipTiers(): Promise<MembershipTier[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "membershipTier"] | order(order asc) {
      key, name, price, desc, features, order
    }`,
    ...(await liveOptions()),
  });
  return (data ?? []) as MembershipTier[];
}

export async function getPrinciples(): Promise<Principle[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "principle"] | order(order asc) {
      t, b, order
    }`,
    ...(await liveOptions()),
  });
  return (data ?? []) as Principle[];
}

export async function getPageHeader(page: string): Promise<PageHeader | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "pageHeader" && page == $page][0] { page, headline, lead }`,
    params: { page },
    ...(await liveOptions()),
  });
  return (data as PageHeader | null) ?? null;
}

export async function getTopics(): Promise<Topic[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "topic"] | order(order asc) {
      _id, title, "slug": slug { current }, order
    }`,
    ...(await liveOptions()),
  });
  return (data ?? []) as Topic[];
}

export async function getNewsItems(): Promise<NewsItem[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "newsItem"] | order(date desc) {
      _id, title, summary, outlet, url, date, featured,
      "topic": topic->{ _id, title, "slug": slug { current } }
    }`,
    ...(await liveOptions()),
  });
  return (data ?? []) as NewsItem[];
}

export async function getEvents(): Promise<EventItem[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "event"] | order(dateStart asc) {
      _id, name, dateStart, dateEnd, location, url, description, origin,
      "imageUrl": image.asset->url,
      "topic": topic->{ _id, title, "slug": slug { current } }
    }`,
    ...(await liveOptions()),
  });
  return (data ?? []) as EventItem[];
}

export async function getSectorData(): Promise<SectorData | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "sectorData"][0] {
      kicker, title,
      "metrics": metrics[] { label, value, source, date }
    }`,
    ...(await liveOptions()),
  });
  return (data as SectorData | null) ?? null;
}
