"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Bot,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CommodityWithLatest } from "@/types/commodity";
import { useCommodityInsight } from "@/lib/hooks/useCommodities";

interface CommodityAIAssistantProps {
  commodity: CommodityWithLatest;
}

export function CommodityAIAssistant({ commodity }: CommodityAIAssistantProps) {
  const { data: insight, isLoading } = useCommodityInsight(commodity.id);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const typedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!insight?.summary || typedFor.current === insight.summary) return;
    typedFor.current = insight.summary;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setDisplayedText(insight.summary);
      setIsTyping(false);
      return;
    }

    const fullText = insight.summary;
    setIsTyping(true);
    setDisplayedText("");

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [insight?.summary]);

  const submissionCount = commodity.latestAverage?.submissionCount ?? 0;
  const priceChange = commodity.latestAverage?.priceChange;

  return (
    <Card className="border-none shadow-sm bg-linear-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-950/20 dark:to-slate-900 rounded-3xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Bot className="w-32 h-32 text-emerald-600" />
      </div>

      <CardContent className="p-6 md:p-8 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-500">
            FarmGreene AI Market Analyst
          </h3>
        </div>

        <div className="min-h-[80px]">
          {isLoading ? (
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
                Generating market insight…
              </p>
            </div>
          ) : !insight ? (
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              We don&apos;t have enough market data to generate an insight for{" "}
              {commodity.name} yet. Check back once more price submissions come in.
            </p>
          ) : (
            <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-medium">
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2.5 h-5 bg-emerald-500 ml-1 align-middle"
                />
              )}
            </p>
          )}
        </div>

        {insight && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mt-6 pt-6 border-t border-emerald-200/50 dark:border-emerald-900/50"
          >
            {(insight.drivers.length > 0 || insight.risks.length > 0) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {insight.drivers.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 tracking-wider">
                      Drivers
                    </h4>
                    <ul className="space-y-1">
                      {insight.drivers.map((driver, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{driver}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {insight.risks.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 tracking-wider">
                      Risks
                    </h4>
                    <ul className="space-y-1">
                      {insight.risks.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              {submissionCount > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <Activity className="w-3.5 h-3.5" />
                  Based on {submissionCount} price submission{submissionCount === 1 ? "" : "s"}
                </div>
              )}
              {priceChange != null && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {priceChange > 0 ? (
                    <>
                      <TrendingUp className="w-3.5 h-3.5" /> Trend: Bullish
                    </>
                  ) : priceChange < 0 ? (
                    <>
                      <TrendingDown className="w-3.5 h-3.5" /> Trend: Bearish
                    </>
                  ) : (
                    <>
                      <Minus className="w-3.5 h-3.5" /> Trend: Stable
                    </>
                  )}
                </div>
              )}
              <div className="px-3 py-1.5 text-xs font-medium text-slate-400">
                Updated {formatDistanceToNow(new Date(insight.generatedAt), { addSuffix: true })}
              </div>
            </div>

            {insight.sources && insight.sources.length > 0 && (
              <div>
                <button
                  type="button"
                  onClick={() => setSourcesOpen((v) => !v)}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Sources ({insight.sources.length})
                  {sourcesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {sourcesOpen && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {insight.sources.map((source, i) => {
                      let hostname = source.url;
                      try {
                        hostname = new URL(source.url).hostname.replace(/^www\./, "");
                      } catch {
                        // keep raw url as fallback label
                      }
                      return (
                        <a
                          key={`${source.url}-${i}`}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-800 rounded-md text-[11px] text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          {hostname}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
