import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WakeBackend } from "@/components/layout/WakeBackend";
import { CommodityMarquee } from "@/components/layout/CommodityMarquee";
import { CookieNotice } from "@/components/layout/CookieNotice";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `font-body` scopes the marketing typefaces (Public Sans / Fraunces /
    // Plex Mono) to the public site — the dashboard keeps Inter and Outfit.
    <main className="font-body bg-field text-bark">
      {/* Warm up the (possibly sleeping) API as soon as a visitor arrives. */}
      <WakeBackend />
      <CommodityMarquee />
      <Navbar />
      <div>{children}</div>
      <Footer />
      <CookieNotice />
    </main>
  );
}
