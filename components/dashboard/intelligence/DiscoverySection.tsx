"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTopMovers, useRecentlyAdded } from "@/lib/hooks/useCommodities";

interface DiscoveryItem {
  id: string;
  name: string;
  tag: string;
}

export default function DiscoverySection() {
  const { data: topMovers, isLoading: moversLoading } = useTopMovers(30);
  const { data: recentlyAdded, isLoading: recentLoading } = useRecentlyAdded(1);

  const isLoading = moversLoading || recentLoading;

  const items: DiscoveryItem[] = [];

  const newest = recentlyAdded?.[0];
  if (newest) {
    items.push({ id: newest.id, name: newest.name, tag: "Newly Tracked" });
  }

  const topGainer = topMovers?.gainers?.[0];
  if (topGainer && topGainer.id !== newest?.id) {
    const changePercent = parseFloat(topGainer.price_change);
    items.push({
      id: topGainer.id,
      name: topGainer.name,
      tag: `+${changePercent.toFixed(1)}%`,
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        Discovery
      </h3>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-2 -mx-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-xs text-slate-400 dark:text-slate-600 py-2">
          Nothing new to surface yet.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/dashboard/intelligence/commodity/${item.id}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-colors -mx-2"
            >
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                {item.name}
              </span>
              <Badge
                variant="secondary"
                className="text-[10px] bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all border-none font-medium"
              >
                {item.tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      <Button
        asChild
        variant="outline"
        className="w-full text-xs h-8 border-slate-200 dark:border-slate-800 text-slate-500"
      >
        <a href="#commodities-grid">Explore All Commodities</a>
      </Button>
    </div>
  );
}
