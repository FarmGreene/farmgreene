"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketBrief } from "@/lib/hooks/useMarketBrief";

export default function AIMarketBrief() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: brief, isLoading } = useMarketBrief();

  return (
    <Card className="border shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <div
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Daily Market Brief
          </h3>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      {isOpen && (
        <CardContent className="px-4 pb-4 pt-0 space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-4/5" />
              <Skeleton className="h-3 w-24 mt-3" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          ) : !brief ? (
            <p className="text-xs text-slate-400 dark:text-slate-500 py-2">
              No brief generated yet. Check back soon.
            </p>
          ) : (
            <>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {brief.summary}
              </p>

              {(brief.drivers.length > 0 || brief.risks.length > 0) && (
                <div className="space-y-3">
                  {brief.drivers.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 tracking-wider">
                        Drivers
                      </h4>
                      <ul className="space-y-1">
                        {brief.drivers.map((driver, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {brief.risks.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 tracking-wider">
                        Risks
                      </h4>
                      <ul className="space-y-1">
                        {brief.risks.map((risk, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                <span>
                  Updated{" "}
                  {formatDistanceToNow(new Date(brief.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <button className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <MessageSquare className="w-3 h-3" />
                  Ask AI
                </button>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}
