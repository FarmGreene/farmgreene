import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function MarketplaceHero() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-slate-950 flex items-center min-h-[600px] border-b border-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/images/market-hero.png"
          alt="Marketplace Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Advanced Premium Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/30" />

      <div className="relative z-20 w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Cursive handwritten accent label */}
          <span className="font-handwritten text-2xl text-amber-400 font-semibold tracking-wide inline-block -rotate-1 origin-center select-none animate-pulse">
            Premium Shared Machinery
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Access Elite Equipment <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              When You Need It
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-light">
            Browse a wide range of agricultural equipment available for rent from
            verified owners. Farmgreene makes it easier to access essential tools
            without the burden of ownership.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="#listings" className="inline-block">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 text-lg font-semibold h-14 shadow-lg min-w-[200px]"
              >
                Explore Equipment
              </Button>
            </Link>
            <Link href="/register?role=owner" className="inline-block">
              <Button
                size="lg"
                variant="outline"
                className="text-black border-white/20 hover:bg-white/10 rounded-full px-8 text-lg font-semibold h-14 min-w-[200px]"
              >
                List Your Equipment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

