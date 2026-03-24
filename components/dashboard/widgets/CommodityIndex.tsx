"use client";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useCommodities, usePriceHistory, useCommodityIndex } from "@/lib/hooks/useCommodities";
import { CommodityWithLatest, CommodityIndexItem } from "@/types/commodity";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Subcomponent: TinyChart ───────────────────────────────────────────────────
const TinyChart = ({ data, color }: { data: any[]; color: string }) => (
  <div className="h-8 w-24">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// ─── Subcomponent: CommodityRow ────────────────────────────────────────────────
const CommodityRow = ({ commodity }: { commodity: CommodityIndexItem }) => {
  const price = commodity.currentPrice || 0;
  const change = commodity.sevenDayChange || 0;
  const isPositive = change >= 0;
  const color = isPositive ? "#10b981" : "#ef4444";

  // Map the daily average records to format required by Recharts
  const chartData = React.useMemo(() => {
    if (!commodity.history || commodity.history.length === 0) {
      // Fallback tiny flatline if no history exists yet
      return [{ v: price }, { v: price }];
    }
    return commodity.history.map((h) => ({ v: h.averagePrice }));
  }, [commodity.history, price]);

  return (
    <div className="flex items-center justify-between group">
      {/* Name & Region */}
      <div className="min-w-[120px]">
        <div className="font-medium text-sm text-foreground group-hover:text-green-600 transition-colors truncate max-w-[140px]">
          {commodity.name}
        </div>
        <div className="text-[10px] text-muted-foreground truncate max-w-[140px]">
          National Avg. • {commodity.unit}
        </div>
      </div>

      {/* Sparkline (Hidden on very small screens) */}
      <div className="hidden sm:block opacity-50 group-hover:opacity-100 transition-opacity">
        <TinyChart data={chartData} color={color} />
      </div>

      {/* Price & Change */}
      <div className="text-right min-w-[80px]">
        <div className="font-bold text-sm">
          ₦{price.toLocaleString()}
        </div>
        {change !== 0 ? (
          <div
            className={`text-[10px] flex items-center justify-end gap-0.5 ${
              isPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {Math.abs(change)}%
            <span className="text-muted-foreground/50 ml-0.5">7d</span>
          </div>
        ) : (
          <div className="text-[10px] text-muted-foreground">No Change</div>
        )}
      </div>
    </div>
  );
};

// ─── Main Widget ───────────────────────────────────────────────────────────────
export default function CommodityIndex() {
  const visibleCount = 5;
  const isPremium = false; // This would come from user context in real app

  const { data: commoditiesRes, isLoading } = useCommodityIndex(
    { limit: visibleCount },
    isPremium
  );

  const commodities = commoditiesRes?.data || [];

  return (
    <Card className="col-span-1 border-none shadow-md overflow-hidden flex flex-col h-fit bg-white dark:bg-slate-900">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            🇳🇬 Commodity Index
          </CardTitle>
          <Badge variant="outline" className="text-[10px] font-normal">
            Live Updates
          </Badge>
        </div>
      </CardHeader>

      <div className="flex-1 min-h-[300px] relative">
        <ScrollArea className="h-[300px]">
          <div className="p-4 space-y-4">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-8 w-24 hidden sm:block" />
                  <div className="space-y-1 flex flex-col items-end">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </div>
              ))
            ) : commodities.length > 0 ? (
              // Dynamic Rows
              commodities.map((item, index) => {
                const isBlurred = !isPremium && index >= visibleCount;
                if (isBlurred) return null; // Or render blurred logic

                return <CommodityRow key={item.id} commodity={item} />;
              })
            ) : (
              // Empty State
              <div className="text-center text-sm text-muted-foreground py-8">
                No commodity data available.
              </div>
            )}

            {/* Premium Upsell Overlay */}
            {!isPremium && commodities.length >= visibleCount && (
              <div className="relative mt-2 p-3 rounded-lg border border-dashed border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800 flex flex-col items-center justify-center text-center gap-2">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <Lock className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-green-900 dark:text-green-100">
                    Unlock All 45+ Commodities
                  </p>
                  <p className="text-[10px] text-green-700 dark:text-green-300">
                    Upgrade to Pro for full market access.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
                >
                  View Plans <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
