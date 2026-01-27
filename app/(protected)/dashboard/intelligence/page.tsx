"use client";

import React from "react";
import IntelligenceHeader from "@/components/dashboard/intelligence/IntelligenceHeader";
import MarketPulse from "@/components/dashboard/intelligence/MarketPulse";
import CommodityIntelligenceGrid from "@/components/dashboard/intelligence/CommodityIntelligenceGrid";
import VolatilityWatch from "@/components/dashboard/intelligence/VolatilityWatch";
import AIMarketBrief from "@/components/dashboard/intelligence/AIMarketBrief";

export default function IntelligencePage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1600px] w-full">
      {/* 1. Header Section */}
      <IntelligenceHeader />

      {/* 2. Market Pulse (Quick Signals) */}
      <MarketPulse />

      {/* 3. AI Market Brief */}
      <AIMarketBrief />

      {/* 4. Main Commodity Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Commodity Intelligence Grid
          </h2>
          <span className="text-xs font-semibold text-slate-400 cursor-pointer hover:text-emerald-600 transition-colors">
            Sort by: Volatility
          </span>
        </div>
        <CommodityIntelligenceGrid />
      </div>

      {/* 5. Volatility & Movers Watch */}
      <div className="pt-4">
        <VolatilityWatch />
      </div>
    </div>
  );
}
