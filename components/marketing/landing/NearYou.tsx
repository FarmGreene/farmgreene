"use client";

import { useState, useMemo } from "react";
import { usePublicListings } from "@/lib/hooks/usePublicListings";
import {
  ListingCard,
  ListingCardSkeleton,
} from "@/components/marketing/shared/ListingCard";
import { Wrap, Display, Warm, Lede, Kicker, Action } from "@/components/marketing/ui";
import { cn } from "@/lib/utils";

/**
 * Equipment filtered by area.
 *
 * Note this is a chosen area, not a detected one. Auto-detecting the visitor's
 * location would mean either a browser permission prompt on first paint — a bad
 * trade on a landing page — or an IP-lookup service we don't run. The public
 * listings endpoint also takes no location parameter today, so proximity can't
 * be computed server-side.
 *
 * So the honest version: the states in this picker are derived from the
 * listings that actually exist, and picking one filters what's really there.
 * When the backend grows a location filter, this component swaps its data
 * source without the UI changing.
 */
export function NearYou() {
  const { data, isLoading } = usePublicListings(60);
  const listings = useMemo(() => data ?? [], [data]);

  // Only offer areas that genuinely have equipment in them.
  const areas = useMemo(() => {
    const counts = new Map<string, number>();
    for (const l of listings) {
      const key = l.state?.trim();
      if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([state, count]) => ({ state, count }));
  }, [listings]);

  const [area, setArea] = useState<string | null>(null);

  const shown = useMemo(() => {
    const filtered = area
      ? listings.filter((l) => l.state?.trim() === area)
      : listings;
    return filtered.slice(0, 6);
  }, [listings, area]);

  if (!isLoading && listings.length === 0) return null;

  return (
    <section className="bg-field-2 py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>In your area</Kicker>
          <Display className="mt-5">
            What&rsquo;s sitting idle <Warm>near you</Warm>
          </Display>
          <Lede className="mt-6">
            Machinery listed by owners around the country. Pick your state to
            see what&rsquo;s within reach.
          </Lede>
        </div>

        {/* Area picker */}
        {areas.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            <AreaChip
              label="All areas"
              count={listings.length}
              active={area === null}
              onClick={() => setArea(null)}
            />
            {areas.map((a) => (
              <AreaChip
                key={a.state}
                label={a.state}
                count={a.count}
                active={area === a.state}
                onClick={() => setArea(a.state)}
              />
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ListingCardSkeleton key={i} />
              ))
            : shown.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  className="h-full"
                />
              ))}
        </div>

        {!isLoading && shown.length === 0 && (
          <div className="mt-10 rounded-[22px] border border-dashed border-bark/20 px-6 py-14 text-center">
            <p className="text-[16px] text-bark">
              Nothing listed in {area} yet.
            </p>
            <p className="mx-auto mt-2 max-w-md text-[15px] text-bark-soft">
              If you own machinery there, you&rsquo;d be the first — and the
              only one renting it out.
            </p>
          </div>
        )}

        <div className="mt-12">
          <Action href="/marketplace" variant="outline">
            See everything available
          </Action>
        </div>
      </Wrap>
    </section>
  );
}

function AreaChip({
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
