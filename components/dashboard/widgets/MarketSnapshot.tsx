import React from "react";
import { TrendingUp, TrendingDown, Activity, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MarketSnapshot() {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2 overflow-hidden border-none shadow-xl bg-linear-to-br from-green-950 via-emerald-900 to-slate-900 text-white relative group min-h-[220px] flex flex-col justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none"></div>

      <CardContent className="p-6 md:p-8 relative z-10 flex flex-col justify-center h-full gap-6">
        {/*  Main Market Status */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-300/80 text-xs font-medium uppercase tracking-wider">
            <Globe className="h-3 w-3" />
            Global Market Overview
            <span className="w-1 h-1 rounded-full bg-emerald-400 mx-1"></span>
            Updated 12m ago
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
              Market is <span className="text-emerald-400">Bullish</span>
            </h2>
            <p className="text-emerald-100/70 text-sm max-w-sm leading-relaxed">
              Grain prices are seeing a strong uptake due to seasonal demand in
              the North Central region.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-medium">
                Vol: <span className="text-white ml-1">High</span>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-medium">
                Gainers: <span className="text-white ml-1">12</span>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
              <TrendingDown className="h-3.5 w-3.5 text-red-400" />
              <span className="text-xs font-medium">
                Losers: <span className="text-white ml-1">4</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
