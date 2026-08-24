import type { EquipmentListing, RentalPeriod } from "@/types/marketplace";

/**
 * Display helpers for listings.
 *
 * `EquipmentListing` declares `price`, `period` and `location` as derived
 * fields, but `GET /public/marketplace/listings` returns the raw columns
 * without them. Reading `listing.price` straight from a public listing gives
 * `undefined`, which formats as "₦NaN". Money columns also arrive as strings —
 * Postgres decimals through `pg` — so every rate needs `Number()` before it's
 * compared or formatted.
 *
 * These derive what the UI needs from the fields that are actually present,
 * and still prefer the derived fields on the endpoints that do send them.
 */

type RateFields = Pick<
  EquipmentListing,
  | "price"
  | "period"
  | "pricePerDay"
  | "pricePerWeek"
  | "pricePerMonth"
  | "primaryPeriod"
>;

const PERIODS: RentalPeriod[] = ["day", "week", "month"];

/**
 * The rate to lead with: the owner's primary period when it's priced,
 * otherwise the first period that is. Null when nothing is priced, so callers
 * can leave the figure out rather than print a placeholder.
 */
export function headlineRate(
  listing: RateFields,
): { amount: number; period: RentalPeriod } | null {
  const direct = Number(listing.price);
  if (Number.isFinite(direct) && direct > 0 && listing.period) {
    return { amount: direct, period: listing.period };
  }

  const amounts: Record<RentalPeriod, number> = {
    day: Number(listing.pricePerDay),
    week: Number(listing.pricePerWeek),
    month: Number(listing.pricePerMonth),
  };

  const preferred = listing.primaryPeriod;
  const order = preferred
    ? [preferred, ...PERIODS.filter((p) => p !== preferred)]
    : PERIODS;

  for (const period of order) {
    const amount = amounts[period];
    if (Number.isFinite(amount) && amount > 0) return { amount, period };
  }

  return null;
}

/** "Ikeja, Lagos" — city and state, whichever of them exist. */
export function listingLocation(
  listing: Pick<EquipmentListing, "location" | "city" | "state">,
): string | null {
  const direct = listing.location?.trim();
  if (direct) return direct;

  const parts = [listing.city?.trim(), listing.state?.trim()].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
}

/** Money field that may arrive as a decimal string. Null when unset or zero. */
export function amount(value: number | string | null | undefined): number | null {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}
