"use client";

import React from "react";
import IntelligenceHeader from "@/components/dashboard/intelligence/IntelligenceHeader";
import MarketPulse from "@/components/dashboard/intelligence/MarketPulse";
import CommodityIntelligenceGrid from "@/components/dashboard/intelligence/CommodityIntelligenceGrid";
import VolatilityWatch from "@/components/dashboard/intelligence/VolatilityWatch";
import AIMarketBrief from "@/components/dashboard/intelligence/AIMarketBrief";
import { NewsSection } from "@/components/dashboard/intelligence/NewsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react"; // Removing this if truly unused, but wait, checking if I need it later? No, clean it.
// Actually I simply remove the line.

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
          <div className="space-y-4">
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

          {/* Discovery Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Discovery
            </h3>
            <div className="space-y-2">
              {[
                { name: "Cocoa", tag: "Newly Tracked" },
                { name: "Wheat", tag: "Trending High" },
                { name: "Cashew", tag: " seasonal" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-colors -mx-2"
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                    {item.name}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all border-none font-medium"
                  >
                    {item.tag}
                  </Badge>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full text-xs h-8 border-slate-200 dark:border-slate-800 text-slate-500"
            >
              Explore All Commodities
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
