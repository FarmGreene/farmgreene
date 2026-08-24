import type { Metadata } from "next";
import {
  Inter,
  Outfit,
  Caveat,
  Fraunces,
  Public_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Marketing typeface trio. Scoped to the public site via `font-body` on the
 * (public) layout — the dashboard keeps Inter/Outfit untouched.
 *
 * Fraunces carries the display voice (warm, high-craft, not a default pairing),
 * Public Sans is built for legibility at small sizes on poor screens, and
 * IBM Plex Mono sets every figure so numbers read as a record of fact.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Farmgreene | Agricultural Equipment Rental & Market Intelligence",
    template: "%s | Farmgreene",
  },
  description:
    "Daily commodity prices collected by field agents across every region, price alerts, market analysis, and farm equipment to rent from owners near you.",
  keywords: [
    "commodity prices",
    "market intelligence",
    "farm equipment rental",
    "agriculture machinery",
    "crop pricing",
    "price alerts",
    "agtech",
  ],
  authors: [{ name: "Farmgreene Team" }],
  creator: "Farmgreene",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://farmgreene.com",
    title: "Farmgreene | Agricultural Equipment Rental & Market Intelligence",
    description:
      "Know what your crop is worth before you sell it. Real prices from real markets, plus the equipment to work your land.",
    siteName: "Farmgreene",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Farmgreene Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farmgreene | Market prices and farm equipment",
    description:
      "Daily commodity prices from real markets, alerts when your price hits, and equipment to rent nearby.",
    images: ["/og-image.jpg"],
    creator: "@farmgreene",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} ${caveat.variable} ${fraunces.variable} ${publicSans.variable} ${plexMono.variable} antialiased font-sans`}
      >
        <NuqsAdapter>
          <QueryProvider>
            <Toaster position="top-right" richColors />
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
