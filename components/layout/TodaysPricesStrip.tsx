"use client";

import Link from "next/link";
import { useCommodityIndex } from "@/lib/hooks/useCommodities";
import { formatNaira, direction } from "@/components/marketing/shared/Figure";
import { cn } from "@/lib/utils";

/**
 * Three real prices, for the 404 page.
 *
 * A dead end is a bad place to stop somebody, and the most useful thing this
 * site can hand a lost visitor is the thing they came for. Renders nothing
 * while loading or if the index is empty — a 404 that also shows broken
 * furniture is worse than a 404.
 */
export function TodaysPricesStrip() {
  const { data } = useCommodityIndex({ limit: 3 });

  const items = (data?.data ?? []).filter(
    (c) => typeof c.currentPrice === "number" && c.currentPrice > 0,
  );

  if (items.length === 0) return null;

  return (
    <div className="mt-16 w-full border-t border-bark/10 pt-10">
      <p className="font-data text-[11px] uppercase tracking-[0.18em] text-bark-soft">
        While you&rsquo;re here — today&rsquo;s prices
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {items.map((c) => {
          const change = c.latestAverage?.priceChange ?? c.sevenDayChange;
          const dir = direction(change);

          return (
            <li key={c.id}>
              <Link
                href="/intelligence"
                className="flex items-center justify-between gap-4 rounded-2xl border border-bark/10 bg-white p-4 text-left transition-colors hover:border-leaf/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-field"
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-bark">
                    {c.name}
                  </p>
                  <p className="mt-0.5 font-data text-[11px] text-bark-soft">
                    per {c.unit}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-data text-[16px] font-semibold tabular-nums text-bark">
                    {formatNaira(c.currentPrice)}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 font-data text-[11px] font-semibold tabular-nums",
                      dir === "up" && "text-leaf",
                      dir === "down" && "text-[#A33B28]",
                      dir === "flat" && "text-bark-soft",
                    )}
                  >
                    {dir === "flat" || typeof change !== "number"
                      ? "steady"
                      : `${change > 0 ? "+" : "−"}${Math.abs(change).toFixed(1)}%`}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
