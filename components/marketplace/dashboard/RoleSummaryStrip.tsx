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
  stats?: OwnerStats;
  isLoading?: boolean;
}

export function RoleSummaryStrip({ role, stats, isLoading = false }: RoleSummaryStripProps) {
  if (role === "owner") {
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <CardContent className="p-5 h-28" />
            </Card>
          ))}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Card className="bg-white dark:bg-slate-900 shadow-sm border-slate-100 dark:border-slate-800">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Listings</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats?.totalListings || 0}
                </h3>
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Rentals */}
        <Card className="bg-white dark:bg-slate-900 shadow-sm border-slate-100 dark:border-slate-800">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Active Rentals</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats?.activeRentals || 0}
                </h3>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card className="bg-white dark:bg-slate-900 shadow-sm border-slate-100 dark:border-slate-800">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Pending Requests</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats?.pendingRequests || 0}
                </h3>
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Earnings */}
        <Card className="bg-white dark:bg-slate-900 shadow-sm border-slate-100 dark:border-slate-800">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Earnings</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    ₦{((stats?.totalEarnings || 0) / 1000).toFixed(1)}k
                  </h3>
                  <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{stats?.earningsChange || 0}%
                  </div>
                </div>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <Wallet className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
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
