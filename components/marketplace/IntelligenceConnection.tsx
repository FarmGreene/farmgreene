import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, LineChart, TrendingUp } from "lucide-react";

export default function IntelligenceConnection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/10 overflow-hidden border-b border-slate-100 dark:border-slate-900">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Context & Copy */}
          <div className="lg:col-span-7 text-left space-y-8">
            <div className="space-y-4">
              <span className="font-handwritten text-2xl text-amber-500 dark:text-amber-400 font-semibold tracking-wide inline-block -rotate-1 origin-center select-none mb-4">
                Integrated Intelligence
              </span>

              <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-900 dark:text-white leading-tight">
                More Than Just <br />
                <span className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Equipment Access
                </span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Farmgreene integrates physical equipment sharing with live market price feeds, helping farmers make smarter decisions beyond simply renting tools. By understanding current prices and trends, you can plan crops better, optimize harvest logistics, and operate with peak efficiency.
              </p>
            </div>

            {/* List of features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Real-time commodity price tracking
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center">
                  <BarChart3 className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Historical crop yield & trend analytics
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center">
                  <LineChart className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Precision forecasting to guide your planning
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/market">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold px-8 h-12 shadow-lg flex items-center gap-2 group"
                >
                  <span>Explore Market Intelligence</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Creative Masked Circular Photo */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Elegant abstract background circles (Agriculture & Organic Product Farm theme) */}
            <div className="absolute w-[420px] h-[420px] rounded-full border border-green-500/10 dark:border-green-400/5 animate-[spin_40s_linear_infinite]"></div>
            <div className="absolute w-[330px] h-[330px] rounded-full border border-dashed border-green-500/20 dark:border-green-400/10 animate-[spin_60s_linear_infinite_reverse]"></div>

            {/* The primary masked circular container */}
            <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full overflow-hidden border-8 border-white dark:border-slate-900 shadow-2xl z-10 group">
              <Image
                src="/images/market-intelligence.png"
                alt="Farmer with crop intelligence data"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay reflection / gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-950/20 to-transparent mix-blend-multiply"></div>
            </div>

            {/* Little floating detail pill */}
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 py-3 px-5 rounded-full shadow-xl z-20 flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Live Feeds Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

