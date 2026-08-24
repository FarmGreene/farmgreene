"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { usePublicListings } from "@/lib/hooks/usePublicListings";
import { sectionReveal } from "@/lib/motion/marketing";
import { formatNaira } from "@/components/marketing/shared/Figure";
import { headlineRate, listingLocation } from "@/lib/marketplace/listing-display";
import { Wrap, Display, Warm, Lede, Tag, Action } from "@/components/marketing/ui";

/**
 * Same composition as the landing hero — photography carrying the warmth, a
 * real figure pinned onto it — except here the pinned card is an actual
 * machine somebody has listed, linking straight through to it.
 *
 * No headline count of listings. The marketplace is early and a volume number
 * would be both unimpressive and beside the point; the section below states
 * plainly what's there.
 */
export function MarketplaceHero() {
  const reduced = useReducedMotion() ?? false;
  const { data } = usePublicListings(12);
  const featured = data?.[0] ?? null;
  const rate = featured ? headlineRate(featured) : null;
  const location = featured ? listingLocation(featured) : null;

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
            <Tag>Free while we&rsquo;re in early access</Tag>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Display as="h1" className="mt-8">
              Use the tractor. <Warm>Skip the loan.</Warm>
            </Display>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Lede className="mt-7 max-w-xl">
              A machine you need six weeks a year is a hard thing to justify
              buying. Rent one from an owner nearby for the days you&rsquo;ll
              actually use it — and if yours spends most of the year parked,
              put it to work for somebody else.
            </Lede>
          </motion.div>

          <motion.div
            variants={sectionReveal(reduced)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Action href="/signup">List your equipment</Action>
            <Action href="#available" variant="outline">
              See what&rsquo;s available
            </Action>
          </motion.div>
        </motion.div>
      </Wrap>

      <Wrap className="mt-16">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 30 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
        >
          <div className="photo-veil relative aspect-[16/11] overflow-hidden rounded-[28px] md:aspect-[16/8]">
            <Image
              src="/images/stakeholder-owner.jpg"
              alt="An equipment owner standing beside his tractor"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />

            {featured && (
              <Link
                href={`/marketplace/${featured.id}`}
                className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-[0_18px_44px_-18px_rgba(4,35,29,0.55)] backdrop-blur-sm transition-colors hover:border-leaf/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf sm:right-auto sm:w-[21rem]"
              >
                <span className="font-data text-[10px] uppercase tracking-[0.18em] text-bark-soft">
                  Listed now
                </span>
                <p className="mt-2 text-[17px] font-semibold leading-snug text-bark">
                  {featured.name}
                </p>
                {location && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-bark-soft">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{location}</span>
                  </p>
                )}
                {rate && (
                  <p className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-data text-[24px] font-semibold tabular-nums text-bark">
                      {formatNaira(rate.amount)}
                    </span>
                    <span className="font-data text-[12px] text-bark-soft">
                      per {rate.period}
                    </span>
                  </p>
                )}
              </Link>
            )}
          </div>
        </motion.div>
      </Wrap>
    </section>
  );
}
