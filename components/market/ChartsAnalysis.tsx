import { LineChart } from "lucide-react";

export default function ChartsAnalysis() {
  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Professional-Grade Charts <br /> and Technical Analysis
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Visualizing price movements is critical to understanding market
            behavior. Farmgreene integrates advanced charting tools that allow
            users to explore trends, compare commodities, and apply technical
            indicators.
          </p>
        </div>

        <div className="relative w-full aspect-video max-h-[500px] bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-slate-600 font-mono text-xl group-hover:scale-110 transition-transform duration-500 flex items-center gap-3">
              <LineChart className="h-8 w-8" />
              Interactive TradingView Chart
            </span>
          </div>
          {/* Grid lines overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Access to charting tools varies by plan—from basic visualizations to
          full technical analysis capabilities.
        </p>
      </div>
    </section>
  );
}
