"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  createChart,
  AreaSeries,
  ColorType,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  Time,
} from "lightweight-charts";
import { subDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PriceHistory } from "@/types/commodity";
import { useWeeklyPriceHistory } from "@/lib/hooks/useCommodities";

type TimeRange = "7D" | "30D" | "90D" | "1Y" | "ALL";

const RANGES: TimeRange[] = ["7D", "30D", "90D", "1Y", "ALL"];
const ONE_YEAR_WEEKS = 52;

interface CommodityPriceChartProps {
  commodityId: string;
  history?: PriceHistory;
}

interface ChartPoint {
  time: Time;
  value: number;
}

function toIsoDay(date: string | Date): string {
  return new Date(date).toISOString().slice(0, 10);
}

export function CommodityPriceChart({ commodityId, history }: CommodityPriceChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30D");
  const isLongRange = timeRange === "1Y" || timeRange === "ALL";
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { data: weeklyHistory, isLoading: isWeeklyLoading } = useWeeklyPriceHistory(
    commodityId,
    timeRange === "1Y" ? ONE_YEAR_WEEKS : undefined,
    isLongRange,
  );

  const data = history?.history || [];

  const formattedData: ChartPoint[] = React.useMemo(() => {
    if (isLongRange) {
      const weeklyData = weeklyHistory?.history || [];
      return [...weeklyData]
        .sort((a, b) => new Date(a.weekStartDate).getTime() - new Date(b.weekStartDate).getTime())
        .map((w) => ({ time: toIsoDay(w.weekStartDate) as Time, value: Number(w.averagePrice) }));
    }

    if (data.length === 0) return [];

    const sorted = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const daysToKeep = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : 90;
    const cutoffDate = subDays(new Date(), daysToKeep);

    return sorted
      .filter((d) => new Date(d.date) >= cutoffDate)
      .map((d) => ({ time: toIsoDay(d.date) as Time, value: Number(d.averagePrice) }));
  }, [data, timeRange, isLongRange, weeklyHistory]);

  const isLoading = isLongRange && isWeeklyLoading;

  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const [legend, setLegend] = useState<{ date: string; price: number } | null>(null);

  // Create the chart once per container mount.
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: isDark ? "#94a3b8" : "#64748b",
        fontSize: 10,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: isDark ? "rgba(51,65,85,0.3)" : "rgba(148,163,184,0.2)" },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: "#10b981",
      lineWidth: 3,
      topColor: "rgba(16,185,129,0.3)",
      bottomColor: "rgba(16,185,129,0)",
      priceLineVisible: false,
      lastValueVisible: false,
    });

    chart.subscribeCrosshairMove((param) => {
      if (!param.time || !param.seriesData.size) {
        setLegend(null);
        return;
      }
      const point = param.seriesData.get(series) as { value?: number } | undefined;
      if (point?.value != null) {
        setLegend({ date: String(param.time), price: point.value });
      }
    });

    chartRef.current = chart;
    seriesRef.current = series;

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-theme on dark/light switch without recreating the chart.
  useEffect(() => {
    chartRef.current?.applyOptions({
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: isDark ? "#94a3b8" : "#64748b",
      },
      grid: {
        horzLines: { color: isDark ? "rgba(51,65,85,0.3)" : "rgba(148,163,184,0.2)" },
      },
    });
  }, [isDark]);

  // Push new data whenever the range/series changes.
  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData(formattedData);
    chartRef.current?.timeScale().fitContent();
    setLegend(
      formattedData.length > 0
        ? { date: String(formattedData[formattedData.length - 1].time), price: formattedData[formattedData.length - 1].value }
        : null,
    );
  }, [formattedData]);

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/50">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
          Price History & Volatility
        </CardTitle>
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
          {RANGES.map((range) => (
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
              {range === "ALL" ? "All" : range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-6 relative">
        {!isLoading && legend && formattedData.length > 0 && (
          <div className="absolute top-3 left-5 z-10 bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-lg shadow-xl pointer-events-none">
            <p className="text-slate-400 text-[10px] mb-0.5 font-medium">{legend.date}</p>
            <p className="text-white font-bold text-base">
              ₦{legend.price.toLocaleString()}
            </p>
          </div>
        )}

        {/* Container stays mounted at all times — lightweight-charts binds to
            it once on mount, so conditionally unmounting it would leave a
            dead ref if data arrives later. */}
        <div ref={containerRef} className="h-[280px] w-full px-2" />
        <style jsx global>{`
          a#tv-attr-logo {
            display: none !important;
          }
        `}</style>

        {isLoading && (
          <div className="absolute inset-0 top-6 flex items-center justify-center text-slate-400 text-sm font-medium bg-white dark:bg-slate-900">
            Loading weekly history…
          </div>
        )}
        {!isLoading && formattedData.length === 0 && (
          <div className="absolute inset-0 top-6 flex items-center justify-center text-slate-400 text-sm font-medium bg-white dark:bg-slate-900">
            Insufficient data for chart
          </div>
        )}
      </CardContent>
    </Card>
  );
}
