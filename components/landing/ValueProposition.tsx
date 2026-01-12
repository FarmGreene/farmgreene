import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function ValueProposition() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why Farmgreene Exists
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Farmgreene bridges the gap between access, ownership, and
                intelligence—unlocking efficiency across the agricultural value
                chain.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Fragmented access to farm equipment",
                "Poor price transparency in markets",
                "Idle assets leading to lost income",
                "Lack of data-driven decision making",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                  <span className="font-medium text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-slate-100 border">
            {/* Placeholder for an illustration or image */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-slate-200 flex items-center justify-center text-muted-foreground">
              <span className="text-sm uppercase tracking-widest font-semibold">
                [Illustration: Connected Agriculture]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
