"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  ExternalLink,
  Users,
  Clock,
  Edit3,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Map,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const DASHBOARDS = [
  {
    id: "1",
    title: "North Region Price Intelligence",
    commodities: ["Maize", "Rice", "Soybeans"],
    sharedWith: ["Analyst", "Agent", "Admin"],
    lastUpdated: "45 mins ago",
    status: "Trending Up",
  },
  {
    id: "2",
    title: "Weekly Cocoa Export Volatility",
    commodities: ["Cocoa"],
    sharedWith: ["Owner", "Admin", "Analyst"],
    lastUpdated: "2h ago",
    status: "High Alert",
  },
  {
    id: "3",
    title: "Equipment Utilization - Kano Hub",
    commodities: ["Tractors", "Planters"],
    sharedWith: ["Admin", "Agent"],
    lastUpdated: "5h ago",
    status: "Normal",
  },
];

export default function SharedDashboards() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Workspace Views
          </h3>
          <p className="text-sm text-slate-500">
            Dashboards created by team members and shared with the workspace.
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400"
        >
          <Plus className="h-4 w-4" /> New Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {DASHBOARDS.map((dashboard) => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} />
        ))}

        {/* Empty/Add card */}
        <button className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/30 dark:bg-slate-950 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 hover:border-emerald-500/30 transition-all group gap-4 min-h-[220px]">
          <div className="h-12 w-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900 transition-colors">
            <Plus className="h-6 w-6" />
          </div>
          <div className="text-center">
            <h4 className="font-medium text-slate-900 dark:text-white">
              Create Insight View
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[180px]">
              Group data points and share them with your team.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

function DashboardCard({ dashboard }: { dashboard: any }) {
  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group overflow-hidden">
      <CardHeader className="pb-3 flex flex-row items-start justify-between">
        <div className="space-y-1 pr-4">
          <CardTitle className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors cursor-pointer leading-tight">
            {dashboard.title}
          </CardTitle>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {dashboard.commodities.map((c: string) => (
              <Badge
                key={c}
                // variant="ghost"
                className="h-5 px-1.5 text-[10px] bg-slate-100 dark:bg-slate-900 text-slate-500 rounded font-bold uppercase tracking-wide"
              >
                {c}
              </Badge>
            ))}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 shrink-0">
          <BarChart3 className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
            <Users className="h-3.5 w-3.5" />
            <span>
              Shared with:{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {dashboard.sharedWith.join(", ")}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wider">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              {dashboard.lastUpdated}
            </div>
            <div
              className={cn(
                "px-2 py-0.5 rounded-full border",
                dashboard.status === "High Alert"
                  ? "text-red-600 border-red-100 bg-red-50"
                  : dashboard.status === "Trending Up"
                    ? "text-emerald-600 border-emerald-100 bg-emerald-50"
                    : "text-blue-600 border-blue-100 bg-blue-50",
              )}
            >
              {dashboard.status}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t border-slate-50 dark:border-slate-800 px-4 py-3 bg-slate-50/30 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-slate-500 hover:text-emerald-600 gap-1.5"
        >
          <Edit3 className="h-3.5 w-3.5" /> Edit Access
        </Button>
        <Button
          size="sm"
          className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 shadow-sm"
        >
          Open Dashboard <ExternalLink className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
