// Alager Site — [locale] layout with Header + Footer + visual editing
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/lib/live";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

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
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
      <SanityLive />
      {isEnabled && <VisualEditing />}
    </NextIntlClientProvider>
  );
}
