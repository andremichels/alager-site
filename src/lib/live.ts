// Alager Site — Live Content API (defineLive) for visual editing + real-time preview
import { defineLive } from "next-sanity/live";
import { client, apiVersion } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});
