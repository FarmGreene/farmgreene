"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  List,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useWatchlist, useRemoveFromWatchlist, useAddToWatchlist } from "@/lib/hooks/useCommodities";
import { CATEGORY_LABELS } from "@/types/commodity";
import { AddCommodityDialog } from "./AddCommodityDialog";
import { toast } from "sonner";

const MiniSparkline = ({ data, color }: { data: number[]; color: string }) => {
  if (data.length < 2) {
    return <div className="h-[40px] w-[80px]" />;
  }
  const points = data.map((price) => ({ price }));
  return (
    <div className="h-[40px] w-[80px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function WatchlistContent() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data: watchlist = [], isLoading } = useWatchlist();
  const removeMutation = useRemoveFromWatchlist();
  const addMutation = useAddToWatchlist();

  const watchedIds = useMemo(
    () => new Set(watchlist.map((item) => item.commodityId)),
    [watchlist],
  );

  const handleRemove = async (commodityId: string) => {
    try {
      await removeMutation.mutateAsync(commodityId);
      toast.success("Removed from watchlist");
    } catch {
      toast.error("Couldn't remove — try again");
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          My Watchlist
        </h2>
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`h-8 px-2 ${viewMode === "grid" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700"}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("table")}
            className={`h-8 px-2 ${viewMode === "table" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700"}`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {watchlist.map((item) => {
            const isPositive = item.changePct >= 0;
            const color = isPositive ? "#10b981" : "#ef4444";

            return (
              <Card
                key={item.id}
                className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">
                      {item.commodity.name}
                    </CardTitle>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                      {CATEGORY_LABELS[item.commodity.category] ?? item.commodity.category}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/intelligence/commodity/${item.commodityId}`}>
                          View Intelligence
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleRemove(item.commodityId)}
                      >
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {item.latestPrice !== null
                          ? `₦${item.latestPrice.toLocaleString()}`
                          : "—"}
                      </div>
                      <div
                        className={`flex items-center text-sm font-medium mt-1 ${isPositive ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(item.changePct).toFixed(1)}% (7d)
                      </div>
                    </div>
                    <MiniSparkline data={item.history} color={color} />
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Add New Card */}
          <button
            onClick={() => setIsAddOpen(true)}
            className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-6 h-full min-h-[180px] hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors group"
          >
            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
              <TrendingUp className="h-6 w-6 text-slate-400 group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-emerald-400" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">
              Track New Commodity
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Add items to your watchlist
            </span>
          </button>
        </div>
      ) : watchlist.length === 0 ? (
        <button
          onClick={() => setIsAddOpen(true)}
          className="w-full border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-10 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors group"
        >
          <TrendingUp className="h-6 w-6 text-slate-400 group-hover:text-emerald-600 mb-3" />
          <span className="font-semibold text-slate-900 dark:text-white">
            Track New Commodity
          </span>
        </button>
      ) : (
        <Card className="border-slate-200 dark:border-slate-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commodity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Change (7d)</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchlist.map((item) => {
                const isPositive = item.changePct >= 0;
                const color = isPositive ? "#10b981" : "#ef4444";

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-slate-900 dark:text-white">
                      {item.commodity.name}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {CATEGORY_LABELS[item.commodity.category] ?? item.commodity.category}
                    </TableCell>
                    <TableCell>
                      {item.latestPrice !== null
                        ? `₦${item.latestPrice.toLocaleString()}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${isPositive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}
                      >
                        {isPositive ? "+" : ""}
                        {item.changePct.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <MiniSparkline data={item.history} color={color} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/intelligence/commodity/${item.commodityId}`}>
                              View Intelligence
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleRemove(item.commodityId)}
                          >
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      <AddCommodityDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        watchedIds={watchedIds}
        isAdding={addMutation.isPending}
        onAdd={(commodityId) => addMutation.mutateAsync(commodityId)}
      />
    </div>
  );
}
