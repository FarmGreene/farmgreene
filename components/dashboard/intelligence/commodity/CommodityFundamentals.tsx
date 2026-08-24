import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CommodityWithLatest, PriceHistory, REGION_LABELS } from "@/types/commodity";
import { CalendarDays, Globe2, ArrowUpFromLine, ArrowDownToLine, MapPin } from "lucide-react";
import { useWeeklyPriceHistory } from "@/lib/hooks/useCommodities";

interface CommodityFundamentalsProps {
  commodity: CommodityWithLatest;
  history?: PriceHistory;
}

const ONE_YEAR_WEEKS = 52;

export function CommodityFundamentals({ commodity, history }: CommodityFundamentalsProps) {
  const { data: weeklyHistory, isLoading: isWeeklyLoading } = useWeeklyPriceHistory(
    commodity.id,
    ONE_YEAR_WEEKS,
  );

  // 52-week High/Low from real weekly averages; falls back to the single
  // latest price if no weekly history exists yet.
  let high = 0;
  let low = Infinity;

  if (weeklyHistory?.history && weeklyHistory.history.length > 0) {
    weeklyHistory.history.forEach((week) => {
      if (week.averagePrice > high) high = week.averagePrice;
      if (week.averagePrice < low) low = week.averagePrice;
    });
  } else if (commodity.latestAverage) {
    high = commodity.latestAverage.averagePrice;
    low = commodity.latestAverage.averagePrice;
  }
  if (low === Infinity) low = 0;

  // Regions currently reporting price data — real count from the latest
  // regional breakdown, not a proxy for actual supply.
  const regionalBreakdown = commodity.latestAverage?.regionalBreakdown ?? {};
  const regionEntries = Object.entries(regionalBreakdown) as [string, number][];
  const regionsReporting = regionEntries.length;

  // 30-day volatility: price swing (max-min) over the trailing 30 days of
  // real daily averages, as a % of the average price in that window.
  const recentDays = (history?.history ?? []).slice(-30);
  let volatilityPercent: number | null = null;
  if (recentDays.length > 1) {
    const prices = recentDays.map((d) => d.averagePrice);
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    volatilityPercent = avg > 0 ? ((max - min) / avg) * 100 : null;
  }

  const topRegions = [...regionEntries]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const fundamentals = [
    {
      title: "Regions Reporting",
      value: regionsReporting > 0 ? `${regionsReporting} of 6` : "—",
      icon: <Globe2 className="w-5 h-5 text-indigo-500" />,
      color: "bg-indigo-50 dark:bg-indigo-500/10",
      description: "Geopolitical zones with price data",
    },
    {
      title: "30-Day Volatility",
      value: volatilityPercent != null ? `${volatilityPercent.toFixed(1)}%` : "—",
      icon: <CalendarDays className="w-5 h-5 text-orange-500" />,
      color: "bg-orange-50 dark:bg-orange-500/10",
      description: "Price swing vs 30-day average",
    },
    {
      title: "52-Week High",
      value: isWeeklyLoading ? "—" : `₦${high.toLocaleString()}`,
      icon: <ArrowUpFromLine className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-50 dark:bg-emerald-500/10",
      description: "Highest recorded weekly avg",
    },
    {
      title: "52-Week Low",
      value: isWeeklyLoading ? "—" : `₦${low.toLocaleString()}`,
      icon: <ArrowDownToLine className="w-5 h-5 text-rose-500" />,
      color: "bg-rose-50 dark:bg-rose-500/10",
      description: "Lowest recorded weekly avg",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {fundamentals.map((item, index) => (
        <Card key={index} className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl">
          <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {item.title}
              </span>
              <div className={`p-2 rounded-xl ${item.color}`}>
                {item.icon}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                {item.value}
              </h4>
              <p className="text-[10px] text-slate-500 font-medium">
                {item.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Expanded Region Card taking 2 columns */}
      <Card className="border-none shadow-sm bg-slate-900 dark:bg-slate-950 rounded-2xl col-span-2 md:col-span-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-emerald-500/20 to-transparent pointer-events-none" />
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Top Regions by Price
              </span>
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">
              {topRegions.length > 0
                ? topRegions.map(([region]) => REGION_LABELS[region as keyof typeof REGION_LABELS] ?? region).join(", ")
                : "No regional data yet"}
            </h4>
          </div>
          {topRegions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {topRegions.map(([region, price]) => (
                <div key={region} className="px-3 py-1.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold backdrop-blur-sm border border-white/5">
                  {REGION_LABELS[region as keyof typeof REGION_LABELS] ?? region}: ₦{price.toLocaleString()}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
