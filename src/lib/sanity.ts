// Alager Site — Sanity client for fetching data
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-25";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  stega: false,
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  return builder.image(source);
}

// Pre-configured GROQ fragments
export const localeStringFragment = `
  pt,
  es,
  en
`;

// Reusable queries
export const queries = {
  posts: `*[_type == "post"] | order(date desc) {
    _id,
    title { ${localeStringFragment} },
    excerpt { ${localeStringFragment} },
    "slug": slug.current,
    "cat": cat { ${localeStringFragment} },
    date,
    read,
    featured,
    membersOnly,
    "image": mainImage.asset->url
  }`,

  postsByFeatured: `*[_type == "post" && featured == true] | order(date desc) [0] {
    _id,
    title { ${localeStringFragment} },
    excerpt { ${localeStringFragment} },
    "slug": slug.current,
    "cat": cat { ${localeStringFragment} },
    date,
    read,
    membersOnly,
    "image": mainImage.asset->url
  }`,

  boardMembers: `*[_type == "boardMember"] | order(order asc) {
    _id,
    name,
    "role": role { ${localeStringFragment} },
    country,
    order,
    "image": photo.asset->url
  }`,

  timeline: `*[_type == "timelineEntry"] | order(year asc) {
    _id,
    year,
    "title": title { ${localeStringFragment} },
    "body": body { ${localeStringFragment} }
  }`,

  institutionalText: `*[_type == "institutionalText" && section == $section][0] {
    "content": content { ${localeStringFragment} }
  }`,
};
