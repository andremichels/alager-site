// Alager Site — Presentation Tool document→URL resolver
import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    post: defineLocations({
      select: { title: "title.pt", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Post", href: `/pt/blog/${doc?.slug}` },
          { title: "Blog", href: "/pt/blog" },
        ],
      }),
    }),
    homeSettings: defineLocations({
      select: { title: "heroHeadline.pt" },
      resolve: () => ({ locations: [{ title: "Home", href: "/pt" }] }),
    }),
    pageHeader: defineLocations({
      select: { page: "page" },
      resolve: (doc) => ({
        locations: [
          {
            title: `Página: ${doc?.page || ""}`,
            href: pageHref(doc?.page),
          },
        ],
      }),
    }),
  },
};

function pageHref(page?: string): string {
  switch (page) {
    case "about":
      return "/pt/quem-somos";
    case "energy":
      return "/pt/energias-renovaveis";
    case "blog":
      return "/pt/blog";
    default:
      return "/pt";
  }
}
