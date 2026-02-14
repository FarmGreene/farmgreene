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

          <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-white/50 border shadow-lg group">
            <div className="absolute inset-0 bg-linear-to-br from-green-50/50 to-blue-50/50" />
            <Image
              src="/images/value-prop-connect.png"
              alt="Connected Agriculture Ecosystem"
              fill
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
