"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

// Mock Data for Nigerian Commodities
const COMMODITIES = [
  {
    id: 1,
    name: "Maize (White)",
    region: "North Central",
    price: 32000,
    change: 12.5,
    unit: "per 100kg",
    data: [
      { v: 28000 },
      { v: 31500 },
      { v: 29000 },
      { v: 34000 },
      { v: 30000 },
      { v: 32000 },
    ],
  },
  {
    id: 2,
    name: "Rice (Local)",
    region: "North West",
    price: 65000,
    change: 5.2,
    unit: "per 50kg",
    data: [
      { v: 61000 },
      { v: 66000 },
      { v: 62000 },
      { v: 68000 },
      { v: 63500 },
      { v: 65000 },
    ],
  },
  {
    id: 3,
    name: "Cassava Tubers",
    region: "South West",
    price: 18000,
    change: -2.1,
    unit: "per ton",
    data: [
      { v: 19500 },
      { v: 17000 },
      { v: 19000 },
      { v: 17500 },
      { v: 18800 },
      { v: 18000 },
    ],
  },
  {
    id: 4,
    name: "Yams (Old)",
    region: "Middle Belt",
    price: 120000,
    change: 8.4,
    unit: "per 100 tubers",
    data: [
      { v: 105000 },
      { v: 118000 },
      { v: 112000 },
      { v: 125000 },
      { v: 115000 },
      { v: 120000 },
    ],
  },
  {
    id: 5,
    name: "Palm Oil",
    region: "South East",
    price: 28000,
    change: -1.5,
    unit: "per 25L",
    data: [
      { v: 29000 },
      { v: 27500 },
      { v: 28800 },
      { v: 27200 },
      { v: 28400 },
      { v: 28000 },
    ],
  },
  {
    id: 6,
    name: "Sorghum",
    region: "North East",
    price: 26000,
    change: 3.8,
    unit: "per 100kg",
    data: [
      { v: 24000 },
      { v: 27000 },
      { v: 23500 },
      { v: 26500 },
      { v: 24500 },
      { v: 26000 },
    ],
  },
  {
    id: 7,
    name: "Cocoa Beans",
    region: "South West",
    price: 3500000,
    change: 15.2,
    unit: "per ton",
    data: [
      { v: 3000000 },
      { v: 3600000 },
      { v: 3100000 },
      { v: 3700000 },
      { v: 3300000 },
      { v: 3500000 },
    ],
  },
];

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

export default function CommodityIndex() {
  // Mock plan limit
  const visibleCount = 5;
  const isPremium = false;

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

      <div className="flex-1 min-h-0 relative">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {COMMODITIES.map((item, index) => {
              const isBlurred = !isPremium && index >= visibleCount;
              if (isBlurred) return null; // Or render blurred

              const isPositive = item.change >= 0;
              const color = isPositive ? "#10b981" : "#ef4444";

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between group"
                >
                  {/* Name & Region */}
                  <div className="min-w-[120px]">
                    <div className="font-medium text-sm text-foreground group-hover:text-green-600 transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {item.region} • {item.unit}
                    </div>
                  </div>

                  {/* Sparkline (Hidden on very small screens) */}
                  <div className="hidden sm:block opacity-50 group-hover:opacity-100 transition-opacity">
                    <TinyChart data={item.data} color={color} />
                  </div>

                  {/* Price & Change */}
                  <div className="text-right min-w-[80px]">
                    <div className="font-bold text-sm">
                      ₦{item.price.toLocaleString()}
                    </div>
                    <div
                      className={`text-[10px] flex items-center justify-end gap-0.5 ${
                        isPositive ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp size={10} />
                      ) : (
                        <TrendingDown size={10} />
                      )}
                      {Math.abs(item.change)}%
                      <span className="text-muted-foreground/50 ml-0.5">
                        7d
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Premium Upsell Overlay */}
            {!isPremium && (
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
