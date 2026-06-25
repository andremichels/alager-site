// Alager Site — Sanity schema: LocaleString (PT/ES/EN field-level translation)
import { defineType, defineField } from "sanity";

export const localeString = defineType({
  name: "localeString",
  type: "object",
  title: "Texto multilíngue",
  fields: [
    defineField({ name: "pt", type: "text", title: "Português", rows: 3 }),
    defineField({ name: "es", type: "text", title: "Español", rows: 3 }),
    defineField({ name: "en", type: "text", title: "English", rows: 3 }),
  ],
});
