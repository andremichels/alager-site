// Alager Site — SEO / metadata helpers
// Centralized so every page shares the same canonical/hreflang/OG logic.

import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.alager.org.br";
export const SITE_NAME = "ALAGER";
export const LOCALES = ["pt", "es", "en"] as const;
export const DEFAULT_LOCALE = "pt";

export const OG_IMAGE = `${SITE_URL}/opengraph-image.png`;

export const defaultDescription: Record<string, string> = {
  pt: "A ALAGER reúne associações, geradoras e instituições de energia renovável da América Latina para articular políticas públicas, qualificar o debate regulatório e defender o investimento na transição energética.",
  es: "ALAGER reúne asociaciones, generadoras e instituciones de energía renovable de América Latina para articular políticas públicas, cualificar el debate regulatorio y defender la inversión en la transición energética.",
  en: "ALAGER brings together Latin American renewable-energy associations, generators and institutions to coordinate public policy, elevate the regulatory debate and defend investment in the energy transition.",
};

export const siteTitle: Record<string, string> = {
  pt: "ALAGER — Associação Latino-Americana de Energia Renovável",
  es: "ALAGER — Asociación Latinoamericana de Energía Renovable",
  en: "ALAGER — Latin American Renewable Energy Association",
};

// Per-page SEO copy (route key → locale → { title, description }).
// Blog posts get their title/description from Sanity instead.
export const pageMeta: Record<
  string,
  Record<string, { title: string; description: string }>
> = {
  blog: {
    pt: {
      title: "Blog",
      description:
        "Análises, posicionamentos e o calendário regulatório do setor de energias renováveis na América Latina.",
    },
    es: {
      title: "Blog",
      description:
        "Análisis, posicionamientos y el calendario regulatorio del sector de energías renovables en América Latina.",
    },
    en: {
      title: "Blog",
      description:
        "Analysis, positions and the regulatory calendar for the renewable energy sector across Latin America.",
    },
  },
  about: {
    pt: {
      title: "Quem Somos",
      description:
        "Conheça a ALAGER: missão, visão, governança, diretoria e a trajetória da associação que articula a transição energética latino-americana desde 2018.",
    },
    es: {
      title: "Quiénes Somos",
      description:
        "Conozca a ALAGER: misión, visión, gobernanza, directorio y la trayectoria de la asociación que articula la transición energética latinoamericana desde 2018.",
    },
    en: {
      title: "About Us",
      description:
        "Meet ALAGER: mission, vision, governance, board and the trajectory of the association coordinating Latin America's energy transition since 2018.",
    },
  },
  energy: {
    pt: {
      title: "Energias Renováveis",
      description:
        "Eólica, solar, hídrica e outras fontes renováveis: o panorama, os dados e o potencial da matriz limpa na América Latina.",
    },
    es: {
      title: "Energías Renovables",
      description:
        "Eólica, solar, hídrica y otras fuentes renovables: el panorama, los datos y el potencial de la matriz limpia en América Latina.",
    },
    en: {
      title: "Renewable Energy",
      description:
        "Wind, solar, hydro and other renewable sources: the landscape, data and potential of the clean energy mix in Latin America.",
    },
  },
  join: {
    pt: {
      title: "Associe-se",
      description:
        "Junte-se à ALAGER e conecte sua organização à rede que defende o investimento em energias renováveis na América Latina.",
    },
    es: {
      title: "Asóciese",
      description:
        "Únase a ALAGER y conecte su organización a la red que defiende la inversión en energías renovables en América Latina.",
    },
    en: {
      title: "Become a Member",
      description:
        "Join ALAGER and connect your organization to the network defending renewable-energy investment across Latin America.",
    },
  },
  privacy: {
    pt: {
      title: "Política de Privacidade",
      description: "Como a ALAGER coleta, usa e protege os seus dados.",
    },
    es: {
      title: "Política de Privacidad",
      description: "Cómo ALAGER recopila, usa y protege sus datos.",
    },
    en: {
      title: "Privacy Policy",
      description: "How ALAGER collects, uses and protects your data.",
    },
  },
  noticias: {
    pt: {
      title: "Notícias",
      description:
        "Curadoria das principais notícias e movimentos do setor de energias renováveis na América Latina, com link para a fonte original.",
    },
    es: {
      title: "Noticias",
      description:
        "Curaduría de las principales noticias y movimientos del sector de energías renovables en América Latina, con enlace a la fuente original.",
    },
    en: {
      title: "News",
      description:
        "A curated roundup of the renewable-energy sector's key news and developments across Latin America, linking to the original source.",
    },
  },
  agenda: {
    pt: {
      title: "Agenda",
      description:
        "Conferências, leilões e encontros relevantes para a energia renovável na América Latina.",
    },
    es: {
      title: "Agenda",
      description:
        "Conferencias, subastas y encuentros relevantes para la energía renovable en América Latina.",
    },
    en: {
      title: "Agenda",
      description:
        "Conferences, auctions and gatherings relevant to renewable energy across Latin America.",
    },
  },
};

// Build canonical + hreflang alternates for a given locale and path ("" = home).
export function alternatesFor(locale: string, path: string) {
  const suffix = path ? `/${path}` : "";
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}/${l}${suffix}`;
  }
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${suffix}`;
  return {
    canonical: `${SITE_URL}/${locale}${suffix}`,
    languages,
  };
}

// Unified per-page metadata builder. `path` is the locale-relative route
// ("" = home, "blog", "blog/<slug>", "quem-somos", etc.).
export function buildPageMetadata(
  locale: string,
  path: string,
  opts: {
    title?: string;
    description?: string;
    image?: string;
    type?: "website" | "article";
  } = {},
): Metadata {
  const title = opts.title ?? siteTitle[locale] ?? siteTitle.pt;
  const description =
    opts.description ?? defaultDescription[locale] ?? defaultDescription.pt;
  const url = `${SITE_URL}/${locale}${path ? `/${path}` : ""}`;
  const image = opts.image
    ? { url: opts.image, width: 1200, height: 630, alt: title }
    : { url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME };
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "pt" ? "pt_BR" : locale,
      type: opts.type ?? "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
