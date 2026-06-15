"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, LayoutGrid, List } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useCommodityIndex } from "@/lib/hooks/useCommodities";
import { CommodityCategory, CommodityIndexItem } from "@/types/commodity";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/pagination/pagination";

type ViewMode = "grid" | "table";

export default function CommodityIntelligenceGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const isPremium = false; // Real app would get this from AuthContext

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category]);

  const { data: indexRes, isLoading } = useCommodityIndex(
    {
      page,
      limit,
      search: debouncedSearch || undefined,
      category:
        category !== "ALL" ? (category as CommodityCategory) : undefined,
    },
    isPremium,
  );

  const commodities = indexRes?.data || [];
  const meta = indexRes?.meta;

  // ─── Helpers ───────────────────────────────────────────────────────────────

  function getPriceColor(change: number) {
    if (change > 0) return "text-emerald-600";
    if (change < 0) return "text-rose-600";
    return "text-slate-500";
  }

  function getStatusDot(change: number) {
    if (change > 0) return "bg-emerald-500";
    if (change < 0) return "bg-rose-500";
    return "bg-slate-400";
  }

  // ─── Skeleton loaders ──────────────────────────────────────────────────────

  const gridSkeletons = Array.from({ length: 8 }).map((_, i) => (
    <Card
      key={i}
      className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl h-[120px]"
    >
      <CardContent className="p-5 h-full flex flex-col justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16" />
      </CardContent>
    </Card>
  ));

  const columns: ColumnDef<CommodityIndexItem>[] = [
    {
      accessorKey: "name",
      header: "Commodity",
      cell: ({ row }) => {
        const item = row.original;
        const change = item.sevenDayChange || 0;
        return (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-1.5 w-1.5 rounded-full shrink-0",
                getStatusDot(change),
              )}
            />
            <span className="font-semibold text-slate-900 dark:text-white">
              {item.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <span className="text-slate-500 dark:text-slate-400">
            {item.category?.replace("_", " ") || "—"}
          </span>
        );
      },
    },
    {
      accessorKey: "currentPrice",
      header: () => <div className="text-right w-full">Price</div>,
      cell: ({ row }) => {
        const item = row.original;
        const price = item.currentPrice || 0;
        return (
          <div className="text-right font-semibold text-slate-900 dark:text-white whitespace-nowrap">
            ₦{price.toLocaleString()}
            <span className="ml-1 text-xs font-normal text-muted-foreground uppercase">
              /{item.unit}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "sevenDayChange",
      header: () => <div className="text-right w-full">7-Day Change</div>,
      cell: ({ row }) => {
        const item = row.original;
        const change = item.sevenDayChange || 0;
        const isPositive = change > 0;
        return (
          <div
            className={cn(
              "text-right font-semibold",
              getPriceColor(change),
            )}
          >
            {isPositive && "+"}
            {change}%
          </div>
        );
      },
    },
  ];

  // ─── Empty state ───────────────────────────────────────────────────────────

  const emptyState = (
    <div className="col-span-full py-12 text-center text-muted-foreground bg-white/50 dark:bg-slate-900/50 rounded-xl">
      No commodities found for the selected filters.
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Filters + View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search commodities..."
            className="pl-8 bg-white dark:bg-slate-900 border-none shadow-sm h-10 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Category filter */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-slate-900 border-none shadow-sm h-10 rounded-xl">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              {Object.values(CommodityCategory).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View toggle */}
          <div className="flex items-center bg-white dark:bg-slate-900 shadow-sm rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={cn(
                "h-8 w-8 flex items-center justify-center rounded-lg transition-all duration-200",
                viewMode === "grid"
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-300",
              )}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              aria-label="Table view"
              className={cn(
                "h-8 w-8 flex items-center justify-center rounded-lg transition-all duration-200",
                viewMode === "table"
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-300",
              )}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Grid View ── */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {isLoading ? (
            gridSkeletons
          ) : commodities.length > 0 ? (
            commodities.map((item) => {
              const price = item.currentPrice || 0;
              const change = item.sevenDayChange || 0;
              const isPositive = change > 0;
              const isStable = change === 0;


// ... Inside grid render
              return (
                <Link key={item.id} href={`/dashboard/intelligence/commodity/${item.id}?slug=${item.slug}`} passHref>
                  <Card
                    className="group relative cursor-pointer border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 rounded-2xl h-full"
                  >
                    <CardContent className="flex flex-col justify-between h-full space-y-4">
                      {/* Header: Name & Badge */}
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            {item.category?.replace("_", " ") || "UNKNOWN"}
                          </span>
                          <h3 className="font-bold text-base text-slate-900 dark:text-white truncate max-w-[140px]">
                            {item.name}
                          </h3>
                        </div>
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            getStatusDot(change),
                          )}
                          title={
                            isPositive
                              ? "Rising"
                              : isStable
                                ? "Stable"
                                : "Falling"
                          }
                        />
                      </div>

                      {/* Price & Change */}
                      <div className="flex items-baseline justify-between mt-auto">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                            ₦{price.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-muted-foreground uppercase">
                            / {item.unit}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "flex items-center gap-1 text-xs font-semibold",
                            getPriceColor(change),
                          )}
                        >
                          {isPositive && "+"}
                          {change}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );

            })
          ) : (
            emptyState
          )}
        </div>
      )}

      {/* ── Table View ── */}
      {viewMode === "table" && (
        <div className="overflow-x-auto rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
          <DataTable
            columns={columns}
            data={commodities}
            loading={isLoading}
            loadingRows={8}
            emptyMessage="No commodities found for the selected filters."
          />
        </div>
      )}

      {/* Pagination — shown when there are multiple pages */}
      {meta && meta.totalPages && meta.totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            totalLength={meta.total}
            batch={page}
            setBatch={setPage}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      )}
    </div>
  );
}
