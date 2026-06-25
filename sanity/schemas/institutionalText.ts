// Alager Site — Sanity schema: Institutional Text (singleton)
import { defineType, defineField } from "sanity";

export const institutionalText = defineType({
  name: "institutionalText",
  type: "document",
  title: "Texto Institucional",
  fields: [
    defineField({
      name: "section",
      type: "string",
      title: "Seção",
      options: {
        list: [
          { value: "home-manifesto", title: "Home — Manifesto" },
          { value: "about-mission", title: "Quem Somos — Missão" },
          { value: "about-vision", title: "Quem Somos — Visão" },
          { value: "about-governance", title: "Quem Somos — Governança" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "content", type: "localeString", title: "Conteúdo" }),
  ],
  preview: {
    select: { title: "section", subtitle: "content.pt" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || "Sem seção", subtitle: subtitle?.slice(0, 60) };
    },
  },
});
