"use client";

import React from "react";
import IntelligenceHeader from "@/components/dashboard/intelligence/IntelligenceHeader";
import MarketPulse from "@/components/dashboard/intelligence/MarketPulse";
import CommodityIntelligenceGrid from "@/components/dashboard/intelligence/CommodityIntelligenceGrid";
import VolatilityWatch from "@/components/dashboard/intelligence/VolatilityWatch";
import AIMarketBrief from "@/components/dashboard/intelligence/AIMarketBrief";
import DiscoverySection from "@/components/dashboard/intelligence/DiscoverySection";
import { NewsSection } from "@/components/dashboard/intelligence/NewsSection";
import { Separator } from "@/components/ui/separator";

export default function IntelligencePage() {
  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full pb-20">
      {/* 1. Header & Pulse */}
      <div className="space-y-6">
        <IntelligenceHeader />
        <MarketPulse />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* 2. Main Content Area */}
        <div className="xl:col-span-9 space-y-12">
          {/* Commodity Grid */}
          <div id="commodities-grid" className="space-y-4 scroll-mt-6">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Commodities
            </h2>
            <CommodityIntelligenceGrid />
          </div>

          <Separator className="bg-slate-100 dark:bg-slate-800/50" />

          {/* Market Intelligence Feed */}
          <NewsSection />
        </div>

        {/* 3. Sidebar (Insights & Discovery) */}
        <aside className="xl:col-span-3 space-y-8 xl:sticky xl:top-6">
          <AIMarketBrief />

          <Separator className="bg-slate-100 dark:bg-slate-800/50" />

          <VolatilityWatch />

          <Separator className="bg-slate-100 dark:bg-slate-800/50" />

          <DiscoverySection />
        </aside>
      </div>
    </div>
  );
}
