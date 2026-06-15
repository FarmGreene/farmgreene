"use client";

import React, { useState } from "react";
import { format, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PriceHistory } from "@/types/commodity";

interface CommodityPriceChartProps {
  history?: PriceHistory;
}

export function CommodityPriceChart({ history }: CommodityPriceChartProps) {
  const [timeRange, setTimeRange] = useState<"7D" | "30D" | "90D">("30D");

  const data = history?.history || [];
  
  // Fake backfill if backend doesn't give enough data for smooth chart
  const formattedData = React.useMemo(() => {
    if (data.length === 0) return [];
    
    // Sort chronological just in case
    const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Filter by time range
    const daysToKeep = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : 90;
    const cutoffDate = subDays(new Date(), daysToKeep);
    
    return sorted
      .filter((d) => new Date(d.date) >= cutoffDate)
      .map((d) => ({
        date: format(new Date(d.date), "MMM dd"),
        price: d.averagePrice,
        min: d.minPrice,
        max: d.maxPrice,
      }));
  }, [data, timeRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg shadow-xl">
          <p className="text-slate-400 text-xs mb-1 font-medium">{label}</p>
          <p className="text-white font-bold text-lg">₦{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/50">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
          Price History & Volatility
        </CardTitle>
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
          {(["7D", "30D", "90D"] as const).map((range) => (
            <Button
              key={range}
              variant="ghost"
              size="sm"
              onClick={() => setTimeRange(range)}
              className={`h-7 px-3 text-xs font-bold rounded-md transition-all ${
                timeRange === range
                  ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-6">
        {formattedData.length > 0 ? (
          <div className="h-[280px] w-full px-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  domain={['auto', 'auto']} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(val) => `₦${val.toLocaleString()}`}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  activeDot={{ r: 6, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[280px] flex items-center justify-center text-slate-400 text-sm font-medium">
            Insufficient data for chart
          </div>
        )}
      </CardContent>
    </Card>
  );
}
