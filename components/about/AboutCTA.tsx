import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="py-20 border-t">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-8">
          Join us as we build a more connected, efficient,{" "}
          <br className="hidden sm:block" /> and transparent agricultural
          ecosystem.
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/marketplace">
            <Button
              size="lg"
              className="bg-[#049878] hover:bg-green-700 text-white min-w-[200px] h-12 rounded-full font-semibold"
            >
              Explore the Marketplace
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] h-12 rounded-full font-semibold"
            >
              Learn How It Works <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
