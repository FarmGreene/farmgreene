"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function MarketPulse() {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 overflow-x-auto pb-2 scrollbar-none">
        {/* Pulse Item 1: Rising */}
        <div className="flex items-center gap-3 min-w-max group cursor-pointer">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">
              5 Commodities Rising
            </span>
            <span className="text-[10px] text-slate-400">
              Maize leading (+6.4%)
            </span>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-slate-100 dark:bg-slate-800" />

        {/* Pulse Item 2: Falling */}
        <div className="flex items-center gap-3 min-w-max group cursor-pointer">
          <div className="h-2 w-2 rounded-full bg-rose-500/50" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-rose-600 transition-colors">
              3 Commodities Falling
            </span>
            <span className="text-[10px] text-slate-400">
              Rice down (-5.1%)
            </span>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-slate-100 dark:bg-slate-800" />

        {/* Pulse Item 3: Volatility */}
        <div className="flex items-center gap-3 min-w-max group cursor-pointer">
          <div className="h-2 w-2 rounded-full bg-amber-500/50" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-amber-600 transition-colors">
              High Volatility
            </span>
            <span className="text-[10px] text-slate-400">
              Yam active in Makurdi
            </span>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-slate-100 dark:bg-slate-800" />

        {/* Pulse Item 4: AI Insight */}
        <div className="flex items-center gap-3 min-w-max group cursor-pointer">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
              AI Insight
            </span>
            <span className="text-[10px] text-slate-400">
              Arbitrage opp in Soybeans
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
