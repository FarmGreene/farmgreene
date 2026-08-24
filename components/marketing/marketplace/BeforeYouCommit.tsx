"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { usePublicListings } from "@/lib/hooks/usePublicListings";
import { REVEAL_VIEWPORT, sectionReveal } from "@/lib/motion/marketing";
import { formatNaira } from "@/components/marketing/shared/Figure";
import { headlineRate, amount } from "@/lib/marketplace/listing-display";
import type { PublicListing } from "@/types/marketplace";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * The terms panel is not a mockup — it's the real terms an owner set on a real
 * listing, read from the same public endpoint the detail page uses, and it
 * links through to that listing. A row only appears when the field behind it
 * is actually set, so the panel is short on a sparsely-filled listing rather
 * than padded out with invented conditions.
 */
export function BeforeYouCommit() {
  const reduced = useReducedMotion() ?? false;
  const { data } = usePublicListings(12);
  const listing = data?.[0] ?? null;

  if (!listing) return null;

  const terms = buildTerms(listing);
  if (terms.length === 0) return null;

  return (
    <section className="bg-field py-20 md:py-28">
      <Wrap>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <Kicker>Before you commit</Kicker>
            <Display className="mt-5">
              The whole cost, <Warm>up front</Warm>
            </Display>
            <Lede className="mt-6">
              Choose your dates and you see the full bill before you send
              anything — the rate, the deposit, the operator charge, the
              delivery. That breakdown is saved with your request, so the terms
              can&rsquo;t quietly change after the fact.
            </Lede>
            <p className="mt-6 text-[15px] leading-[1.65] text-bark-soft">
              Farmgreene doesn&rsquo;t take payment or hold your money. We
              introduce you to the owner and record what was agreed; the money
              is between the two of you.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={sectionReveal(reduced)}
            className="rounded-[24px] border border-bark/10 bg-white p-7 shadow-[0_28px_70px_-40px_rgba(4,35,29,0.45)]"
          >
            <span className="font-data text-[11px] uppercase tracking-[0.16em] text-bark-soft">
              Terms set by the owner
            </span>
            <h3 className="mt-2 font-display text-[1.4rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
              {listing.name}
            </h3>

            <dl className="mt-6">
              {terms.map((term) => (
                <div
                  key={term.label}
                  className="flex items-baseline justify-between gap-6 border-b border-bark/8 py-3.5 last:border-0"
                >
                  <dt className="text-[14px] text-bark-soft">{term.label}</dt>
                  <dd className="font-data text-[15px] font-medium tabular-nums text-bark">
                    {term.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href={`/marketplace/${listing.id}`}
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-leaf transition-colors hover:text-leaf-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
            >
              See the full listing
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M2 7 h9 M7.5 3 L11.5 7 L7.5 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </Wrap>
    </section>
  );
}

/** Every row here maps to a field the owner filled in on the listing wizard. */
function buildTerms(listing: PublicListing): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];

  const rate = headlineRate(listing);
  if (rate) {
    rows.push({ label: "Rate", value: `${formatNaira(rate.amount)} / ${rate.period}` });
  }

  const deposit = amount(listing.depositAmount);
  if (listing.depositRequired && deposit) {
    rows.push({ label: "Deposit", value: formatNaira(deposit) });
  } else if (listing.depositRequired === false) {
    rows.push({ label: "Deposit", value: "None" });
  }

  if (listing.minRentalDays) {
    rows.push({
      label: "Shortest rental",
      value: dayCount(listing.minRentalDays),
    });
  }
  if (listing.maxRentalDays) {
    rows.push({
      label: "Longest rental",
      value: dayCount(listing.maxRentalDays),
    });
  }

  const operatorCharge = amount(listing.operatorChargePerDay);
  if (listing.includesOperator) {
    rows.push({ label: "Operator", value: "Included" });
  } else if (operatorCharge) {
    rows.push({
      label: "Operator",
      value: `${formatNaira(operatorCharge)} / day`,
    });
  } else if (listing.includesOperator === false) {
    rows.push({ label: "Operator", value: "Not offered" });
  }

  if (listing.deliveryAvailable) {
    const fee = amount(listing.deliveryFeePerKm);
    rows.push({
      label: "Delivery",
      value: fee ? `${formatNaira(fee)} / km` : "Available",
    });
  } else if (listing.deliveryAvailable === false) {
    rows.push({ label: "Delivery", value: "Collection only" });
  }

  if (listing.advanceBookingDays) {
    rows.push({
      label: "Notice needed",
      value: dayCount(listing.advanceBookingDays),
    });
  }

  if (listing.cancellationPolicy) {
    rows.push({
      label: "Cancellation",
      value:
        listing.cancellationPolicy.charAt(0).toUpperCase() +
        listing.cancellationPolicy.slice(1),
    });
  }

  return rows;
}

function dayCount(days: number): string {
  return `${days} ${days === 1 ? "day" : "days"}`;
}
