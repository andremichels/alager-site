// Alager Site — [locale] layout with Header + Footer + visual editing + structured data
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/lib/live";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/atoms/JsonLd";
import { SITE_URL, SITE_NAME, siteTitle, defaultDescription } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      default: siteTitle[locale] ?? siteTitle.pt,
      template: `%s — ${SITE_NAME}`,
    },
    description: defaultDescription[locale] ?? defaultDescription.pt,
    openGraph: {
      locale: locale === "pt" ? "pt_BR" : locale,
      alternateLocale: ["pt_BR", "es", "en"],
    },
  };
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "ALAGER",
  alternateName: "Associação Latino-Americana de Energia Renovável",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-dark.png`,
  foundingDate: "2018",
  email: "secretaria@alager.org.br",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressCountry: "BR",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "ALAGER",
  url: SITE_URL,
  inLanguage: ["pt-BR", "es", "en"],
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const { isEnabled } = await draftMode();

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
      <SanityLive />
      {isEnabled && <VisualEditing />}
    </NextIntlClientProvider>
  );
}
