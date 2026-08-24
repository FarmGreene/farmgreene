"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { usePublicListings } from "@/lib/hooks/usePublicListings";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import {
  ListingCard,
  ListingCardSkeleton,
} from "@/components/marketing/shared/ListingCard";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";
import { cn } from "@/lib/utils";

/** Below this, the grid is thin enough to invite owners in rather than fill it. */
const SPARSE_BELOW = 6;

/**
 * The real listings grid.
 *
 * Category filters are built from the listings that exist, so the page never
 * offers a filter that returns nothing, and they only appear once there's more
 * than one category to choose between. When the grid is short, an invitation
 * tile sits at the end of it — a call to list, not a fabricated machine.
 */
export function Available() {
  const reduced = useReducedMotion() ?? false;
  const { data, isLoading } = usePublicListings(60);
  const listings = useMemo(() => data ?? [], [data]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const l of listings) {
      if (l.category) counts.set(l.category, (counts.get(l.category) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({ category, count }));
  }, [listings]);

  const [category, setCategory] = useState<string | null>(null);

  const shown = useMemo(
    () =>
      category ? listings.filter((l) => l.category === category) : listings,
    [listings, category],
  );

  const sparse = !isLoading && listings.length > 0 && listings.length < SPARSE_BELOW;

  return (
    <section id="available" className="scroll-mt-24 bg-field-2 py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>Available now</Kicker>
          <Display className="mt-5">
            What&rsquo;s <Warm>actually listed</Warm>
          </Display>
          <Lede className="mt-6">
            Every machine here was submitted with proof of ownership and checked
            by a person before it went live.
            {sparse && (
              <>
                {" "}
                The marketplace is new, so the list is still short — it grows as
                owners come on.
              </>
            )}
          </Lede>
        </div>

        {categories.length > 1 && (
          <div className="mt-10 flex flex-wrap gap-2">
            <CategoryChip
              label="Everything"
              count={listings.length}
              active={category === null}
              onClick={() => setCategory(null)}
            />
            {categories.map((c) => (
              <CategoryChip
                key={c.category}
                label={c.category}
                count={c.count}
                active={category === c.category}
                onClick={() => setCategory(c.category)}
              />
            ))}
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={staggerGrid(reduced)}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))
          ) : (
            <>
              {shown.map((listing) => (
                <motion.div key={listing.id} variants={sectionReveal(reduced)}>
                  <ListingCard listing={listing} className="h-full" />
                </motion.div>
              ))}
              {listings.length < SPARSE_BELOW && (
                <motion.div variants={sectionReveal(reduced)}>
                  <ListYoursTile />
                </motion.div>
              )}
            </>
          )}
        </motion.div>

        {!isLoading && listings.length === 0 && (
          <p className="mt-8 max-w-md text-[15px] leading-[1.6] text-bark-soft">
            Nothing is listed yet. Listing takes six short steps and goes live
            once it&rsquo;s been reviewed.
          </p>
        )}
      </Wrap>
    </section>
  );
}

/** Invitation tile that keeps a short grid feeling deliberate rather than empty. */
function ListYoursTile() {
  return (
    <Link
      href="/signup"
      className="group flex min-h-[18rem] flex-col justify-between rounded-[22px] border border-dashed border-bark/25 bg-transparent p-6 transition-colors hover:border-leaf/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-field-2"
    >
      <span className="font-data text-[11px] uppercase tracking-[0.16em] text-bark-soft">
        Your machine here
      </span>
      <div>
        <p className="font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
          Own something that sits idle?
        </p>
        <p className="mt-3 text-[15px] leading-[1.6] text-bark-soft">
          List it in six steps and let it earn between seasons. You set the
          rates and approve every request yourself.
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-leaf">
          List your equipment
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M2 7 h9 M7.5 3 L11.5 7 L7.5 11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function CategoryChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf",
        active
          ? "bg-leaf text-white"
          : "border border-bark/12 bg-white text-bark-soft hover:border-leaf/40 hover:text-bark",
      )}
    >
      {label}
      <span
        className={cn(
          "font-data text-[11px] tabular-nums",
          active ? "text-white/70" : "text-bark-soft/70",
        )}
      >
        {count}
      </span>
    </button>
  );
}
