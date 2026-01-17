import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-20 md:py-32 bg-green-900 text-white relative overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 h-[500px] w-[500px] rounded-full bg-green-800/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-[500px] w-[500px] rounded-full bg-emerald-800/20 blur-3xl pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight font-heading">
          Let’s Build Smarter Agriculture Together
        </h2>
        <p className="text-xl text-green-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          From better pricing data to AI-powered insights — Farmgreene is
          shaping the future of agricultural intelligence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-green-900 hover:bg-green-50 min-w-[200px] h-14 text-base font-semibold"
          >
            <Link href="/intelligence">Explore Market Intelligence</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-green-400/30 text-white hover:bg-green-800 hover:text-white hover:border-green-400 min-w-[200px] h-14 text-base font-semibold bg-transparent"
          >
            <Link href="/pricing">
              View Pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
