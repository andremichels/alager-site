// Alager Site — Sanity schema: Country (membership roster)
import { defineType, defineField } from "sanity";

export const country = defineType({
  name: "country",
  type: "document",
  title: "País",
  fields: [
    defineField({
      name: "code",
      type: "string",
      title: "Código ISO (BR, AR…)",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "name", type: "localeString", title: "Nome" }),
    defineField({ name: "members", type: "number", title: "Associados" }),
    defineField({ name: "capacity", type: "number", title: "Capacidade (GW)" }),
    defineField({ name: "member", type: "boolean", title: "País membro", initialValue: false }),
  ],
  preview: {
    select: { title: "code", subtitle: "name.pt" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || "—", subtitle };
    },
  },
});
