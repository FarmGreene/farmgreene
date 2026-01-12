import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <Navbar />
      <section>{children}</section>
      <Footer />
    </main>
  );
}
