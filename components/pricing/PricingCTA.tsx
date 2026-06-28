import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PricingCTA() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Simple accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 relative z-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Start Turning Data Into Decisions
        </h2>
        <p className="text-slate-300 text-lg max-w-xl mx-auto mb-10">
          Join thousands of analysts, traders, and agricultural leaders who rely
          on Farmgreene.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-[#049878] hover:bg-green-700 text-white min-w-[180px] h-12 rounded-full font-semibold"
            >
              Start Free
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="text-black bg-white hover:bg-slate-100 min-w-[180px] h-12 rounded-full border-transparent"
            >
              Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
