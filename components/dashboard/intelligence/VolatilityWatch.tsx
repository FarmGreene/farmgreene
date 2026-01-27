"use client";

import React from "react";
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Badge,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VolatilityWatch() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Top Movers Summary */}
      <Card className="col-span-1 lg:col-span-2 border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Market Movers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
          {/* Gainers */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Top Gainers</span>
            </div>
            {[
              { name: "Maize", change: "+6.4%", market: "Ibadan" },
              { name: "Sorghum", change: "+4.9%", market: "Zaria" },
              { name: "Beans", change: "+3.2%", market: "Ilorin" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm"
              >
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {item.name}
                  </span>
                  <span className="text-xs text-slate-400 ml-2">
                    ({item.market})
                  </span>
                </div>
                <span className="font-bold text-emerald-600">
                  {item.change}
                </span>
              </div>
            ))}
          </div>

          {/* Decliners */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <TrendingDown className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Top Decliners</span>
            </div>
            {[
              { name: "Rice", change: "-5.1%", market: "Kano" },
              { name: "Cassava", change: "-3.8%", market: "Ogbomosho" },
              { name: "Yam", change: "-2.6%", market: "Makurdi" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm"
              >
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {item.name}
                  </span>
                  <span className="text-xs text-slate-400 ml-2">
                    ({item.market})
                  </span>
                </div>
                <span className="font-bold text-red-600">{item.change}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Right: Volatility Watch */}
      <Card className="col-span-1 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
            <AlertCircle className="w-4 h-4" />
            <CardTitle className="text-sm font-bold uppercase tracking-widest">
              Volatility Watch
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-amber-800 dark:text-amber-400 font-medium">
            3 commodities are showing unusual price movement patterns today.
          </p>

          <div className="space-y-2">
            {[
              {
                name: "Yam",
                score: "High Risk",
                text: "Price spiked 15% above monthly avg.",
              },
              {
                name: "Tomatoes",
                score: "Volatile",
                text: "Rapid intraday fluctuation detected.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50 shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {item.name}
                  </span>
                  <Badge
                    // variant="outline"
                    className="text-[9px] text-amber-600 border-amber-200 bg-amber-50"
                  >
                    {item.score}
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full text-xs font-bold text-amber-700 hover:text-amber-800 hover:bg-amber-100 dark:text-amber-500 dark:hover:text-amber-400 dark:hover:bg-amber-900/30"
          >
            View Risk Report <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
