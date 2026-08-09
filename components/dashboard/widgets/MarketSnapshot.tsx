"use client";

import React from "react";
import { TrendingUp, TrendingDown, Activity, Globe } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketSnapshot } from "@/lib/hooks/useMarketSnapshot";
import { MarketStatus, VolumeLevel } from "@/types/market-snapshot";

const STATUS_LABEL: Record<MarketStatus, string> = {
  BULLISH: "Bullish",
  BEARISH: "Bearish",
  NEUTRAL: "Mixed",
};

const STATUS_COLOR: Record<MarketStatus, string> = {
  BULLISH: "text-emerald-400",
  BEARISH: "text-rose-400",
  NEUTRAL: "text-amber-400",
};

const VOLUME_LABEL: Record<VolumeLevel, string> = {
  HIGH: "High",
  MED: "Medium",
  LOW: "Low",
};

export default function MarketSnapshot() {
  const { data: snapshot, isLoading } = useMarketSnapshot();
  const status = snapshot?.status ?? "NEUTRAL";
  const volumeLevel = snapshot?.volumeLevel ?? "MED";

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2 overflow-hidden border-none shadow-xl bg-linear-to-br from-green-950 via-emerald-900 to-slate-900 text-white relative group min-h-[220px] flex flex-col justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none"></div>

      <CardContent className="p-6 md:p-8 relative z-10 flex flex-col justify-center h-full gap-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-3 w-40 bg-white/10" />
            <Skeleton className="h-8 w-64 bg-white/10" />
            <Skeleton className="h-4 w-full max-w-sm bg-white/10" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-24 bg-white/10" />
              <Skeleton className="h-8 w-28 bg-white/10" />
              <Skeleton className="h-8 w-24 bg-white/10" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-300/80 text-xs font-medium uppercase tracking-wider">
              <Globe className="h-3 w-3" />
              Global Market Overview
              <span className="w-1 h-1 rounded-full bg-emerald-400 mx-1"></span>
              {snapshot
                ? `Updated ${formatDistanceToNowStrict(new Date(snapshot.createdAt))} ago`
                : "No data yet"}
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                Market is <span className={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</span>
              </h2>
              <p className="text-emerald-100/70 text-sm max-w-sm leading-relaxed">
                {snapshot?.description ?? "Market data updated — no notable moves today."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <Activity className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-medium">
                  Vol: <span className="text-white ml-1">{VOLUME_LABEL[volumeLevel]}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-medium">
                  Gainers: <span className="text-white ml-1">{snapshot?.gainersCount ?? 0}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                <span className="text-xs font-medium">
                  Losers: <span className="text-white ml-1">{snapshot?.declinersCount ?? 0}</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
