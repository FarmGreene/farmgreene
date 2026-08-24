"use client";

import React from "react";
import { Bot, Info, Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLatestInsight } from "@/lib/hooks/useInsight";

export default function AIInsightWidget() {
  const { data: insight, isLoading } = useLatestInsight();
  const up = insight?.source?.direction === "up";
  const TrendIcon = up ? TrendingUp : TrendingDown;

  return (
    <Card className="h-full border-none shadow-xl bg-white dark:bg-slate-950 overflow-hidden relative group">
      {/* Subtle Glow Effect in the corner */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />

      <CardContent className="p-0 flex flex-col h-full">
        {/* Header - Strictly following the guide: trust, not novelty */}
        <div className="px-4 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              AI Insight of the Day
            </h2>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-emerald-500/50" />
        </div>

        <div className="p-4 flex flex-col flex-1 overflow-y-auto min-h-0">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-3 w-full mt-4" />
              <Skeleton className="h-3 w-11/12" />
            </div>
          ) : !insight ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 py-4">
              <Bot className="w-6 h-6 text-slate-300 dark:text-slate-700" />
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                No insight generated yet. Check back soon.
              </p>
            </div>
          ) : (
            <>
              {/* Primary Insight (The Headline) */}
              <div className="mb-3 flex items-start gap-2">
                <TrendIcon
                  className={`w-4 h-4 mt-0.5 shrink-0 ${up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                />
                <h3 className="text-md font-semibold leading-snug text-slate-900 dark:text-slate-100 italic font-serif">
                  {insight.headline}
                </h3>
              </div>

              {/* Why This Matters (The Implication) */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                  <Info className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Why this matters
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-4 border-l-2 border-emerald-500/30">
                  {insight.body}
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
