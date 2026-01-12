import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MarketplaceCTA() {
  return (
    // Reusing the style from the main CTA but specific for Marketplace closing
    <section className="py-24 bg-green-900 text-white relative overflow-hidden">
      {/* Simple background texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 relative z-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Ready to get started?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#listings">
            <Button
              size="lg"
              className="bg-white text-green-900 hover:bg-green-50 min-w-[180px] h-12 rounded-full font-semibold"
            >
              Explore Marketplace
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
              className="border-green-400 text-black hover:bg-green-800 hover:text-white min-w-[180px] h-12 rounded-full"
            >
              Create an Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
