"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useCommodityIndex } from "@/lib/hooks/useCommodities";
import { usePublicListings } from "@/lib/hooks/usePublicListings";
import { sectionReveal } from "@/lib/motion/marketing";
import { formatNaira, direction } from "@/components/marketing/shared/Figure";
import { Wrap, Display, Warm, Lede, Tag, Action } from "@/components/marketing/ui";
import { cn } from "@/lib/utils";

/**
 * The signature moment: a photograph of the work, with today's real price
 * pinned onto it like a tag on a sack.
 *
 * The price card is live from the public commodity index — the same endpoint
 * the ticker uses. Photography carries the warmth; the card carries the proof.
 * If the index has nothing to show, the card simply doesn't render, so the
 * composition never displays an invented figure.
 */
export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const { data: index } = useCommodityIndex({ limit: 6 });
  const { data: listings } = usePublicListings(100);

  const items = (index?.data ?? []).filter(
    (c) => typeof c.currentPrice === "number" && c.currentPrice > 0,
  );
  const featured = items[0] ?? null;
  const second = items[1] ?? null;

  return (
    <section className="morning-light relative overflow-hidden bg-field pt-14 pb-20 md:pt-20 md:pb-28">
      <Wrap>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={sectionReveal(reduced)}>
            <Tag>Free while we&rsquo;re in early access</Tag>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Display as="h1" className="mt-8">
              Know what your harvest is worth{" "}
              <Warm>before you sell it</Warm>
            </Display>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Lede className="mx-auto mt-7 max-w-xl">
              Real prices from real markets, written down by hand and checked
              before they go up. Plus the tractors and tools to work your land,
              rented from owners near you.
            </Lede>
          </motion.div>

          <motion.div
            variants={sectionReveal(reduced)}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Action href="/signup">Start free</Action>
            <Action href="/intelligence" variant="outline">
              See today&rsquo;s prices
            </Action>
          </motion.div>
        </motion.div>
      </Wrap>

      {/* Photography composition. Two images, offset, with the live price card
          bridging them so the data sits physically inside the scene. */}
      <Wrap className="mt-16 md:mt-20">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 32 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative grid gap-4 lg:grid-cols-[1.55fr_1fr]"
        >
          <div className="photo-veil relative aspect-[16/11] overflow-hidden rounded-[28px] lg:aspect-[16/10]">
            <Image
              src="/images/hero-farm.png"
              alt="Farmland being worked at the start of the season"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            {featured && (
              <PriceCard
                name={featured.name}
                unit={featured.unit}
                price={featured.currentPrice}
                change={
                  featured.latestAverage?.priceChange ?? featured.sevenDayChange
                }
                className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-[19rem]"
              />
            )}
          </div>

          <div className="grid gap-4">
            <div className="photo-veil relative aspect-[4/3] overflow-hidden rounded-[28px] lg:aspect-auto lg:h-full">
              <Image
                src="/images/stakeholder-farmer.jpg"
                alt="Farmers standing together in their cabbage field"
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
              {second && (
                <PriceCard
                  name={second.name}
                  unit={second.unit}
                  price={second.currentPrice}
                  change={
                    second.latestAverage?.priceChange ?? second.sevenDayChange
                  }
                  compact
                  className="absolute bottom-5 left-5 right-5"
                />
              )}
            </div>
          </div>
        </motion.div>

        <Stats
          commodities={index?.meta?.total ?? null}
          listings={listings?.length ?? null}
        />
      </Wrap>
    </section>
  );
}

function PriceCard({
  name,
  unit,
  price,
  change,
  compact = false,
  className,
}: {
  name: string;
  unit: string;
  price: number;
  change: number | null | undefined;
  compact?: boolean;
  className?: string;
}) {
  const dir = direction(change);

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/60 bg-white/95 p-4 shadow-[0_18px_44px_-18px_rgba(4,35,29,0.55)] backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-data text-[10px] uppercase tracking-[0.18em] text-bark-soft">
          Today
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-data text-[11px] font-semibold tabular-nums",
            dir === "up" && "bg-leaf-soft text-leaf-deep",
            dir === "down" && "bg-[#FBE9E6] text-[#A33B28]",
            dir === "flat" && "bg-field-2 text-bark-soft",
          )}
        >
          {dir !== "flat" && (
            <svg
              width="7"
              height="7"
              viewBox="0 0 8 8"
              aria-hidden="true"
              className={dir === "down" ? "rotate-180" : undefined}
            >
              <path d="M4 0 L8 7 L0 7 Z" fill="currentColor" />
            </svg>
          )}
          {dir === "flat" || typeof change !== "number"
            ? "steady"
            : `${Math.abs(change).toFixed(1)}%`}
        </span>
      </div>

      <p
        className={cn(
          "mt-2 font-semibold text-bark",
          compact ? "text-[15px]" : "text-[17px]",
        )}
      >
        {name}
      </p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-data font-semibold tabular-nums text-bark",
            compact ? "text-[20px]" : "text-[26px]",
          )}
        >
          {formatNaira(price)}
        </span>
        <span className="font-data text-[12px] text-bark-soft">per {unit}</span>
      </p>
    </div>
  );
}

/** Real figures only — an em dash stands in until the data lands. */
function Stats({
  commodities,
  listings,
}: {
  commodities: number | null;
  listings: number | null;
}) {
  const stats = [
    { value: commodities, label: "commodities priced daily" },
    { value: 6, label: "regions covered" },
    { value: listings, label: "machines to rent" },
  ];

  return (
    <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-bark/10 pt-10 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="block font-data text-[clamp(1.7rem,3vw,2.4rem)] font-semibold tabular-nums text-leaf">
              {stat.value === null ? "—" : stat.value.toLocaleString()}
            </span>
            <span className="mt-1.5 block text-[14px] text-bark-soft">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
