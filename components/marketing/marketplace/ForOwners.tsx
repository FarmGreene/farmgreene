"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Kicker, Action } from "@/components/marketing/ui";

/** The real six steps of the listing wizard, in the order you meet them. */
const steps = [
  "What it is — type, make, model, year",
  "Specifications, condition and service history",
  "Your rates by day, week or month",
  "Where it lives, delivery radius, when it's available",
  "Photos, plus proof you own it",
  "Look it over, then publish",
];

export function ForOwners() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field-2 py-20 md:py-28">
      <Wrap>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <Kicker>For owners</Kicker>
            <Display className="mt-5">
              Idle machinery is just <Warm>expensive metal</Warm>
            </Display>
            <Lede className="mt-6">
              Put yours on the platform in six steps. You set the rates, the
              shortest rental, the deposit and whether it goes out with an
              operator — and every request comes to you to accept or turn down.
            </Lede>

            <motion.ol
              initial="hidden"
              whileInView="visible"
              viewport={REVEAL_VIEWPORT}
              variants={staggerGrid(reduced)}
              className="mt-9"
            >
              {steps.map((step, i) => (
                <motion.li
                  key={step}
                  variants={sectionReveal(reduced)}
                  className="flex items-center gap-4 border-b border-bark/10 py-3.5 last:border-0"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-soft font-data text-[11px] font-semibold tabular-nums text-leaf-deep">
                    {i + 1}
                  </span>
                  <span className="text-[15px] text-bark">{step}</span>
                </motion.li>
              ))}
            </motion.ol>

            <p className="mt-7 text-[15px] leading-[1.65] text-bark-soft">
              Every listing is reviewed before it appears publicly. If the
              paperwork isn&rsquo;t your thing, get in touch and we&rsquo;ll set
              it up on your behalf.
            </p>

            <Action href="/signup" className="mt-8">
              List your equipment
            </Action>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={sectionReveal(reduced)}
            className="lg:order-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_28px_70px_-32px_rgba(4,35,29,0.4)]">
              <Image
                src="/images/field-challenge.png"
                alt="A farmer standing with his tractor at the edge of a field"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Wrap>
    </section>
  );
}
