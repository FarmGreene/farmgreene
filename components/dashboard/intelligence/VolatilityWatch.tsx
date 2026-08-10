"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTopMovers, usePriceSpikes } from "@/lib/hooks/useCommodities";
import { getHighestPricedRegion } from "@/lib/utils/region";
import type { CommodityMover } from "@/types/commodity";

function formatChange(value: string): string {
  const n = parseFloat(value);
  return `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;
}

export default function VolatilityWatch() {
  const { data: topMovers, isLoading: moversLoading } = useTopMovers(30);
  const { data: spikes, isLoading: spikesLoading } = usePriceSpikes(5);

  const allMovers = [...(topMovers?.gainers ?? []), ...(topMovers?.decliners ?? [])].sort(
    (a, b) =>
      Math.abs(parseFloat(b.price_change)) - Math.abs(parseFloat(a.price_change)),
  );

  const marketMovers = allMovers.slice(0, 3);
  // Next-biggest single-day mover not already shown above — real, computable
  // stand-in for the old fabricated "flash supply drop" claim.
  const sharpMove = allMovers[3];
  const priceSpike = spikes?.[0];

  const isLoading = moversLoading || spikesLoading;
  const hasRiskItems = !!priceSpike || !!sharpMove;

  return (
    <div className="space-y-8">
      {/* Market Movers */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Market Movers
        </h3>
        {isLoading ? (
          <MoverSkeletons count={3} />
        ) : marketMovers.length === 0 ? (
          <EmptyState label="No movers today" />
        ) : (
          <div className="space-y-3">
            {marketMovers.map((item) => (
              <MoverRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Risk Watch */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Risk Watch
        </h3>
        {isLoading ? (
          <RiskSkeletons count={2} />
        ) : !hasRiskItems ? (
          <EmptyState label="No risk signals right now" />
        ) : (
          <div className="space-y-3">
            {priceSpike && (
              <RiskCard
                id={priceSpike.id}
                name={priceSpike.name}
                alert="Price Spike"
                desc={`${priceSpike.spikePercent >= 0 ? "+" : ""}${priceSpike.spikePercent.toFixed(1)}% vs 30-day avg`}
                color="text-rose-500"
              />
            )}
            {sharpMove && (
              <RiskCard
                id={sharpMove.id}
                name={sharpMove.name}
                alert="Sharp Move"
                desc={`${formatChange(sharpMove.price_change)} single-day move`}
                color="text-amber-500"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MoverRow({ item }: { item: CommodityMover }) {
  const changePercent = parseFloat(item.price_change);
  const region = getHighestPricedRegion(item.regional_breakdown);

  return (
    <Link
      href={`/dashboard/intelligence/commodity/${item.id}`}
      className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 -mx-2 p-2 rounded-lg transition-colors"
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {item.name}
        </span>
        {region && (
          <span className="text-[10px] text-slate-400">
            Highest in {region}
          </span>
        )}
      </div>
      <Badge
        variant="outline"
        className={cn(
          "border-none px-2 py-0.5 text-xs font-semibold",
          changePercent >= 0
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
        )}
      >
        {formatChange(item.price_change)}
      </Badge>
    </Link>
  );
}

function RiskCard({
  id,
  name,
  alert,
  desc,
  color,
}: {
  id: string;
  name: string;
  alert: string;
  desc: string;
  color: string;
}) {
  return (
    <Link
      href={`/dashboard/intelligence/commodity/${id}`}
      className="group block p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-colors hover:border-slate-200 dark:hover:border-slate-700"
    >
      <div className="flex justify-between items-start mb-1">
        <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">
          {name}
        </span>
        <span className={cn("text-[10px] font-bold uppercase", color)}>
          {alert}
        </span>
      </div>
      <p className="text-[11px] text-slate-400 leading-normal">{desc}</p>
    </Link>
  );
}

function MoverSkeletons({ count }: { count: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-2 -mx-2">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-2.5 w-20" />
          </div>
          <Skeleton className="h-5 w-12" />
        </div>
      ))}
    </div>
  );
}

function RiskSkeletons({ count }: { count: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-2"
        >
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <p className="text-xs text-slate-400 dark:text-slate-600 py-2">{label}</p>
  );
}
