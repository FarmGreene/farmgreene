"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart as BarChartIcon,
  TrendingUp,
  Trophy,
  ArrowRight,
  Medal,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const weeklyData = [
  { day: "Mon", submissions: 6 },
  { day: "Tue", submissions: 8 },
  { day: "Wed", submissions: 5 },
  { day: "Thu", submissions: 9 },
  { day: "Fri", submissions: 7 },
  { day: "Sat", submissions: 0 },
  { day: "Sun", submissions: 0 },
];

const accuracyTrendData = [
  { week: "Week 1", accuracy: 82 },
  { week: "Week 2", accuracy: 85 },
  { week: "Week 3", accuracy: 89 },
  { week: "Week 4", accuracy: 92 },
];

export function AgentPerformanceSnapshot() {
  const router = useRouter();

  // Today is typically highlighted. For this mock, let's say today is Thursday
  const currentDay = "Thu";

  return (
    <Card className="flex flex-col h-full border-0 shadow-sm">
      <CardHeader className="pb-4 border-b/50 px-5 bg-muted/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <BarChartIcon className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="text-lg font-semibold">
              Performance Snapshot
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary hover:text-primary/80 group hidden sm:flex"
            onClick={() => router.push("/agent/performance")}
          >
            Full Report{" "}
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-5 space-y-6">
        {/* Weekly Chart Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              Weekly Submissions
            </h4>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
              This Week
            </span>
          </div>

          <div className="h-[180px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyData}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorSubmissions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                  className="dark:stroke-neutral-800"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{
                    stroke: "#10b981",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                />
                <ReferenceLine
                  x={currentDay}
                  stroke="#10b981"
                  strokeDasharray="3 3"
                  label={{
                    position: "top",
                    value: "Today",
                    fill: "#10b981",
                    fontSize: 10,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="submissions"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSubmissions)"
                  activeDot={{
                    r: 6,
                    fill: "#10b981",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two Column Section for Accuracy Trend and Ranking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {/* Accuracy Trend Summary */}
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Accuracy Trend
              </h4>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold">92%</span>
              <span className="text-xs text-emerald-600 font-medium mb-1">
                +3% vs last mo
              </span>
            </div>

            <div className="h-[40px] w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accuracyTrendData}>
                  <defs>
                    <linearGradient
                      id="colorAccuracy"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <RechartsTooltip />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAccuracy)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Ranking */}
          <div className="bg-linear-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-xl p-4 border border-amber-500/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-0 top-0 p-4 opacity-5">
              <Trophy className="w-24 h-24 transform translate-x-1/4 -translate-y-1/4" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Medal className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-semibold text-amber-600/80 uppercase tracking-wider dark:text-amber-500/80">
                  Regional Rank
                </h4>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-500">
                  #12
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  / 87
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                Top 15% in North Central
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-500/10">
              <p className="text-[10px] text-amber-600/70 dark:text-amber-500/70 leading-tight">
                Maintain 90%+ accuracy this week to reach top 10.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile only CTA */}
        <Button
          variant="outline"
          className="w-full sm:hidden"
          onClick={() => router.push("/agent/performance")}
        >
          View Full Performance
        </Button>
      </CardContent>
    </Card>
  );
}
