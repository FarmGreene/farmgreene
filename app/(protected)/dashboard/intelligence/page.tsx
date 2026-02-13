"use client";

import React from "react";
import IntelligenceHeader from "@/components/dashboard/intelligence/IntelligenceHeader";
import MarketPulse from "@/components/dashboard/intelligence/MarketPulse";
import CommodityIntelligenceGrid from "@/components/dashboard/intelligence/CommodityIntelligenceGrid";
import VolatilityWatch from "@/components/dashboard/intelligence/VolatilityWatch";
import AIMarketBrief from "@/components/dashboard/intelligence/AIMarketBrief";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react"; // Removing this if truly unused, but wait, checking if I need it later? No, clean it.
// Actually I simply remove the line.

export default function IntelligencePage() {
  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full px-4 sm:px-6 pb-20">
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

          {/* Market News Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Market News
              </h2>
              <Button
                variant="ghost"
                className="h-auto p-0 text-xs text-slate-500 font-medium hover:text-slate-900"
              >
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group flex gap-3 cursor-pointer">
                  <div
                    className="h-16 w-24 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=200)",
                    }}
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                      <span className="uppercase tracking-wider text-emerald-600">
                        Grains
                      </span>
                      <span>•</span>
                      <span>4h ago</span>
                    </div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 transition-colors">
                      Export demand surging for Northern Maize as southern
                      harvests lag.
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
