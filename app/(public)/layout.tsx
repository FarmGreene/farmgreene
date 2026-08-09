import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WakeBackend } from "@/components/layout/WakeBackend";
import { CommodityMarquee } from "@/components/layout/CommodityMarquee";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      {/* Warm up the (possibly sleeping) API as soon as a visitor arrives. */}
      <WakeBackend />
      <CommodityMarquee />
      <Navbar />
      <section>{children}</section>
      <Footer />
    </main>
  );
}
