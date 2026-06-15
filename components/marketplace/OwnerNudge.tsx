import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Banknote, Calendar } from "lucide-react";

export default function OwnerNudge() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        {/* Sleek card container with custom gradient and overflows */}
        <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-16 lg:p-20 text-center md:text-left relative overflow-hidden shadow-2xl border border-slate-800">
          {/* Abstract backdrop blur glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px]"></div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Premium Text & Value Pillars */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-4">
                <span className="font-handwritten text-2xl text-amber-400 font-semibold tracking-wide inline-block -rotate-1 origin-center select-none mb-4">
                  List & Earn
                </span>
                <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl text-white leading-tight">
                  Turn Idle Equipment <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    into Daily Income
                  </span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                  Don't let your machinery sit idle in the shed. List it on
                  Farmgreene, set your own availability and pricing, and let
                  your equipment work for you.
                </p>
              </div>

              {/* Grid of Micro-Features */}
              <div className="grid sm:grid-cols-3 gap-6 pt-2">
                <div className="flex flex-col gap-2">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <Banknote className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Daily Payouts
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Direct bank transfers.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Secure Coverage
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Verified renter screenings.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Full Autonomy
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Choose your rental dates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-start">
                <Link href="/register?role=owner">
                  <Button
                    size="lg"
                    className="bg-white text-slate-950 hover:bg-slate-100 rounded-full font-semibold px-8 h-12 shadow-lg"
                  >
                    List Your Equipment
                  </Button>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center text-slate-300 font-semibold hover:text-white transition-colors group text-sm gap-2"
                >
                  <span>How payouts work</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Premium Interactive Dashboard Preview */}
            <div className="lg:col-span-6 relative flex justify-center w-full">
              <div className="relative w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 group">
                {/* Soft overlay reflections */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/20 via-transparent to-white/5 z-10 pointer-events-none"></div>

                <Image
                  src="/images/owner-dashboard.png"
                  alt="Owner Dashboard Mockup"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                />

                {/* Dashboard micro-badge overlay */}
                <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider z-20 shadow-lg">
                  Live Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
