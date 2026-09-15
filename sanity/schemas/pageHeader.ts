// Alager Site — Sanity schema: Page header (headline + lead per page)
import { defineType, defineField } from "sanity";

export const pageHeader = defineType({
  name: "pageHeader",
  type: "document",
  title: "Cabeçalho de Página",
  fields: [
    defineField({
      name: "page",
      type: "string",
      title: "Página",
      options: {
        list: [
          { value: "about", title: "Quem Somos" },
          { value: "energy", title: "Energias Renováveis" },
          { value: "blog", title: "Blog" },
        ],
        canvasApp: { exclude: true },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "headline", type: "localeString", title: "Headline" }),
    defineField({ name: "lead", type: "localeString", title: "Lead" }),
  ],
  preview: {
    select: { title: "page", subtitle: "headline.pt" },
  },
});
