"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function VolatilityWatch() {
  return (
    <div className="space-y-8">
      {/* Top Movers */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Market Movers
        </h3>
        <div className="space-y-3">
          {[
            { name: "Maize", change: "+6.4%", market: "Ibadan", status: "up" },
            { name: "Sorghum", change: "+4.9%", market: "Zaria", status: "up" },
            { name: "Rice", change: "-5.1%", market: "Kano", status: "down" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 -mx-2 p-2 rounded-lg transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {item.market}
                </span>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "border-none px-2 py-0.5 text-xs font-semibold",
                  item.status === "up"
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
                )}
              >
                {item.change}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Watch */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Risk Watch
        </h3>
        <div className="space-y-3">
          {[
            {
              name: "Yam",
              alert: "Price Price Spike",
              desc: "15% above 30-day avg",
              color: "text-rose-500",
              bg: "bg-rose-50 dark:bg-rose-500/10",
            },
            {
              name: "Tomatoes",
              alert: "High Volatility",
              desc: "Flash supply drop",
              color: "text-amber-500",
              bg: "bg-amber-50 dark:bg-amber-500/10",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                  {item.name}
                </span>
                <span
                  className={cn("text-[10px] font-bold uppercase", item.color)}
                >
                  {item.alert}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
