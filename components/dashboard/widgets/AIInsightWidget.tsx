"use client";

import React from "react";
import { Bot, ArrowRight, Info, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AIInsightWidget() {
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

        <div className="p-4 flex flex-col flex-1">
          {/* Primary Insight (The Headline) */}
          <div className="mb-3">
            <h3 className="text-md font-semibold leading-snug text-slate-900 dark:text-slate-100 italic font-serif">
              "Maize prices rose{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                8% this week
              </span>{" "}
              due to reduced supply in North Central regions."
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
              This may impact feed costs for poultry farmers and drive
              short-term grain demand across nearby satellite markets. Consider
              securing stock before the weekend.
            </p>
          </div>

          {/* CTA: Ask AI More */}
          <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
            <Button
              variant="ghost"
              className="group/btn h-auto p-0 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-transparent flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest"
            >
              Ask AI More
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
