import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MarketHero() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/30">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Turn Commodity Price Data <br /> Into Actionable Insight
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
          Farmgreene’s Market Intelligence tools help farmers, traders, and
          agribusinesses understand price movements, identify trends, and make
          informed decisions using reliable data and AI-powered analysis.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#ai-analysis">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white min-w-[200px] h-12 rounded-full font-semibold"
            >
              View Sample Insights
            </Button>
          </Link>
          <Link href="/pricing">
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] h-12 rounded-full font-semibold"
            >
              Explore Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
