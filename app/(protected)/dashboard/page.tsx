"use client";
import React from "react";
import MarketSnapshot from "@/components/dashboard/widgets/MarketSnapshot";
import { CategoryMovementWidget } from "@/components/dashboard/widgets/CategoryMovementWidget";
import CommodityIndex from "@/components/dashboard/widgets/CommodityIndex";
import ReportsWidget from "@/components/dashboard/widgets/ReportsWidget";
import NewsPulse from "@/components/dashboard/widgets/NewsPulse";
import AIInsightWidget from "@/components/dashboard/widgets/AIInsightWidget";
import TopMoversWidget from "@/components/dashboard/widgets/TopMoversWidget";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Row 1: Snapshot (2 cols) + Indices (1 col each) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="col-span-1 lg:col-span-3">
          <MarketSnapshot />
        </div>
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Was two hardcoded index tiles ("Grains Index 2,450"). These pick
              the two categories actually moving most today, from live data. */}
          <CategoryMovementWidget />
        </div>
      </div>

      {/* Row 2: Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        {/* Left Column: Widgets & Reports */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          {/* News Pulse (Full Width in this column) */}
          {/* 3 Small Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 h-[260px]">
            <TopMoversWidget />
            <AIInsightWidget />
            <NewsPulse />
          </div>

          {/* Reports Widget */}
          <ReportsWidget />
        </div>

        {/* Right Column: Commodity Index (Scrollable) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col space-y-6">
          <CommodityIndex />
        </div>
      </div>
    </div>
  );
}
