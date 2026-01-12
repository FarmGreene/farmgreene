import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MarketCTA() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Simple accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 relative z-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Start Making Data-Driven <br /> Market Decisions
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/pricing">
            <Button
              size="lg"
              variant="outline"
              className="text-black bg-white hover:bg-slate-100 min-w-[180px] h-12 rounded-full border-transparent"
            >
              Explore Pricing
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white min-w-[180px] h-12 rounded-full font-semibold"
            >
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
