"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * Numbered because it genuinely is a sequence — this is the real path a price
 * takes from a market to somebody's alert. Numbering anything unordered would
 * just be decoration.
 */
const steps = [
  {
    title: "Somebody goes to the market",
    body: "An agent is given a crop and an area, walks the market, and writes down the price being asked that day. Today that's usually the founder himself.",
  },
  {
    title: "It gets checked",
    body: "Every price arrives pending. Someone reviews it before it counts, so one wrong entry can't move the published average.",
  },
  {
    title: "It becomes the record",
    body: "Approved prices roll into the daily average, the regional breakdown, and the history behind every figure on this site.",
  },
  {
    title: "You hear about it",
    body: "If it crosses the price you're waiting for, an email and an in-app message follow — outside your quiet hours.",
  },
];

export function HowItWorks() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field-2 py-20 md:py-28">
      <Wrap>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Kicker>Where the numbers come from</Kicker>
            <Display className="mt-5">
              Nothing here was <Warm>scraped off the internet</Warm>
            </Display>
            <Lede className="mt-6">
              Every price on Farmgreene started with a person standing in a
              market, and passed a review before anyone saw it.
            </Lede>

            <div className="relative mt-10 aspect-[5/4] overflow-hidden rounded-[24px] shadow-[0_28px_70px_-32px_rgba(4,35,29,0.4)]">
              <Image
                src="/images/stakeholder-agent.jpg"
                alt="A field agent recording prices at a market"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={staggerGrid(reduced)}
            className="lg:pt-4"
          >
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                variants={sectionReveal(reduced)}
                className="flex gap-6 border-b border-bark/10 py-7 last:border-0"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-soft font-data text-[12px] font-semibold tabular-nums text-leaf-deep">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-bark-soft">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Wrap>
    </section>
  );
}
