"use client";

import { useCommodityIndex, useRegionalPrices } from "@/lib/hooks/useCommodities";
import { REGION_LABELS, NigerianRegion } from "@/types/commodity";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, sectionReveal } from "@/lib/motion/marketing";
import { formatNaira, Eyebrow } from "./Figure";

/**
 * The second signature element: one commodity, priced across every region, on a
 * single shared axis. This is the argument for the whole product made visually
 * — the same crop is worth materially different money depending on where you
 * sell it, and until you can see that gap you're selling blind.
 *
 * Rendered as a dot plot rather than a single axis strip so it stays legible at
 * 360px: every row shares one scale, so the spread reads at a glance.
 *
 * If a commodity has no regional breakdown, this renders nothing at all. There
 * is no fallback shape and no interpolated number — an invented spread would
 * undermine the exact claim the section exists to make.
 */
export function ZoneSpread({
  onDark = true,
  accent = "harmattan",
}: {
  onDark?: boolean;
  /** "sun" switches the highlight to the landing page's maize-gold accent. */
  accent?: "harmattan" | "sun";
}) {
  const isSun = accent === "sun";
  const accentText = isSun
    ? "text-sun"
    : onDark
      ? "text-harmattan-400"
      : "text-harmattan-600";
  const accentDot = isSun
    ? "bg-sun ring-sun/15"
    : onDark
      ? "bg-harmattan-400 ring-harmattan-400/15"
      : "bg-harmattan-600 ring-harmattan-600/12";

  const reduced = useReducedMotion() ?? false;

  // Pick a commodity that genuinely has regional data, straight from the index
  // (its `history` entries carry the daily regional breakdown), so we never
  // render an empty frame waiting on a second request.
  const { data: index } = useCommodityIndex({ limit: 12 });

  const candidate = (index?.data ?? []).find((c) => {
    const latest = c.history?.[c.history.length - 1];
    return Object.keys(latest?.regionalBreakdown ?? {}).length >= 2;
  });

  const { data: regional } = useRegionalPrices(candidate?.id ?? "");

  if (!candidate || !regional) return null;

  const entries = Object.entries(regional.regionalBreakdown ?? {})
    .map(([region, price]) => ({ region, price: Number(price) }))
    .filter((e) => Number.isFinite(e.price) && e.price > 0)
    .sort((a, b) => a.price - b.price);

  if (entries.length < 2) return null;

  const low = entries[0];
  const high = entries[entries.length - 1];
  const spread = high.price - low.price;
  const range = spread || 1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      variants={sectionReveal(reduced)}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16 items-start">
        <div>
          <span
            className={cn(
              "font-data text-[11px] uppercase tracking-[0.18em]",
              accentText,
            )}
          >
            The same crop, priced by region
          </span>
          <h3
            className={cn(
              "mt-4 font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]",
              onDark ? "text-white" : "text-ink",
            )}
          >
            {regional.commodity.name}
          </h3>
          <p
            className={cn(
              "mt-4 text-[15px] leading-[1.6]",
              onDark ? "text-white/60" : "text-ink-muted",
            )}
          >
            One {regional.commodity.unit}, {entries.length} regions, recorded{" "}
            {regional.date
              ? new Date(regional.date).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "long",
                })
              : "recently"}
            .
          </p>

          <div
            className={cn(
              "mt-8 rounded-sm border p-5",
              onDark
                ? "border-bush-700 bg-white/[0.03]"
                : "border-ink/10 bg-chalk-deep",
            )}
          >
            <div
              className={cn(
                "font-data text-[clamp(1.5rem,3vw,2rem)] font-semibold tabular-nums",
                accentText,
              )}
            >
              {formatNaira(spread)}
            </div>
            <p
              className={cn(
                "mt-1.5 text-[13px] leading-snug",
                onDark ? "text-white/50" : "text-ink-muted",
              )}
            >
              between the cheapest and the dearest region today
            </p>
          </div>
        </div>

        <ul className="space-y-1">
          {entries.map((e) => {
            const pct = ((e.price - low.price) / range) * 100;
            const isEdge = e.region === low.region || e.region === high.region;
            return (
              <li
                key={e.region}
                className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[9rem_1fr_5.5rem] items-center gap-x-4 gap-y-1 py-2.5"
              >
                <span
                  className={cn(
                    "font-data text-[11px] uppercase tracking-[0.14em] truncate",
                    onDark ? "text-white/55" : "text-ink-muted",
                  )}
                >
                  {REGION_LABELS[e.region as NigerianRegion] ?? e.region}
                </span>

                <div className="relative h-5 flex items-center order-last col-span-2 sm:order-none sm:col-span-1">
                  <span
                    className={cn(
                      "absolute inset-x-0 h-px",
                      onDark ? "bg-white/12" : "bg-ink/10",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4",
                      isEdge
                        ? accentDot
                        : onDark
                          ? "bg-white/70 ring-white/8"
                          : "bg-ink/60 ring-ink/6",
                    )}
                    style={{ left: `${pct}%` }}
                  />
                </div>

                <span
                  className={cn(
                    "font-data text-[13px] tabular-nums text-right justify-self-end",
                    isEdge
                      ? onDark
                        ? "text-white font-semibold"
                        : "text-ink font-semibold"
                      : onDark
                        ? "text-white/60"
                        : "text-ink-muted",
                  )}
                >
                  {formatNaira(e.price)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
