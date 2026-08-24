import { EquipmentListing, RentEstimate } from "@/types/marketplace";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Days spanned, inclusive of both endpoints (mirrors the backend). */
export function rentalDaysBetween(start: string, end: string): number {
  const s = Date.parse(`${start}T00:00:00Z`);
  const e = Date.parse(`${end}T00:00:00Z`);
  if (Number.isNaN(s) || Number.isNaN(e)) return 0;
  return Math.floor((e - s) / MS_PER_DAY) + 1;
}

/**
 * Display-only cost preview. Must mirror the backend `computeEstimate`
 * (farm-backend/src/main/rent-request/rent-request.service.ts) — the server
 * value is authoritative; this only powers the live estimate in the form.
 */
export function computeRentEstimate(
  listing: Pick<
    EquipmentListing,
    | "pricePerDay"
    | "pricePerWeek"
    | "pricePerMonth"
    | "depositRequired"
    | "depositAmount"
    | "operatorChargePerDay"
  >,
  opts: {
    startDate: string;
    endDate: string;
    operator: boolean;
    delivery: boolean;
  },
): RentEstimate | null {
  const rentalDays = rentalDaysBetween(opts.startDate, opts.endDate);
  if (rentalDays <= 0) return null;

  const day = Number(listing.pricePerDay) || 0;
  const week = Number(listing.pricePerWeek) || 0;
  const month = Number(listing.pricePerMonth) || 0;

  let ratePeriod: RentEstimate["ratePeriod"];
  let unitPrice: number;
  let units: number;

  if (month > 0 && rentalDays >= 30) {
    ratePeriod = "month";
    unitPrice = month;
    units = Math.ceil(rentalDays / 30);
  } else if (week > 0 && rentalDays >= 7) {
    ratePeriod = "week";
    unitPrice = week;
    units = Math.ceil(rentalDays / 7);
  } else if (day > 0) {
    ratePeriod = "day";
    unitPrice = day;
    units = rentalDays;
  } else if (week > 0) {
    ratePeriod = "week";
    unitPrice = week;
    units = Math.ceil(rentalDays / 7);
  } else if (month > 0) {
    ratePeriod = "month";
    unitPrice = month;
    units = Math.ceil(rentalDays / 30);
  } else {
    ratePeriod = "day";
    unitPrice = 0;
    units = rentalDays;
  }

  const subtotal = unitPrice * units;
  const depositAmount = listing.depositRequired
    ? Number(listing.depositAmount) || 0
    : 0;
  const operatorCharge =
    opts.operator && listing.operatorChargePerDay
      ? (Number(listing.operatorChargePerDay) || 0) * rentalDays
      : 0;
  // Delivery fee depends on distance — the owner confirms it on acceptance.
  const deliveryFee = 0;

  const estimatedTotal = subtotal + depositAmount + operatorCharge + deliveryFee;

  return {
    rentalDays,
    ratePeriod,
    unitPrice,
    subtotal,
    depositAmount,
    operatorCharge,
    deliveryFee,
    estimatedTotal,
  };
}

/** ₦ formatter used across the rent UI. */
export function formatNaira(value: number): string {
  return `₦${Math.round(value).toLocaleString()}`;
}
