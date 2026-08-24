import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { PublicListing } from "@/types/marketplace";
import { cn } from "@/lib/utils";
import { formatNaira } from "./Figure";
import { headlineRate, listingLocation } from "@/lib/marketplace/listing-display";

/**
 * Shared listing card for the landing teaser and the marketplace grid. Every
 * field is real: name, category, location, photo and rate all come from the
 * public listings endpoint. Anything the endpoint doesn't carry — a rate on a
 * listing with no price set, a location with no city or state — is left out
 * rather than filled in.
 */
export function ListingCard({
  listing,
  className,
}: {
  listing: PublicListing;
  className?: string;
}) {
  const rate = headlineRate(listing);
  const location = listingLocation(listing);

  return (
    <Link
      href={`/marketplace/${listing.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[22px] border border-bark/10 bg-white transition-colors",
        "hover:border-leaf/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-field",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-field-2">
        {listing.primaryPhotoUrl ? (
          <Image
            src={listing.primaryPhotoUrl}
            alt={listing.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-data text-[11px] uppercase tracking-[0.16em] text-bark-soft">
            No photo
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="font-data text-[11px] uppercase tracking-[0.14em] text-leaf">
          {listing.category}
        </span>

        <h3 className="mt-2 text-[17px] font-semibold leading-snug text-bark">
          {listing.name}
        </h3>

        {location && (
          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-bark-soft">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{location}</span>
          </p>
        )}

        {rate && (
          <p className="mt-auto flex items-baseline gap-1.5 pt-5">
            <span className="font-data text-[18px] font-semibold tabular-nums text-bark">
              {formatNaira(rate.amount)}
            </span>
            <span className="font-data text-[12px] text-bark-soft">
              per {rate.period}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}

export function ListingCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-[22px] border border-bark/10 bg-white"
      aria-hidden="true"
    >
      <div className="aspect-[4/3] animate-pulse bg-field-2" />
      <div className="space-y-3 p-5">
        <div className="h-2.5 w-20 animate-pulse rounded-full bg-field-2" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-field-2" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-field-2" />
      </div>
    </div>
  );
}
