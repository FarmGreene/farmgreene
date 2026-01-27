"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PULSE_ITEMS = [
  {
    label: "Commodities Rising",
    count: 5,
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/30",
    detail: "Maize leading +6.4%",
  },
  {
    label: "Commodities Falling",
    count: 3,
    icon: TrendingDown,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "group-hover:border-red-500/30",
    detail: "Rice down -5.1%",
  },
  {
    label: "High Volatility",
    count: 2,
    icon: Activity,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "group-hover:border-amber-500/30",
    detail: "Yam active in Makurdi",
  },
  {
    label: "AI Opportunities",
    count: 4,
    icon: Sparkles,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/30",
    detail: "Arbitrage in Soybeans",
  },
];

export default function MarketPulse() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {PULSE_ITEMS.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-all duration-300 hover:shadow-md cursor-pointer",
            item.border,
          )}
        >
          <div className="flex items-start justify-between mb-2">
            <div className={cn("p-2 rounded-lg", item.bg, item.color)}>
              <item.icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
              View <ChevronRight className="w-3 h-3" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {item.count}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide uppercase">
              {item.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
