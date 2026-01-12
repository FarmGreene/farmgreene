import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OwnerNudge() {
  return (
    <section className="py-20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center md:text-left relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Turn Idle Equipment into Income
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Don't let your machinery rust in the shed. List it on
                Farmgreene, set your own availability and pricing, and start
                earning today.
              </p>
              <Link href="/register?role=owner" className="inline-block">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-slate-100 rounded-full font-semibold px-8"
                >
                  List Your Equipment
                </Button>
              </Link>
            </div>
            {/* Visual placeholder for Owner Dashboard preview */}
            <div className="hidden md:block relative h-64 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center opacity-80 rotate-3 hover:rotate-0 transition-transform duration-500">
              <span className="text-slate-500 font-mono text-sm">
                [Owner Dashboard Preview]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
