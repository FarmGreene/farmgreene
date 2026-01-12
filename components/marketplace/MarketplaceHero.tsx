import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MarketplaceHero() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Access Agricultural Equipment <br /> When You Need It
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
          Browse a wide range of agricultural equipment available for rent from
          verified owners. Farmgreene makes it easier to access essential tools
          without the burden of ownership.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#listings">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white min-w-[200px] h-12 rounded-full font-semibold"
            >
              Explore Equipment
            </Button>
          </Link>
          <Link href="/register?role=owner">
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] h-12 rounded-full font-semibold"
            >
              List Your Equipment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
