"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Kicker, Action } from "@/components/marketing/ui";

/**
 * The written-analysis section, described honestly.
 *
 * Specific about cadence and sourcing rather than implying continuous
 * omniscient coverage: the brief is daily and carries citations, per-commodity
 * analysis is cached for a week, and reports are generated on request. Anyone
 * who signs up can check all three, so overstating them would be pointless.
 */
const outputs = [
  {
    when: "Every morning",
    title: "The market brief",
    body: "A written read on what moved and why, written after the overnight averages settle — with the sources it drew on attached, so you can check the reasoning instead of taking it on faith.",
  },
  {
    when: "Weekly",
    title: "Crop by crop",
    body: "Open any commodity and find what's pushing its price, what's holding it up and what could knock it down, refreshed on a weekly cycle from that crop's own numbers.",
  },
  {
    when: "Whenever you ask",
    title: "Your own reports",
    body: "Pick a crop, a region and a stretch of time and get a report with the trend, the swings and a regional comparison. Keep it in your library or take it away as a PDF.",
  },
];

export function AnalysisSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field py-20 md:py-28">
      <Wrap>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Kicker>Reading the numbers</Kicker>
            <Display className="mt-5">
              Words attached to <Warm>the figures</Warm>
            </Display>
            <Lede className="mt-6">
              Analysis is written from the same approved prices you can see for
              yourself — and it tells you where it got its information.
            </Lede>

            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_28px_70px_-32px_rgba(4,35,29,0.4)]">
              <Image
                src="/images/mission-collaboration.png"
                alt="Farmers looking at prices together on a tablet"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={staggerGrid(reduced)}
            className="lg:pt-4"
          >
            {outputs.map((output) => (
              <motion.li
                key={output.title}
                variants={sectionReveal(reduced)}
                className="border-b border-bark/10 py-7 first:pt-0 last:border-0"
              >
                <span className="font-data text-[11px] uppercase tracking-[0.16em] text-leaf">
                  {output.when}
                </span>
                <h3 className="mt-3 font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-bark">
                  {output.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-bark-soft">
                  {output.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Wrap>
    </section>
  );
}

const rules = [
  {
    term: "Your price, your direction",
    def: "Set the number and say whether you want to hear about it going above or below. Pause an alert when it stops mattering; switch it back on when it does again.",
  },
  {
    term: "Email and in the app",
    def: "Both by default. Turn either off in your settings.",
  },
  {
    term: "Quiet hours",
    def: "Nothing reaches you between the hours you set aside — 10pm to 7am unless you change it.",
  },
  {
    term: "Once a day, at most",
    def: "If a price sits past your target for a week, you hear about it once — not every time the job runs.",
  },
];

export function AlertsSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field-2 py-20 md:py-28">
      <Wrap>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Kicker>Alerts</Kicker>
            <Display className="mt-5">
              Set the number once, then <Warm>get on with your day</Warm>
            </Display>
            <Lede className="mt-6">
              You shouldn&rsquo;t have to keep refreshing a price page to find
              out something changed.
            </Lede>
            <Action href="/signup" className="mt-9">
              Set your first alert
            </Action>
          </div>

          <motion.dl
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={staggerGrid(reduced)}
            className="rounded-[24px] border border-bark/10 bg-white p-8 md:p-10"
          >
            {rules.map((rule) => (
              <motion.div
                key={rule.term}
                variants={sectionReveal(reduced)}
                className="border-b border-bark/10 py-5 first:pt-0 last:border-0 last:pb-0"
              >
                <dt className="text-[15px] font-semibold text-bark">
                  {rule.term}
                </dt>
                <dd className="mt-2 text-[15px] leading-[1.6] text-bark-soft">
                  {rule.def}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </Wrap>
    </section>
  );
}
