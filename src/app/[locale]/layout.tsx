// Alager Site — [locale] layout with Header + Footer
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${newsreader.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
