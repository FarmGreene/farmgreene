"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarClock,
  MoreHorizontal,
  Plus,
  Mail,
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const SCHEDULED_REPORTS = [
  {
    id: "1",
    title: "Monday Market Briefing",
    commodity: "All Grains",
    region: "National",
    frequency: "Weekly",
    nextRun: "Feb 17, 2026",
    recipients: ["Dashboard", "Email"],
    active: true,
  },
  {
    id: "2",
    title: "Monthly Price Forecast",
    commodity: "Cashew, Cocoa",
    region: "South West",
    frequency: "Monthly",
    nextRun: "Mar 01, 2026",
    recipients: ["Dashboard"],
    active: true,
  },
  {
    id: "3",
    title: "Volatility Alert - North",
    commodity: "Maize",
    region: "North Central",
    frequency: "Daily",
    nextRun: "Feb 14, 2026",
    recipients: ["Email"],
    active: false,
  },
];

export default function ScheduledReports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Active Schedules
          </h3>
          <p className="text-sm text-slate-500">
            Manage your automated report generation.
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400"
        >
          <Plus className="h-4 w-4" /> New Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SCHEDULED_REPORTS.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}

        {/* Add New Card Placeholder */}
        <button className="group relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all gap-4">
          <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900 flex items-center justify-center transition-colors">
            <Plus className="h-6 w-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <div className="text-center">
            <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-emerald-700">
              Create New Schedule
            </h4>
            <p className="text-sm text-slate-500 mt-1">
              Automate a new recurring report
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

function ScheduleCard({ schedule }: { schedule: any }) {
  const [isActive, setIsActive] = useState(schedule.active);

  return (
    <Card
      className={cn(
        "transition-all",
        !isActive &&
          "opacity-75 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold leading-tight">
              {schedule.title}
            </CardTitle>
            <div className="flex gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CalendarClock className="h-3 w-3" /> {schedule.frequency}
              </span>
              <span>•</span>
              <span>Next: {schedule.nextRun}</span>
            </div>
          </div>
          <CustomSwitch checked={isActive} onChange={setIsActive} />
        </div>
      </CardHeader>
      <CardContent className="pb-3 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Commodity</span>
            <span className="font-medium text-slate-900 dark:text-white text-right">
              {schedule.commodity}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Region</span>
            <span className="font-medium text-slate-900 dark:text-white text-right">
              {schedule.region}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
        <div className="flex gap-3">
          {schedule.recipients.includes("Dashboard") && (
            <div
              className="flex items-center gap-1"
              title="Delivered to Dashboard"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
            </div>
          )}
          {schedule.recipients.includes("Email") && (
            <div className="flex items-center gap-1" title="Delivered to Email">
              <Mail className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 -mr-2 text-slate-400"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function CustomSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "w-11 h-6 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
        checked ? "bg-emerald-600" : "bg-slate-200 dark:bg-slate-700",
      )}
    >
      <span
        className={cn(
          "absolute top-1 left-1 bg-white dark:bg-slate-50 w-4 h-4 rounded-full shadow-sm transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}
