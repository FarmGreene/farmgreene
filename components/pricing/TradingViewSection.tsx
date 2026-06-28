import { LineChart, BarChart3 } from "lucide-react";

export default function TradingViewSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/10">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="font-heading text-3xl font-bold tracking-tight mb-4">
            Advanced Charting with TradingView
          </h2>
          <p className="text-lg text-muted-foreground">
            Farmgreene integrates professional-grade charting tools to help
            users visualize price movements and trends. Access ranges from basic
            chart viewing to full technical analysis.
          </p>
        </div>

        <div className="relative h-[400px] w-full bg-background border rounded-2xl shadow-sm flex items-center justify-center">
          {/* Very abstract chart placeholder */}
          <div className="absolute inset-x-0 bottom-0 top-1/3 flex items-end justify-between px-10 pb-10 opacity-20">
            <div className="w-8 h-[40%] bg-green-500 rounded-t-md"></div>
            <div className="w-8 h-[60%] bg-green-500 rounded-t-md"></div>
            <div className="w-8 h-[45%] bg-green-500 rounded-t-md"></div>
            <div className="w-8 h-[75%] bg-green-500 rounded-t-md"></div>
            <div className="w-8 h-[55%] bg-green-500 rounded-t-md"></div>
            <div className="w-8 h-[85%] bg-green-500 rounded-t-md"></div>
          </div>
          <div className="z-10 bg-white dark:bg-slate-900 px-6 py-3 rounded-full border shadow-sm flex items-center gap-2 text-sm font-medium">
            <LineChart className="h-4 w-4 text-[#049878]" />
            Technical Indicators
            <span className="w-px h-4 bg-border mx-1"></span>
            <BarChart3 className="h-4 w-4 text-[#049878]" />
            Volume Analysis
          </div>
        </div>
      </div>
    </section>
  );
}
