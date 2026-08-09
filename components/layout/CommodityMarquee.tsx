"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useCommodityIndex } from "@/lib/hooks/useCommodities";
import { CommodityIndexItem } from "@/types/commodity";
import { cn } from "@/lib/utils";

/**
 * Sticky commodities price ticker pinned above the public navbar. Scrolls the
 * public commodity index (name · ₦price · unit · daily change). Pauses on
 * hover; falls back to a static, horizontally-scrollable strip when the user
 * prefers reduced motion. Renders nothing when there's no data.
 */
export function CommodityMarquee() {
  const { data, isLoading } = useCommodityIndex({ limit: 40 });

  const items = (data?.data ?? []).filter(
    (c) => typeof c.currentPrice === "number" && c.currentPrice > 0,
  );

  if (isLoading) {
    return (
      <div className="sticky top-0 z-[60] w-full h-[46px] flex items-center justify-center border-b border-slate-800 bg-slate-950 text-[11px] font-medium text-slate-400">
        Loading market prices…
      </div>
    );
  }

  if (!items) return null;

  // Slower for short lists, capped so long lists don't crawl.
  const durationSeconds = Math.min(120, Math.max(30, items.length * 4));

  return (
    // marquee-viewport (see globals.css): clips overflow with no scrollbar,
    // pauses the animation on hover, and enables manual scroll only under
    // prefers-reduced-motion.
    <div className="marquee-viewport sticky top-0 z-[60] w-full border-b border-slate-800 bg-slate-950 h-[46px]">
      <div
        className="animate-marquee flex h-full w-max items-center"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <TickerRow items={items} />
        {/* Duplicate, hidden from a11y tree, for the seamless wrap. */}
        <TickerRow items={items} ariaHidden />
      </div>
    </div>
  );
}

function TickerRow({
  items,
  ariaHidden,
}: {
  items: CommodityIndexItem[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex h-full items-center shrink-0"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((c) => (
        <TickerItem key={`${ariaHidden ? "dup-" : ""}${c.id}`} commodity={c} />
      ))}
    </div>
  );
}

function TickerItem({ commodity }: { commodity: CommodityIndexItem }) {
  const change =
    commodity.latestAverage?.priceChange ?? commodity.sevenDayChange;
  const up = typeof change === "number" && change > 0.05;
  const down = typeof change === "number" && change < -0.05;
  const Icon = up ? TrendingUp : down ? TrendingDown : Minus;

  return (
    <Link
      href="/intelligence"
      className="flex items-center gap-2 whitespace-nowrap px-4 border-r border-slate-800/60 h-full hover:bg-white/5 transition-colors"
    >
      <span className="text-[12px] font-semibold text-slate-100">
        {commodity.name}
      </span>
      <span className="text-[12px] font-bold text-white tabular-nums">
        ₦{Number(commodity.currentPrice).toLocaleString()}
      </span>
      <span className="text-[10px] text-slate-500">{commodity.unit}</span>
      <span
        className={cn(
          "flex items-center gap-0.5 text-[11px] font-bold tabular-nums",
          up && "text-emerald-400",
          down && "text-rose-400",
          !up && !down && "text-slate-400",
        )}
      >
        <Icon className="h-3 w-3" />
        {up || down ? `${change > 0 ? "+" : ""}${change.toFixed(1)}%` : "—"}
      </span>
    </Link>
  );
}
