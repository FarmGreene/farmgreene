"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Sparkles,
  FileText,
  CalendarClock,
  Download,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { TabNavigation } from "@/components/ui/tab-navigation";

const REPORTS_NAV_ITEMS = [
  { label: "Generate", href: "/dashboard/reports", icon: Sparkles },
  { label: "Saved Reports", href: "/dashboard/reports/saved", icon: FileText },
  // {
  //   label: "Scheduled",
  //   href: "/dashboard/reports/scheduled",
  //   icon: CalendarClock,
  // },
  // { label: "Exports", href: "/dashboard/reports/exports", icon: Download },
];

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full pb-20">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Market Reports"
          description="Generate AI-powered insights from Farmgreene market data"
        />
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
          <Plus className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="overflow-x-auto pb-1 no-scrollbar">
        <TabNavigation items={REPORTS_NAV_ITEMS} />
      </div>

      {/* 3. Page Content */}
      <div className="mt-0 outline-none animate-in fade-in-50 duration-300">
        {children}
      </div>
    </div>
  );
}
