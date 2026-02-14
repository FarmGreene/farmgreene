"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  BarChart3,
  History,
  ShieldCheck,
  Database,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WorkspaceOverview() {
  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Users className="h-4 w-4 text-emerald-600" />}
          title="Workspace Members"
          value="7"
          subValue="of 10 seats used"
          percentage={70}
        />
        <MetricCard
          icon={<FileText className="h-4 w-4 text-blue-600" />}
          title="Reports Generated"
          value="24"
          subValue="Monthly limit: 50"
          percentage={48}
        />
        <MetricCard
          icon={<Database className="h-4 w-4 text-amber-600" />}
          title="Data Contributions"
          value="1,240"
          subValue="+12% from last month"
          trend="up"
        />
        <MetricCard
          icon={<ShieldCheck className="h-4 w-4 text-purple-600" />}
          title="Security Status"
          value="Healthy"
          subValue="Last audit: 2h ago"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Commodities */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm col-span-1 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Active Commodities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                "Maize",
                "Rice",
                "Cassava",
                "Soybeans",
                "Cocoa",
                "Cashew",
                "Wheat",
              ].map((c) => (
                <Badge
                  key={c}
                  variant="outline"
                  className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                >
                  {c}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              These commodities are currently tracked by your workspace agents.
            </p>
          </CardContent>
        </Card>

        {/* Workspace Activity */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm col-span-1 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Workspace Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ActivityItem
              icon={<History className="h-3.5 w-3.5" />}
              label="New Report Generated"
              time="14 mins ago"
              user="by Sarah Miller"
            />
            <ActivityItem
              icon={<Users className="h-3.5 w-3.5" />}
              label="Member Invited"
              time="2 hours ago"
              user="by Admin"
            />
            <ActivityItem
              icon={<Database className="h-3.5 w-3.5" />}
              label="Batch Price Submission"
              time="5 hours ago"
              user="by Agent K."
            />
          </CardContent>
        </Card>

        {/* Plan Summary */}
        <Card className="border-emerald-100 dark:border-emerald-900 shadow-sm bg-emerald-50/10 dark:bg-emerald-950/5 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">
              Plan Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                Pro Plan
              </div>
              <p className="text-sm text-slate-500 italic">
                Renewal date: March 12, 2026
              </p>
            </div>
            <div className="pt-4 space-y-2 border-t border-emerald-100 dark:border-emerald-900">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Team Seats
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  10 Seats
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Monthly Reports
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  50 Reports
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, subValue, percentage, trend }: any) {
  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </div>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          {trend === "up" && (
            <ArrowUpRight className="h-3 w-3 text-emerald-500" />
          )}
          {subValue}
        </p>
        {percentage !== undefined && (
          <div className="mt-3 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityItem({ icon, label, time, user }: any) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
        {icon}
      </div>
      <div className="space-y-0.5">
        <div className="text-sm font-medium text-slate-900 dark:text-white leading-tight">
          {label}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{time}</span>
          <span>•</span>
          <span className="font-medium text-slate-400">{user}</span>
        </div>
      </div>
    </div>
  );
}
