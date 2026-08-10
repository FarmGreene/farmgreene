"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Bell, Settings } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { TabNavigation } from "@/components/ui/tab-navigation";
import { AddCommodityDialog } from "@/components/dashboard/watchlist/AddCommodityDialog";
import { QuickAlertCreateDialog } from "@/components/dashboard/header/QuickAlertCreateDialog";
import { useWatchlist, useAddToWatchlist } from "@/lib/hooks/useCommodities";

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
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);

  const { data: watchlist = [] } = useWatchlist();
  const addMutation = useAddToWatchlist();
  const watchedIds = new Set(watchlist.map((item) => item.commodityId));

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full pb-20">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Watchlists & Alerts"
          description="Track commodities and get notified when market conditions change"
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setIsCreateAlertOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Alert
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            onClick={() => setIsAddOpen(true)}
          >
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

      <AddCommodityDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        watchedIds={watchedIds}
        isAdding={addMutation.isPending}
        onAdd={(commodityId) => addMutation.mutateAsync(commodityId)}
      />
      <QuickAlertCreateDialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen} />
    </div>
  );
}
