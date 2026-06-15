import { AlertTriangle, TrendingDown, Clock, Search } from "lucide-react";

export default function ProblemSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium">
              <AlertTriangle className="h-4 w-4" />
              <span>The Challenge</span>
            </div>

            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Agriculture is constrained by{" "}
              <span className="text-red-600 dark:text-red-500">
                inefficiency
              </span>
              .
            </h2>

            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Across many agricultural communities,{" "}
                <strong className="text-slate-900 dark:text-white">
                  access to essential farm equipment
                </strong>{" "}
                remains limited and expensive. Farmers struggle to acquire the
                right tools at the right time, while equipment owners face long
                periods of idle machinery.
              </p>
              <p>
                Simultaneously,{" "}
                <strong className="text-slate-900 dark:text-white">
                  market opacity
                </strong>{" "}
                creates barriers. Unreliable price information makes it
                difficult for farmers and traders to make informed decisions,
                leading to lost income potential.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Idle Machinery
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Expensive assets sit unused for weeks.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Information Gap
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lack of real-time market data.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-4/3 rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-2xl relative border border-slate-100 dark:border-slate-800">
              {/* Image Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/field-challenge.png')",
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent" />

              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                    <TrendingDown className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Impact
                    </p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      Lost productivity & reduced income potential across the
                      value chain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decor blob */}
            <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-60" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
