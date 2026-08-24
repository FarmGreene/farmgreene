"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Kicker, Action } from "@/components/marketing/ui";
import { cn } from "@/lib/utils";

/**
 * Two alternating image blocks rather than a grid of icon cards. Each one is a
 * real capability described in plain terms, shown next to a photograph of the
 * situation it belongs to.
 */
const blocks = [
  {
    kicker: "Prices & alerts",
    title: (
      <>
        Stop selling <Warm>on a guess</Warm>
      </>
    ),
    body: "Follow the crops that matter to you and see where the price has actually been — day by day, week by week, region by region. Tell us the number you're waiting for and we'll send word by email and in the app when it gets there, outside your quiet hours, once a day at most.",
    points: [
      "Daily, weekly and yearly price history",
      "Prices broken down by region",
      "Alerts when your target is reached",
    ],
    image: "/images/mission-collaboration.png",
    alt: "Farmers looking at prices together on a tablet",
    href: "/intelligence",
    cta: "See market prices",
  },
  {
    kicker: "Equipment",
    title: (
      <>
        The machine you need, <Warm>only for the days you need it</Warm>
      </>
    ),
    body: "A tractor you use six weeks a year is expensive to own. Rent one from an owner nearby, see the full cost including deposit and delivery before you commit, and let the owner confirm the dates. Own machinery already? List it and let it earn while it sits.",
    points: [
      "See the full cost before you request",
      "Owners accept or decline your dates",
      "List your own in six short steps",
    ],
    image: "/images/field-challenge.png",
    alt: "A farmer standing with his tractor at the edge of a field",
    href: "/marketplace",
    cta: "See the marketplace",
  },
];

export function WhatYouGet() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field-2 py-20 md:py-28">
      <Wrap>
        <div className="space-y-24 md:space-y-32">
          {blocks.map((block, i) => (
            <motion.div
              key={block.kicker}
              initial="hidden"
              whileInView="visible"
              viewport={REVEAL_VIEWPORT}
              variants={sectionReveal(reduced)}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={cn(i % 2 === 1 && "lg:order-2")}>
                <Kicker>{block.kicker}</Kicker>
                <Display className="mt-5">{block.title}</Display>
                <Lede className="mt-6">{block.body}</Lede>

                <ul className="mt-8 space-y-3.5">
                  {block.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-[15px] text-bark"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[3px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-soft"
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12">
                          <path
                            d="M2.5 6.2 L5 8.6 L9.5 3.6"
                            fill="none"
                            stroke="#049878"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <Action
                  href={block.href}
                  variant="outline"
                  className="mt-9"
                >
                  {block.cta}
                </Action>
              </div>

              <div className={cn(i % 2 === 1 && "lg:order-1")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_28px_70px_-32px_rgba(4,35,29,0.4)]">
                  <Image
                    src={block.image}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
