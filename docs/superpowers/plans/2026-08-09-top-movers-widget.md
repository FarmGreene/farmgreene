# Top Movers Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `TopMoversWidget.tsx`'s hardcoded mock data with the already-existing `useTopMovers` hook, so the dashboard shows real gainers/decliners.

**Architecture:** Single-file rewrite. The entire data layer (`GET /app/commodities/top-movers`, `getTopMovers()` service function, `useTopMovers(limit)` hook, `CommodityMover`/`TopMovers` types) already exists and is committed on this branch — this plan only touches the widget component.

**Tech Stack:** Next.js, React Query (via the existing `useTopMovers` hook), `next/link`, existing shadcn `Tabs`/`Skeleton`/`Button` components — no new dependencies.

**Reference spec:** `docs/superpowers/specs/2026-08-09-top-movers-widget-design.md`

## Global Constraints

- No backend changes — `getTopMovers`, its route, and its types are already complete.
- Row subtitle uses `item.unit`, not a fabricated "market" field.
- "View All" links to `/dashboard/intelligence` via `next/link`.
- Slice to top 6 gainers / top 5 decliners client-side from `useTopMovers(30)`.
- The file's existing "🚀 FUTURE IDEAS & PM NOTES" comment block at the bottom of the file stays untouched.

---

### Task 1: Wire TopMoversWidget to real data

**Files:**
- Modify: `components/dashboard/widgets/TopMoversWidget.tsx`

**Interfaces:**
- Consumes: `useTopMovers(limit: number)` from `@/lib/hooks/useCommodities` — returns a react-query result whose `data` is `{ gainers: CommodityMover[], decliners: CommodityMover[] } | undefined`, plus the standard `isLoading`/`isError` flags. `CommodityMover` (from `@/types/commodity`) has `{ id, name, slug, category, unit, average_price, price_change, date, regional_breakdown }`, where `average_price` and `price_change` are numeric strings.
- Produces: nothing consumed elsewhere — this is a leaf dashboard widget.

- [ ] **Step 1: Replace the full file contents**

Replace the full contents of `components/dashboard/widgets/TopMoversWidget.tsx` with:

```tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTopMovers } from "@/lib/hooks/useCommodities";
import type { CommodityMover } from "@/types/commodity";

const GAINERS_SHOWN = 6;
const DECLINERS_SHOWN = 5;

export default function TopMoversWidget() {
  const { data, isLoading, isError } = useTopMovers(30);
  const gainers = (data?.gainers ?? []).slice(0, GAINERS_SHOWN);
  const decliners = (data?.decliners ?? []).slice(0, DECLINERS_SHOWN);

  return (
    <Card className="h-full border-none shadow-xl bg-white dark:bg-slate-950 overflow-hidden relative group">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Header */}
        <div className="px-4 pb-3 flex shrink-0 items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400">
              Top Price Movers
            </h2>
            <span className="text-[10px] text-slate-400 dark:text-slate-600 font-medium">
              Today
            </span>
          </div>

          <Button
            asChild
            variant="ghost"
            className="group/btn h-auto p-0 px-0! text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-transparent flex items-center gap-1 text-[10px] font-bold tracking-widest"
          >
            <Link href="/dashboard/intelligence">
              View All
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        {isError ? (
          <div className="flex-1 flex items-center gap-2 px-4 pb-4 text-slate-400 dark:text-slate-600">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="text-xs">Couldn&apos;t load top movers.</span>
          </div>
        ) : (
          <Tabs defaultValue="gainers" className="flex-1 flex flex-col min-h-0">
            <div className="px-4 pb-2 shrink-0">
              <TabsList className="grid w-full grid-cols-2 h-8 bg-slate-100/50 dark:bg-slate-900/50 p-1">
                <TabsTrigger
                  value="gainers"
                  className="text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-xs"
                >
                  <TrendingUp className="w-3 h-3 mr-1.5" />
                  Gainers
                </TabsTrigger>
                <TabsTrigger
                  value="decliners"
                  className="text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400 data-[state=active]:shadow-xs"
                >
                  <TrendingDown className="w-3 h-3 mr-1.5" />
                  Decliners
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
              <TabsContent value="gainers" className="mt-0 space-y-1">
                {isLoading ? (
                  <MoverSkeletons count={GAINERS_SHOWN} />
                ) : gainers.length === 0 ? (
                  <EmptyState label="No gainers today" />
                ) : (
                  gainers.map((item) => (
                    <MoverRow key={item.id} item={item} type="up" />
                  ))
                )}
              </TabsContent>
              <TabsContent value="decliners" className="mt-0 space-y-1">
                {isLoading ? (
                  <MoverSkeletons count={DECLINERS_SHOWN} />
                ) : decliners.length === 0 ? (
                  <EmptyState label="No decliners today" />
                ) : (
                  decliners.map((item) => (
                    <MoverRow key={item.id} item={item} type="down" />
                  ))
                )}
              </TabsContent>
            </div>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}

function MoverRow({ item, type }: { item: CommodityMover; type: "up" | "down" }) {
  const changePercent = parseFloat(item.price_change);
  const price = Math.round(parseFloat(item.average_price));

  return (
    <div className="flex items-center justify-between rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group/row cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
      <div className="flex flex-col">
        <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">
          {item.name}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          {item.unit}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <div
          className={cn(
            "flex items-center gap-1 text-[12px] font-bold",
            type === "up"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400",
          )}
        >
          {type === "up" ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {changePercent >= 0 ? "+" : ""}
          {changePercent.toFixed(1)}%
        </div>
        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
          ₦{price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function MoverSkeletons({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-1.5">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-3 w-14" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      ))}
    </>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-8 text-xs text-slate-400 dark:text-slate-600">
      {label}
    </div>
  );
}

/**
 * 🚀 FUTURE IDEAS & PM NOTES
 * --------------------------
 * 1. AI Anomalies: Highlight rows where movement is > 2 standard deviations from 30-day mean.
 *    - UI: Subtle pulsing dot or tooltip: "Unusual spike detected".
 * 2. Dynamic Timeframes: Add a micro-dropdown in the header [Today, 7d, 30d].
 * 3. Personalized Movers: Prioritize commodities in the user's "Watchlist" or "Recent Activity".
 * 4. Regional Filtering: Auto-filter movers based on user's primary trade region.
 * 5. Sparklines: Adding a 24h mini-chart (sparkline) next to the price if space permits in Pro tier.
 */
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors (this repo's baseline is currently clean — any output means this change introduced it)

- [ ] **Step 3: Commit**

```bash
git add components/dashboard/widgets/TopMoversWidget.tsx
git commit -m "feat: wire TopMoversWidget to real gainers/decliners data

Replaces hardcoded MOVERS_DATA with the already-existing
useTopMovers hook. Row subtitle uses unit instead of a fabricated
market field (the aggregation level has no per-market breakdown).
Adds loading skeletons, an empty state per tab, and an honest error
state instead of silently showing stale mock rows. View All now
links to /dashboard/intelligence."
```

---

### Task 2: Verification

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: succeeds with no errors

- [ ] **Step 2: Dev-server click-through**

Start the dev server, open the dashboard, and confirm:
- Widget shows loading skeletons briefly, then real gainer/decliner rows (not the old fake Ibadan/Zaria/Kano data).
- Switching tabs shows the correct list; an empty tab shows "No gainers/decliners today" instead of a blank area.
- Row subtitle shows a unit string (e.g. "per 100kg"), not a city name.
- "View All" navigates to `/dashboard/intelligence`.
