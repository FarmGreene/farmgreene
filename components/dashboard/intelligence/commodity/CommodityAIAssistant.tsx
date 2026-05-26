"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Bot, Sparkles, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CommodityWithLatest, PriceHistory } from "@/types/commodity";

interface CommodityAIAssistantProps {
  commodity: CommodityWithLatest;
  history?: PriceHistory;
}

export function CommodityAIAssistant({ commodity, history }: CommodityAIAssistantProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Generate a mock insightful summary based on current data
  const generateInsight = () => {
    const price = commodity.latestAverage?.averagePrice;
    const change = commodity.latestAverage?.priceChange || 0;
    const name = commodity.name;
    const direction = change > 0 ? "surged" : change < 0 ? "dropped" : "remained stable";
    
    // Default text if no data
    if (!price) {
      return `Waiting for sufficient market data to generate insights for ${name}. Try again later when more price submissions are available.`;
    }

    if (change > 5) {
      return `${name} prices have ${direction} by ${Math.abs(change)}% recently, driven by supply constraints in major producing belts and high export demand. Traders are currently holding onto stock. We anticipate prices might peak mid-next month before the early harvest begins.`;
    } else if (change < -5) {
      return `${name} prices have ${direction} by ${Math.abs(change)}%, indicating a strong influx of new harvests into the market. This presents a strong buying opportunity for aggregators looking to restock before the dry season stabilizes prices.`;
    } else {
      return `The market for ${name} has ${direction} recently, showing only a ${Math.abs(change)}% variance. Supply and demand appear well-balanced across regions. Expect low volatility in the short term unless disrupted by sudden weather changes.`;
    }
  };

  const fullText = generateInsight();

  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    setDisplayedText("");
    
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20); // Typing speed

    return () => clearInterval(interval);
  }, [fullText]);

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
        </div>

        {!isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-emerald-200/50 dark:border-emerald-900/50"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400">
              <Activity className="w-3.5 h-3.5" />
              Confidence: <span className="text-emerald-600 dark:text-emerald-400">High (92%)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400">
              {commodity.latestAverage?.priceChange && commodity.latestAverage.priceChange > 0 ? (
                <><TrendingUp className="w-3.5 h-3.5" /> Trend: Bullish</>
              ) : (
                <><TrendingDown className="w-3.5 h-3.5" /> Trend: Bearish</>
              )}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
