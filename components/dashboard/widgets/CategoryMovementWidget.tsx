"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendUpIllustration,
  TrendDownIllustration,
} from "@/components/ui/illustrations";
import { useCommodityIndex } from "@/lib/hooks/useCommodities";
import { CATEGORY_LABELS, CommodityCategory } from "@/types/commodity";
import { cn } from "@/lib/utils";

/**
 * Average price movement for a commodity category.
 *
 * This replaced two hardcoded "index" tiles reading "Grains Index 2,450" and
 * "Tubers Index 1,120" — invented numbers on a dashboard where everything
 * around them is live.
 *
 * A real index level isn't buildable from this data, and the blocker isn't
 * effort: an index needs a base period and a fixed basket, and the units
 * inside a single category don't reconcile. Grains are quoted in both "kg" and
 * "per kg"; tubers mix "per kg" with "Small Basket"; livestock adds "per
 * piece". Averaging naira across those is arithmetic without a referent, and
 * `unitWeight` — the one field that could normalise them — is set on barely
 * half of them.
 *
 * Percentage change has no units, so aggregating it across a category is
 * sound. It also answers the question someone actually has: are grains up
 * today?
 *
 * The figure is a MEDIAN, not a mean, and that is load-bearing. On live data
 * the grains changes are 0, 0, 0, 0, 0, 3.2, 170.5 — one commodity (millet)
 * with an extreme entry. The mean of that is +24.8%, which would tell somebody
 * the grain market moved a quarter in a day when seven of nine crops did not
 * move at all. The median says 0.0%, which is what happened. Categories here
 * are small enough that a single bad backfill row can dominate a mean.
 *
 * The subtitle states how many commodities the figure covers, because a
 * category where only 3 of 5 crops are priced deserves to be read with that in
 * mind rather than presented as complete.
 */

/** Below this many priced commodities, the figure says more about noise. */
const MIN_COMMODITIES = 2;

/** How many category tiles the dashboard slot has room for. */
const TILES = 2;

type CategoryMovement = {
  category: CommodityCategory;
  /** Median percentage change across the priced commodities in the category. */
  medianChange: number;
  priced: number;
  total: number;
};

/** Middle value, averaging the two middle values on an even count. */
function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function CategoryMovementWidget() {
  // The endpoint caps a page at 50; the categories worth showing are all well
  // inside that, and asking for more would silently return the same 50.
  const { data, isLoading } = useCommodityIndex({ limit: 50 });

  const movements = useMemo<CategoryMovement[]>(() => {
    const items = data?.data ?? [];
    const groups = new Map<
      CommodityCategory,
      { changes: number[]; total: number }
    >();

    for (const item of items) {
      const category = item.category as CommodityCategory;
      if (!category) continue;

      const group = groups.get(category) ?? { changes: [], total: 0 };
      group.total += 1;

      const change = item.latestAverage?.priceChange ?? item.sevenDayChange;
      // Only commodities with both a price and a movement can contribute — a
      // crop with no submissions this week isn't a zero, it's an unknown.
      if (
        typeof item.currentPrice === "number" &&
        item.currentPrice > 0 &&
        typeof change === "number" &&
        Number.isFinite(change)
      ) {
        group.changes.push(change);
      }

      groups.set(category, group);
    }

    return [...groups.entries()]
      .filter(([, group]) => group.changes.length >= MIN_COMMODITIES)
      .map(([category, group]) => ({
        category,
        medianChange: median(group.changes),
        priced: group.changes.length,
        total: group.total,
      }))
      // Biggest movers first, in either direction — a category sitting flat is
      // the least worth one of two tiles.
      .sort((a, b) => Math.abs(b.medianChange) - Math.abs(a.medianChange))
      .slice(0, TILES);
  }, [data]);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: TILES }).map((_, i) => (
          <Card
            key={i}
            aria-hidden="true"
            className="border-none bg-white shadow-sm dark:bg-slate-900"
          >
            <CardHeader className="pb-2">
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-8 w-20 animate-pulse rounded bg-muted" />
              <div className="h-3 w-28 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  // Nothing with enough coverage to average. Render nothing rather than tiles
  // reading "0.0%", which would look like a market that didn't move.
  if (movements.length === 0) return null;

  return (
    <>
      {movements.map((movement) => (
        <CategoryTile key={movement.category} movement={movement} />
      ))}
    </>
  );
}

function CategoryTile({ movement }: { movement: CategoryMovement }) {
  const { category, medianChange, priced, total } = movement;

  // Under a tenth of a percent reads as movement but isn't; call it steady.
  const direction =
    Math.abs(medianChange) < 0.1 ? "flat" : medianChange > 0 ? "up" : "down";

  const TrendIcon =
    direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;

  return (
    <Card
      className={cn(
        "relative flex flex-col justify-between overflow-hidden border-none shadow-sm transition-all duration-200 hover:shadow-md",
        "bg-white dark:bg-slate-900",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-20">
        {direction === "down" ? (
          <TrendDownIllustration className="h-full w-full object-cover object-bottom" />
        ) : (
          <TrendUpIllustration className="h-full w-full object-cover object-bottom" />
        )}
      </div>

      <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {CATEGORY_LABELS[category] ?? category}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <div
          className={cn(
            "mb-1 text-3xl font-bold tracking-tight tabular-nums",
            direction === "up" && "text-[#049878] dark:text-green-400",
            direction === "down" && "text-red-600 dark:text-red-400",
            direction === "flat" && "text-foreground",
          )}
        >
          {direction === "flat"
            ? "Steady"
            : `${medianChange > 0 ? "+" : "−"}${Math.abs(medianChange).toFixed(1)}%`}
        </div>
        <div className="flex items-center text-xs font-medium text-muted-foreground">
          <TrendIcon className="mr-1 h-3 w-3" />
          Typical of {priced} of {total}{" "}
          {total === 1 ? "commodity" : "commodities"} priced
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-0">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-auto p-0 font-normal text-muted-foreground transition-colors hover:text-primary"
        >
          <Link
            href={`/dashboard/intelligence?category=${category}`}
            className="group flex items-center gap-1"
          >
            See the crops
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CategoryMovementWidget;
