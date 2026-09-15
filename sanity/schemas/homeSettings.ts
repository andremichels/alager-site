// Alager Site — Sanity schema: Home settings (singleton)
import { defineType, defineField } from "sanity";

export const homeSettings = defineType({
  name: "homeSettings",
  type: "document",
  title: "Home — Configurações",
  fields: [
    defineField({ name: "heroKicker", type: "localeString", title: "Hero · Kicker" }),
    defineField({ name: "heroHeadline", type: "localeString", title: "Hero · Headline" }),
    defineField({ name: "heroLead", type: "localeString", title: "Hero · Lead" }),
    defineField({ name: "heroCtaPrimary", type: "localeString", title: "Hero · CTA primário" }),
    defineField({ name: "heroCtaSecondary", type: "localeString", title: "Hero · CTA secundário" }),

    defineField({ name: "pillarsKicker", type: "localeString", title: "Pilares · Kicker" }),
    defineField({
      name: "pillars",
      type: "array",
      title: "Pilares",
      of: [{ type: "homePillar" }],
    }),

    defineField({ name: "voiceKicker", type: "localeString", title: "Voz · Kicker" }),
    defineField({ name: "voiceQuote", type: "localeString", title: "Voz · Citação" }),
    defineField({ name: "voiceName", type: "string", title: "Voz · Nome" }),
    defineField({ name: "voiceRole", type: "localeString", title: "Voz · Cargo" }),
    defineField({ name: "voiceBody", type: "localeString", title: "Voz · Corpo" }),

    defineField({ name: "newsKicker", type: "localeString", title: "Notícias · Kicker" }),
    defineField({ name: "newsTitle", type: "localeString", title: "Notícias · Título" }),
    defineField({ name: "newsAll", type: "localeString", title: "Notícias · Ver todas" }),

    defineField({ name: "joinKicker", type: "localeString", title: "CTA · Kicker" }),
    defineField({ name: "joinTitle", type: "localeString", title: "CTA · Título" }),
    defineField({ name: "joinBody", type: "localeString", title: "CTA · Corpo" }),
  ],
  preview: {
    select: { subtitle: "heroHeadline.pt" },
    prepare({ subtitle }: { subtitle?: string }) {
      return { title: "Home", subtitle: subtitle || "Configurações da página inicial" };
    },
  },
});
