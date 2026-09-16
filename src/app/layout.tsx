// Alager Site — Root layout: owns <html>/<body>, fonts and metadata
import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  siteTitle,
  defaultDescription,
} from "@/lib/seo";
import "@/app/globals.css";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a3d2e",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle.pt,
    template: `%s — ${SITE_NAME}`,
  },
  description: defaultDescription.pt,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "energias renováveis",
    "energia renovável",
    "América Latina",
    "transição energética",
    "associação",
    "política pública",
    "regulação",
    "eólica",
    "solar",
    "hídrica",
    "renewable energy",
    "Latin America",
    "energy transition",
  ],
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: siteTitle.pt,
    description: defaultDescription.pt,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle.pt,
    description: defaultDescription.pt,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${newsreader.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
