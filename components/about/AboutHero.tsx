import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-slate-900">
      {/* Background Image Placeholder */}
      <div
        className="absolute inset-0 z-0 opacity-80 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/about-hero.png')",
          backgroundColor: "#1a2e1a", // Fallback color
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent" />

      <div className="relative z-20 w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 balanced">
            Building Smarter Access to{" "}
            <span className="text-emerald-400">Agriculture</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Farmgreene connects farmers, equipment owners, and market agents
            through a trusted ecosystem that unlocks new income and drives
            transparency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 text-lg"
              asChild
            >
              <Link href="#mission">Our Mission</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10 rounded-full px-8 text-lg"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
