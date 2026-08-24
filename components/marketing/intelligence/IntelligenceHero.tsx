"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useCommodityIndex } from "@/lib/hooks/useCommodities";
import { sectionReveal } from "@/lib/motion/marketing";
import { formatNaira, direction } from "@/components/marketing/shared/Figure";
import { Wrap, Display, Warm, Lede, Tag, Action } from "@/components/marketing/ui";
import { cn } from "@/lib/utils";

/**
 * Same register as the landing hero — warm ground, photography, real figures
 * pinned on top — but the proof here is breadth rather than a single price:
 * a strip of what's moving today, straight from the public index.
 */
export function IntelligenceHero() {
  const reduced = useReducedMotion() ?? false;
  const { data: index } = useCommodityIndex({ limit: 4 });

  const items = (index?.data ?? []).filter(
    (c) => typeof c.currentPrice === "number" && c.currentPrice > 0,
  );

  return (
    <section className="morning-light relative overflow-hidden bg-field pt-14 pb-20 md:pt-20 md:pb-28">
      <Wrap>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-3xl"
        >
          <motion.div variants={sectionReveal(reduced)}>
            <Tag>Updated every day</Tag>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Display as="h1" className="mt-8">
              The market, <Warm>as it actually is</Warm>
            </Display>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Lede className="mt-7 max-w-xl">
              Prices written down by people standing in markets, checked before
              they go up, and kept as history you can look back through. No
              estimates, no averages of somebody else&rsquo;s guesswork.
            </Lede>
          </motion.div>

          <motion.div
            variants={sectionReveal(reduced)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Action href="/signup">Start free</Action>
            <Action href="/agents" variant="outline">
              Collect prices with us
            </Action>
          </motion.div>
        </motion.div>
      </Wrap>

      <Wrap className="mt-16">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 30 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          className="grid gap-4 lg:grid-cols-[1fr_1.35fr]"
        >
          {/* Today's prices, as a stack of cards rather than a table. */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {items.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    aria-hidden="true"
                    className="h-[86px] animate-pulse rounded-2xl border border-bark/10 bg-white"
                  />
                ))
              : items.slice(0, 3).map((c) => {
                  const change =
                    c.latestAverage?.priceChange ?? c.sevenDayChange;
                  const dir = direction(change);
                  return (
                    <div
                      key={c.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-bark/10 bg-white p-5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-semibold text-bark">
                          {c.name}
                        </p>
                        <p className="mt-0.5 font-data text-[11px] text-bark-soft">
                          per {c.unit}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-data text-[19px] font-semibold tabular-nums text-bark">
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
                    </div>
                  );
                })}
          </div>

          <div className="photo-veil relative aspect-[16/11] overflow-hidden rounded-[28px] lg:aspect-auto">
            <Image
              src="/images/about-hero.png"
              alt="Farmland worked at first light"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <p className="absolute bottom-6 left-6 right-6 font-data text-[11px] uppercase tracking-[0.16em] text-white/80">
              Every figure starts here
            </p>
          </div>
        </motion.div>
      </Wrap>
    </section>
  );
}
