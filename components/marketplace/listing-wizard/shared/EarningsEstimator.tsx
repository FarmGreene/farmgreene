"use client";

import React, { useMemo } from "react";
import { TrendingUp } from "lucide-react";

interface EarningsEstimatorProps {
  pricePerDay: number;
}

export function EarningsEstimator({ pricePerDay }: EarningsEstimatorProps) {
  const estimates = useMemo(() => {
    const daily = pricePerDay || 0;
    return {
      conservative: Math.round(daily * 10), // 10 rental days/month
      moderate: Math.round(daily * 18),     // 18 rental days/month
      optimistic: Math.round(daily * 25),   // 25 rental days/month
    };
  }, [pricePerDay]);

  const fmt = (n: number) =>
    n.toLocaleString("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

  if (!pricePerDay || pricePerDay < 500) return null;

  return (
    <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center">
          <TrendingUp className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Earnings Potential
          </p>
          <p className="text-[10px] text-emerald-600/70 dark:text-emerald-500/70">
            Based on your daily rate
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { label: "Conservative", sublabel: "10 days/mo", value: estimates.conservative, color: "text-slate-600 dark:text-slate-300" },
          { label: "Moderate", sublabel: "18 days/mo", value: estimates.moderate, color: "text-emerald-700 dark:text-emerald-400", bold: true },
          { label: "High Demand", sublabel: "25 days/mo", value: estimates.optimistic, color: "text-teal-700 dark:text-teal-400" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <div>
              <span className="text-xs font-medium">{row.label}</span>
              <span className="text-[10px] text-muted-foreground ml-1">({row.sublabel})</span>
            </div>
            <span className={`text-sm font-bold ${row.color} ${row.bold ? "text-base" : ""}`}>
              {fmt(row.value)}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground border-t border-emerald-200 dark:border-emerald-800 pt-2">
        *Estimates only. Actual earnings depend on demand and availability.
      </p>
    </div>
  );
}
