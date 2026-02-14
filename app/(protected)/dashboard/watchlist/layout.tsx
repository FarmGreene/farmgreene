"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Bell, Settings } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { TabNavigation } from "@/components/ui/tab-navigation";

const WATCHLIST_NAV_ITEMS = [
  { label: "Watchlist", href: "/dashboard/watchlist", icon: Eye },
  { label: "Alerts", href: "/dashboard/watchlist/alerts", icon: Bell },
  {
    label: "Notifications",
    href: "/dashboard/watchlist/notifications",
    icon: Settings,
  },
];

export default function WatchlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full pb-20">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Watchlists & Alerts"
          description="Track commodities and get notified when market conditions change"
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Alert
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            Add to Watchlist
          </Button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="overflow-x-auto pb-1 no-scrollbar">
        <TabNavigation items={WATCHLIST_NAV_ITEMS} />
      </div>

      {/* 3. Page Content */}
      <div className="mt-0 outline-none animate-in fade-in-50 duration-300">
        {children}
      </div>
    </div>
  );
}
