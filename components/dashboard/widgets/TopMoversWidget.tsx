"use client";

import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const MOVERS_DATA = {
  gainers: [
    { name: "Maize", market: "Ibadan", price: "₦420", change: "+6.4%", id: 1 },
    { name: "Sorghum", market: "Zaria", price: "₦310", change: "+4.9%", id: 2 },
    { name: "Beans", market: "Ilorin", price: "₦550", change: "+3.2%", id: 3 },
    {
      name: "Soya Beans",
      market: "Kaduna",
      price: "₦610",
      change: "+2.8%",
      id: 10,
    },
    { name: "Wheat", market: "Bauchi", price: "₦480", change: "+2.5%", id: 11 },
    {
      name: "Onions",
      market: "Plateau",
      price: "₦150",
      change: "+2.1%",
      id: 12,
    },
  ],
  decliners: [
    { name: "Rice", market: "Kano", price: "₦780", change: "-5.1%", id: 4 },
    {
      name: "Cassava",
      market: "Ogbomosho",
      price: "₦120",
      change: "-3.8%",
      id: 5,
    },
    { name: "Yam", market: "Makurdi", price: "₦950", change: "-2.6%", id: 6 },
    { name: "Pepper", market: "Gombe", price: "₦200", change: "-1.9%", id: 13 },
    {
      name: "Tomato",
      market: "Kaduna",
      price: "₦300",
      change: "-1.5%",
      id: 14,
    },
  ],
};

export default function TopMoversWidget() {
  return (
    <Card className="h-full border-none shadow-xl bg-white dark:bg-slate-950 overflow-hidden relative group">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Header */}
        <div className="px-4 pb-3 flex shrink-0 items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400">
              Top Price Movers
            </h2>
            <span className="text-[10px] text-slate-400 dark:text-slate-600 font-medium">
              Today
            </span>
          </div>

          <Button
            variant="ghost"
            className="group/btn h-auto p-0 px-0! text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-transparent flex items-center gap-1 text-[10px] font-bold tracking-widest"
          >
            View All
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>

        <Tabs defaultValue="gainers" className="flex-1 flex flex-col min-h-0">
          <div className="px-4 pb-2 shrink-0">
            <TabsList className="grid w-full grid-cols-2 h-8 bg-slate-100/50 dark:bg-slate-900/50 p-1">
              <TabsTrigger
                value="gainers"
                className="text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-xs"
              >
                <TrendingUp className="w-3 h-3 mr-1.5" />
                Gainers
              </TabsTrigger>
              <TabsTrigger
                value="decliners"
                className="text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400 data-[state=active]:shadow-xs"
              >
                <TrendingDown className="w-3 h-3 mr-1.5" />
                Decliners
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
            <TabsContent value="gainers" className="mt-0 space-y-1">
              {MOVERS_DATA.gainers.map((item) => (
                <MoverRow key={item.id} item={item} type="up" />
              ))}
            </TabsContent>
            <TabsContent value="decliners" className="mt-0 space-y-1">
              {MOVERS_DATA.decliners.map((item) => (
                <MoverRow key={item.id} item={item} type="down" />
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function MoverRow({
  item,
  type,
}: {
  item: (typeof MOVERS_DATA.gainers)[0];
  type: "up" | "down";
}) {
  return (
    <div className="flex items-center justify-between rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group/row cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
      <div className="flex flex-col">
        <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">
          {item.name}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          {item.market}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <div
          className={cn(
            "flex items-center gap-1 text-[12px] font-bold",
            type === "up"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400",
          )}
        >
          {type === "up" ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {item.change}
        </div>
        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
          {item.price}
        </span>
      </div>
    </div>
  );
}

/**
 * 🚀 FUTURE IDEAS & PM NOTES
 * --------------------------
 * 1. AI Anomalies: Highlight rows where movement is > 2 standard deviations from 30-day mean.
 *    - UI: Subtle pulsing dot or tooltip: "Unusual spike detected".
 * 2. Dynamic Timeframes: Add a micro-dropdown in the header [Today, 7d, 30d].
 * 3. Personalized Movers: Prioritize commodities in the user's "Watchlist" or "Recent Activity".
 * 4. Regional Filtering: Auto-filter movers based on user's primary trade region.
 * 5. Sparklines: Adding a 24h mini-chart (sparkline) next to the price if space permits in Pro tier.
 */
