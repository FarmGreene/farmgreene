import { Sparkles, BrainCircuit, FileSearch } from "lucide-react";

export default function AIExplainer() {
  return (
    <section className="py-20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-medium text-[#049878]">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Intelligence
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Turn Data into Decisions
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Farmgreene’s AI tools help turn raw commodity price data into
              clear, actionable insights. Generate reports, analyze long-term
              trends, and understand market movements without manual analysis.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3">
                <BrainCircuit className="h-6 w-6 text-[#049878] shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm">Smart Summaries</h3>
                  <p className="text-xs text-muted-foreground">
                    Instant plain-language market updates.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FileSearch className="h-6 w-6 text-[#049878] shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm">Deep Reports</h3>
                  <p className="text-xs text-muted-foreground">
                    Comprehensive trend analysis on demand.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual placeholder for AI Interface */}
          <div className="relative h-80 bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-center items-center text-center shadow-xl">
            <div className="h-12 w-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4 animate-pulse">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-white font-medium mb-2">
              Generating Market Forecast...
            </h3>
            <div className="w-2/3 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-2/3 rounded-full"></div>
            </div>
            <div className="mt-8 p-4 bg-slate-800/50 rounded-xl w-full text-left">
              <div className="h-2 w-3/4 bg-slate-700 rounded mb-2"></div>
              <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
