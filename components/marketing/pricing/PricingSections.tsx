"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Tag, Kicker, Action } from "@/components/marketing/ui";

/**
 * Early-access pricing.
 *
 * This page previously advertised four tiers at ₦5,000 and ₦20,000 a month,
 * plus Workspaces and a TradingView integration. None of those features exist,
 * and there is no payment flow anywhere in the product — so the page quoted
 * prices nobody could pay for things nobody could use. It now says the one true
 * thing: everything is free right now, and here's roughly what will eventually
 * sit behind a plan. No figures and no dates, because neither has been decided.
 *
 * There is deliberately no pricing table. A table with one column and no prices
 * in it is a table pretending to be a decision.
 */

const included = [
  "Daily commodity prices across every region",
  "Full price history — daily, weekly and yearly",
  "Regional breakdowns and price-spike detection",
  "Watchlists and price alerts by email and in-app",
  "The daily market brief, with its sources",
  "Per-commodity written analysis",
  "Custom reports, saved and downloadable as PDF",
  "The equipment marketplace, renting and listing",
];

const later = [
  {
    title: "Heavier report volume",
    body: "Written analysis costs real money per report. Checking in stays free; sustained heavy use is the most likely first thing to sit behind a plan.",
  },
  {
    title: "Deeper history",
    body: "Longer lookback windows and bulk export of the underlying price series, for people doing serious analysis rather than checking a number.",
  },
  {
    title: "Team workspaces",
    body: "Shared watchlists and reports for organisations with several people working the same markets. Not built yet — this one is genuinely still a plan.",
  },
];

export function PricingHero() {
  const reduced = useReducedMotion() ?? false;

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
            <Tag>No card, no countdown</Tag>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Display as="h1" className="mt-8">
              Free while we&rsquo;re in <Warm>early access</Warm>
            </Display>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Lede className="mt-7 max-w-xl">
              No trial running down, and nothing held back to make a point.
              We&rsquo;re still working out what this is worth to people, and
              the fastest way to find that out is to let you use the whole thing
              first.
            </Lede>
          </motion.div>

          <motion.div
            variants={sectionReveal(reduced)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Action href="/signup">Start free</Action>
            <Action href="/intelligence" variant="outline">
              See the market
            </Action>
          </motion.div>
        </motion.div>
      </Wrap>
    </section>
  );
}

export function WhatsIncluded() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field-2 py-20 md:py-28">
      <Wrap>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>Right now</Kicker>
            <Display className="mt-5">
              Everything, <Warm>for everyone</Warm>
            </Display>
            <Lede className="mt-6">
              This is the whole product as it stands today. All of it, at no
              cost, on every account — no tiers, no seats, no feature waiting
              behind an upgrade.
            </Lede>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={REVEAL_VIEWPORT}
              variants={staggerGrid(reduced)}
              className="mt-9 space-y-3.5"
            >
              {included.map((item) => (
                <motion.li
                  key={item}
                  variants={sectionReveal(reduced)}
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
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={sectionReveal(reduced)}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_28px_70px_-32px_rgba(4,35,29,0.4)]">
              <Image
                src="/images/mission-collaboration.png"
                alt="A group of farmers looking at prices together on a tablet"
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

export function WhatComesLater() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>Eventually</Kicker>
          <Display className="mt-5">
            What will <Warm>probably cost money</Warm>
          </Display>
          <Lede className="mt-6">
            Being straight about it now: some of what we do has a real per-use
            cost and can&rsquo;t stay free forever. Nothing below has a price or
            a date — when it does, you&rsquo;ll hear it from us long before you
            see it on a bill.
          </Lede>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={staggerGrid(reduced)}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {later.map((item) => (
            <motion.li
              key={item.title}
              variants={sectionReveal(reduced)}
              className="rounded-[22px] border border-bark/10 bg-white p-7"
            >
              <span className="font-data text-[11px] uppercase tracking-[0.16em] text-bark-soft">
                Planned
              </span>
              <h3 className="mt-4 font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-bark-soft">
                {item.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={sectionReveal(reduced)}
          className="mt-12 rounded-[24px] border border-leaf/20 bg-leaf-tint p-8 md:p-10"
        >
          <h3 className="font-display text-[1.4rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
            Tell us what you&rsquo;d pay for
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-bark-soft">
            That feedback genuinely decides what gets priced and what stays
            free. Say what&rsquo;s worth money to you and we&rsquo;ll let you
            know before anything changes.
          </p>
          <Action href="/contact" variant="outline" className="mt-7">
            Send us a note
          </Action>
        </motion.div>
      </Wrap>
    </section>
  );
}
