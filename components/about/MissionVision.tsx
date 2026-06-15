import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, ArrowUpRight } from "lucide-react";

export default function MissionVision() {
  return (
    <section id="mission" className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="space-y-20">
          {/* Mission */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6">
                <Target className="h-4 w-4" />
                <span>Our Mission</span>
              </div>
              <h3 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Empowering Sustainable Growth
              </h3>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                To empower farmers and equipment owners by providing easy access
                to shared agricultural resources and trustworthy market data
                that support better decisions.
              </p>
              <ul className="space-y-4">
                {[
                  "Democratize access to machinery",
                  "Transparent market intelligence",
                  "Boost rural economic productivity",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 h-[400px] rounded-3xl bg-slate-200 dark:bg-slate-800 overflow-hidden relative group border border-slate-100 dark:border-slate-800">
              {/* Image Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/mission-collaboration.png')",
                }}
              />
              <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay" />
            </div>
          </div>

          {/* Vision */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="h-[400px] rounded-3xl bg-slate-200 dark:bg-slate-800 overflow-hidden relative border border-slate-100 dark:border-slate-800">
              {/* Image Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/vision-tech.png')" }}
              />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium mb-6">
                <Lightbulb className="h-4 w-4" />
                <span>Our Vision</span>
              </div>
              <h3 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                A Connected Agriculture
              </h3>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                We envision an agricultural ecosystem where access to equipment
                is no longer a barrier, data drives smarter decisions, and
                collaboration strengthens rural economies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
