"use client";

import React from "react";
import { UserRole, OwnerStats } from "@/types/marketplace";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Clock,
  Layers,
  Wallet,
  TrendingUp,
  Search,
  Tag,
  Map,
} from "lucide-react";

interface RoleSummaryStripProps {
  role: UserRole;
  stats: OwnerStats;
}

export function RoleSummaryStrip({ role, stats }: RoleSummaryStripProps) {
  if (role === "owner") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Listings"
          value={stats.totalListings.toString()}
          icon={<Layers className="h-4 w-4 text-muted-foreground" />}
          trend="All systems go"
        />
        <StatsCard
          title="Active Rentals"
          value={stats.activeRentals.toString()}
          icon={<Clock className="h-4 w-4 text-blue-500" />}
          trend="1 ending soon"
          trendColor="text-blue-600"
        />
        <StatsCard
          title="Pending Requests"
          value={stats.pendingRequests.toString()}
          icon={<ArrowUpRight className="h-4 w-4 text-amber-500" />}
          trend="Action required"
          trendColor="text-amber-600 font-medium"
        />
        <StatsCard
          title="Total Earnings"
          value={`₦${(stats.totalEarnings / 1000).toFixed(1)}k`}
          icon={<Wallet className="h-4 w-4 text-green-500" />}
          trend={`+${stats.earningsChange}% vs last month`}
          trendColor="text-green-600"
        />
      </div>
    );
  }

  // Browser/Renter View
  // return (
  //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //     <DiscoveryCard
  //       title="Near You"
  //       description="12 tractors available in Osogbo"
  //       icon={<Map className="h-5 w-5 text-indigo-500" />}
  //       bgClass="bg-indigo-50 dark:bg-indigo-950/30"
  //     />
  //     <DiscoveryCard
  //       title="Popular Categories"
  //       description="Tractors, Harvesters, Irrigation"
  //       icon={<Tag className="h-5 w-5 text-pink-500" />}
  //       bgClass="bg-pink-50 dark:bg-pink-950/30"
  //     />
  //     <DiscoveryCard
  //       title="Recent Trends"
  //       description="Heavy demand for planters"
  //       icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
  //       bgClass="bg-emerald-50 dark:bg-emerald-950/30"
  //     />
  //   </div>
  // );
  return null;
}

function StatsCard({
  title,
  value,
  icon,
  trend,
  trendColor = "text-muted-foreground",
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendColor?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          {trend && <p className={`text-xs mt-1 ${trendColor}`}>{trend}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function DiscoveryCard({
  title,
  description,
  icon,
  bgClass,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgClass: string;
}) {
  return (
    <Card className={`${bgClass} border-none`}>
      <CardContent className="p-6 flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
