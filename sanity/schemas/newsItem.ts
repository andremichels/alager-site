// Alager Site — Sanity schema: NewsItem (clipping / radar do setor)
// Resumo próprio de matéria de terceiro + link para a fonte (não republica).
import { defineType, defineField } from "sanity";

export const newsItem = defineType({
  name: "newsItem",
  type: "document",
  title: "Clipping / Radar",
  fields: [
    defineField({
      name: "title",
      type: "localeString",
      title: "Título (resumo próprio)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "localeString",
      title: "Resumo (2–3 linhas)",
    }),
    defineField({ name: "outlet", type: "string", title: "Veículo / fonte" }),
    defineField({ name: "url", type: "url", title: "Link original" }),
    defineField({ name: "date", type: "date", title: "Data" }),
    defineField({
      name: "topic",
      type: "reference",
      to: [{ type: "topic" }],
      title: "Tema",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Destaque",
      initialValue: false,
    }),
    defineField({
      name: "sharedBy",
      type: "string",
      title: "Compartilhado por (interno)",
      description: "Metadado interno — não aparece no site. Salvo autorização expressa.",
      options: { canvasApp: { exclude: true } },
    }),
  ],
  orderings: [
    { name: "date", title: "Data (recentes primeiro)", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title.pt", subtitle: "outlet", date: "date" },
    prepare({ title, subtitle, date }: { title?: string; subtitle?: string; date?: string }) {
      return { title: title || "—", subtitle: [subtitle, date].filter(Boolean).join(" · ") };
    },
  },
});
