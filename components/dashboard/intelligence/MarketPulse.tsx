"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useTopMovers } from "@/lib/hooks/useCommodities";
import { useLatestInsight } from "@/lib/hooks/useInsight";
import { REGION_LABELS, NigerianRegion, type CommodityMover } from "@/types/commodity";

interface VolatilityCandidate {
  commodity: CommodityMover;
  region: string;
  spreadPct: number;
}

/** Among today's top movers, finds the commodity with the widest regional
 * price spread (max region avg - min region avg, as % of national avg) —
 * the closest real signal we have to "volatility" without a dedicated
 * volatility metric on the backend. */
function findVolatilityCandidate(
  movers: CommodityMover[],
): VolatilityCandidate | null {
  let best: VolatilityCandidate | null = null;

  for (const m of movers) {
    const entries = Object.entries(m.regional_breakdown || {});
    if (entries.length < 2) continue;

    const avg = parseFloat(m.average_price);
    if (!avg || avg <= 0) continue;

    let maxRegion = entries[0][0];
    let maxVal = entries[0][1];
    let minVal = entries[0][1];
    for (const [region, val] of entries) {
      if (val > maxVal) {
        maxVal = val;
        maxRegion = region;
      }
      if (val < minVal) minVal = val;
    }

    const spreadPct = ((maxVal - minVal) / avg) * 100;
    if (!best || spreadPct > best.spreadPct) {
      best = { commodity: m, region: maxRegion, spreadPct };
    }
  }

  return best;
}

function formatChange(value: string): string {
  const n = parseFloat(value);
  return `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;
}

export default function MarketPulse() {
  const { data: topMovers, isLoading: moversLoading } = useTopMovers(30);
  const { data: insight, isLoading: insightLoading } = useLatestInsight();

  const isLoading = moversLoading || insightLoading;

  const gainers = topMovers?.gainers ?? [];
  const decliners = topMovers?.decliners ?? [];
  const topGainer = gainers[0];
  const topDecliner = decliners[0];
  const volatility = findVolatilityCandidate([...gainers, ...decliners]);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-8 pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 min-w-max">
              <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="flex flex-col gap-1.5">
                <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-2.5 w-20 rounded bg-slate-100 dark:bg-slate-900 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const hasAnyData = topGainer || topDecliner || volatility || insight;

  if (!hasAnyData) {
    return (
      <div className="w-full">
        <span className="text-xs text-slate-400 dark:text-slate-600">
          No market activity yet.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 overflow-x-auto pb-2 scrollbar-none">
        {/* Pulse Item 1: Rising */}
        {topGainer && (
          <>
            <div className="flex items-center gap-3 min-w-max group cursor-pointer">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">
                  {gainers.length} Commodities Rising
                </span>
                <span className="text-[10px] text-slate-400">
                  {topGainer.name} leading ({formatChange(topGainer.price_change)})
                </span>
              </div>
            </div>
            <div className="hidden md:block h-8 w-px bg-slate-100 dark:bg-slate-800" />
          </>
        )}

        {/* Pulse Item 2: Falling */}
        {topDecliner && (
          <>
            <div className="flex items-center gap-3 min-w-max group cursor-pointer">
              <div className="h-2 w-2 rounded-full bg-rose-500/50" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-rose-600 transition-colors">
                  {decliners.length} Commodities Falling
                </span>
                <span className="text-[10px] text-slate-400">
                  {topDecliner.name} down ({formatChange(topDecliner.price_change)})
                </span>
              </div>
            </div>
            <div className="hidden md:block h-8 w-px bg-slate-100 dark:bg-slate-800" />
          </>
        )}

        {/* Pulse Item 3: Widest regional price spread */}
        {volatility && (
          <>
            <div className="flex items-center gap-3 min-w-max group cursor-pointer">
              <div className="h-2 w-2 rounded-full bg-amber-500/50" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-amber-600 transition-colors">
                  Widest Price Spread
                </span>
                <span className="text-[10px] text-slate-400">
                  {volatility.commodity.name} highest in{" "}
                  {REGION_LABELS[volatility.region as NigerianRegion] ?? volatility.region}
                </span>
              </div>
            </div>
            <div className="hidden md:block h-8 w-px bg-slate-100 dark:bg-slate-800" />
          </>
        )}

        {/* Pulse Item 4: AI Insight */}
        {insight && (
          <div className="flex items-center gap-3 min-w-max group cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                AI Insight
              </span>
              <span className="text-[10px] text-slate-400">
                {insight.headline}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
