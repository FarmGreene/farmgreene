"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart2,
  Sparkles,
  Users,
  Database,
  Info,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const USAGE_METRICS = [
  {
    title: "Reports Generated",
    icon: <BarChart2 className="h-4 w-4 text-emerald-600" />,
    current: 24,
    limit: 50,
    unit: "reports",
    color: "bg-emerald-600",
  },
  {
    title: "AI Analyses Used",
    icon: <Sparkles className="h-4 w-4 text-purple-600" />,
    current: 78,
    limit: 100,
    unit: "tokens",
    color: "bg-purple-600",
  },
  {
    title: "Team Member Seats",
    icon: <Users className="h-4 w-4 text-blue-600" />,
    current: 7,
    limit: 10,
    unit: "seats",
    color: "bg-blue-600",
  },
  {
    title: "Data Submissions",
    icon: <Database className="h-4 w-4 text-amber-600" />,
    current: 1240,
    limit: 5000,
    unit: "entries",
    color: "bg-amber-600",
  },
];

export default function WorkspaceUsage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Workspace Resource Usage
          </h3>
          <p className="text-sm text-slate-500">
            Track your consumption against your current Pro plan limits.
          </p>
        </div>
        <Button className="bg-slate-900 dark:bg-white dark:text-slate-950 text-white hover:bg-slate-800 gap-2 h-9 text-xs font-semibold uppercase tracking-wider">
          Upgrade Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {USAGE_METRICS.map((metric, idx) => {
          const percentage = (metric.current / metric.limit) * 100;
          const isWarning = percentage > 80;

          return (
            <Card
              key={idx}
              className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group"
            >
              <CardHeader className="pb-3 flex flex-row items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-colors group-hover:border-emerald-500/30">
                  {metric.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-tight">
                    {metric.title}
                  </CardTitle>
                </div>
                {isWarning && (
                  <AlertCircle className="h-4 w-4 text-amber-500 animate-pulse" />
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      {metric.current.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-sm ml-1.5 font-medium">
                      / {metric.limit.toLocaleString()} {metric.unit}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase tracking-widest">
                    {Math.round(percentage)}%
                  </span>
                </div>

                <Progress
                  value={percentage}
                  className="h-2.5 bg-slate-100 dark:bg-slate-900"
                />

                {isWarning ? (
                  <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/20 p-2 rounded border border-amber-100 dark:border-amber-900/50 uppercase tracking-widest leading-none">
                    <Info className="h-3 w-3" />
                    Approaching monthly limit. Consider upgrading.
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest h-2.5">
                    Usage resets in 12 days
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Insight */}
      <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl flex flex-col md:flex-row gap-6 items-center">
        <div className="h-12 w-12 rounded-full bg-white dark:bg-emerald-900 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div className="space-y-1 text-center md:text-left">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-300">
            Usage Insight
          </h4>
          <p className="text-sm text-emerald-800/70 dark:text-emerald-400/70 max-w-xl">
            Your workspace data submissions have increased by **24%** this week
            compared to last week. Your current Pro plan can handle up to 5,000
            entries.
          </p>
        </div>
        <Button
          variant="ghost"
          className="md:ml-auto text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 gap-2"
        >
          View Analytics Detail
        </Button>
      </div>
    </div>
  );
}
