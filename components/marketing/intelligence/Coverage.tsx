"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCommodityIndex, useTopMovers } from "@/lib/hooks/useCommodities";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { formatNaira, direction } from "@/components/marketing/shared/Figure";
import type { CommodityMover } from "@/types/commodity";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";
import { cn } from "@/lib/utils";

/**
 * Coverage stated plainly, then today's actual movement beneath it.
 *
 * `average_price` and `price_change` arrive as strings — Postgres returns
 * decimal columns that way through `pg` — so both are wrapped in Number()
 * before they're formatted or compared.
 */
export function Coverage() {
  const reduced = useReducedMotion() ?? false;
  const { data: index } = useCommodityIndex({ limit: 1 });
  const { data: movers, isLoading } = useTopMovers(4);

  const total = index?.meta?.total ?? null;
  const gainers = (movers?.gainers ?? []).slice(0, 4);
  const decliners = (movers?.decliners ?? []).slice(0, 4);

  const facts = [
    {
      value: total === null ? "—" : total.toLocaleString(),
      label: "crops priced",
      note: "Grains, tubers, legumes, cash crops, vegetables and livestock.",
    },
    {
      value: "6",
      label: "regions",
      note: "Every submission is tagged to a region, a state and a market.",
    },
    {
      value: "52",
      label: "weeks kept",
      note: "Daily averages, weekly aggregates and a year of trend behind them.",
    },
  ];

  return (
    <section className="bg-field-2 py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>Coverage</Kicker>
          <Display className="mt-5">
            What&rsquo;s actually <Warm>in the data</Warm>
          </Display>
          <Lede className="mt-6">
            Prices are collected against assignments, tagged by place, and
            averaged only after somebody has approved them.
          </Lede>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={staggerGrid(reduced)}
          className="mt-14 grid gap-6 sm:grid-cols-3"
        >
          {facts.map((fact) => (
            <motion.li
              key={fact.label}
              variants={sectionReveal(reduced)}
              className="rounded-[22px] border border-bark/10 bg-white p-7"
            >
              <span className="block font-data text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-none tabular-nums text-leaf">
                {fact.value}
              </span>
              <span className="mt-3 block font-data text-[11px] uppercase tracking-[0.16em] text-bark-soft">
                {fact.label}
              </span>
              <p className="mt-4 text-[14px] leading-[1.6] text-bark-soft">
                {fact.note}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Today's movement */}
        {(isLoading || gainers.length > 0 || decliners.length > 0) && (
          <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-14">
            <MoverList
              title="Rising today"
              movers={gainers}
              isLoading={isLoading}
              reduced={reduced}
            />
            <MoverList
              title="Falling today"
              movers={decliners}
              isLoading={isLoading}
              reduced={reduced}
            />
          </div>
        )}
      </Wrap>
    </section>
  );
}

function MoverList({
  title,
  movers,
  isLoading,
  reduced,
}: {
  title: string;
  movers: CommodityMover[];
  isLoading: boolean;
  reduced: boolean;
}) {
  if (!isLoading && movers.length === 0) return null;

  return (
    <div>
      <h3 className="border-b border-bark/12 pb-3 font-data text-[11px] uppercase tracking-[0.18em] text-bark-soft">
        {title}
      </h3>
      {isLoading ? (
        <ul aria-hidden="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="border-b border-bark/8 py-4">
              <span className="block h-3 w-2/3 animate-pulse rounded-full bg-white" />
            </li>
          ))}
        </ul>
      ) : (
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={staggerGrid(reduced)}
        >
          {movers.map((m) => {
            const change = Number(m.price_change);
            const dir = direction(change);
            return (
              <motion.li key={m.id} variants={sectionReveal(reduced)}>
                <Link
                  href="/signup"
                  className="flex items-baseline justify-between gap-4 border-b border-bark/8 py-4 transition-colors hover:text-bark focus-visible:outline-none"
                >
                  <span className="truncate text-[15px] font-medium text-bark">
                    {m.name}
                  </span>
                  <span className="flex shrink-0 items-baseline gap-3">
                    <span className="font-data text-[14px] tabular-nums text-bark-soft">
                      {formatNaira(Number(m.average_price))}
                    </span>
                    <span
                      className={cn(
                        "font-data text-[12px] font-semibold tabular-nums",
                        dir === "up" && "text-leaf",
                        dir === "down" && "text-[#A33B28]",
                        dir === "flat" && "text-bark-soft",
                      )}
                    >
                      {dir === "flat"
                        ? "steady"
                        : `${change > 0 ? "+" : "−"}${Math.abs(change).toFixed(1)}%`}
                    </span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
}
