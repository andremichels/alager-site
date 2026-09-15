// Alager Site — Draft Mode enable route (called by the Presentation Tool)
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/lib/client";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN || "",
  }),
});
