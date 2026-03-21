import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Farmgreene | Agricultural Equipment Rental & Market Intelligence",
    template: "%s | Farmgreene",
  },
  description:
    "Farmgreene connects farmers, equipment owners, and agents. Rent agricultural machinery, track market prices, and access data-driven intelligence for Australian agriculture.",
  keywords: [
    "farm equipment rental",
    "agriculture machinery",
    "market intelligence",
    "farm data Australia",
    "tractor rental",
    "crop pricing",
    "agtech",
  ],
  authors: [{ name: "Farmgreene Team" }],
  creator: "Farmgreene",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://farmgreene.com",
    title: "Farmgreene | Agricultural Equipment Rental & Market Intelligence",
    description:
      "Connect, rent, and grow with Farmgreene. The premier platform for agricultural equipment sharing and market insights.",
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
    title: "Farmgreene | AgTech Platform",
    description:
      "Rent equipment, track prices, and optimize your farm operations.",
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
        className={`${inter.variable} ${outfit.variable} antialiased font-sans`}
      >
        <NuqsAdapter>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
