"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function AIMarketBrief() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      {/* Background Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl opacity-20 blur-lg dark:opacity-30"></div>

      <Card className="relative border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div
            className="px-4 py-3 flex items-center justify-between cursor-pointer border-b border-slate-100 dark:border-slate-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                AI Cross-Commodity Market Brief
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Updated 2h ago
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="p-5 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Executive Summary:{" "}
                    </span>
                    North Central grain markets are showing strong upward
                    momentum this week (+4.2% avg), driven primarily by
                    logistics constraints in the southern corridor and
                    pre-weekend stocking behavior. Conversely, Tuber prices in
                    the Middle Belt remain suppressed due to supply glut.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                      <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Key Drivers
                      </h4>
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-1">
                        <li>Fuel price hike impacting long-haul transport.</li>
                        <li>Export demand for Cocoa surging (+12%).</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50">
                      <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-amber-700 dark:text-amber-400 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Risk Factors
                      </h4>
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-1">
                        <li>Heavy rains predicted in Southwest region.</li>
                        <li>Forex volatility affecting fertilizer inputs.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-xs h-8 border-slate-200 dark:border-slate-800"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Ask AI for Deeper Analysis
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
