"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

const principles = [
  {
    title: "People, not scrapers",
    body: "Every price is recorded by a verified agent against an assigned crop and area — today that's mostly one person walking markets himself. It's slower than scraping a website, and it's the only way to know a number came from a real market on a real day.",
  },
  {
    title: "Nothing publishes unreviewed",
    body: "Every submission arrives pending and is approved or rejected before it counts. One mistaken entry shouldn't be able to move a published average.",
  },
  {
    title: "Show the working",
    body: "Where we write analysis, it's built from those same approved numbers and carries the sources it drew on. If we can't ground a claim, we don't make it.",
  },
  {
    title: "Say what isn't built yet",
    body: "We'd rather show you a smaller product that's entirely real than a bigger one that's mostly screenshots. Anything still coming is labelled as such.",
  },
];

export function HowWeBuildIt() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field-2 py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>How we build it</Kicker>
          <Display className="mt-5">
            Ground truth, <Warm>or nothing</Warm>
          </Display>
          <Lede className="mt-6">
            Four rules we hold ourselves to. They cost us speed, and they&rsquo;re
            the reason the numbers are worth anything.
          </Lede>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={sectionReveal(reduced)}
          className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[24px] shadow-[0_28px_70px_-32px_rgba(4,35,29,0.4)] md:aspect-[16/7]"
        >
          <Image
            src="/images/stakeholder-agent.jpg"
            alt="A field agent recording prices at a market"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={staggerGrid(reduced)}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {principles.map((principle) => (
            <motion.li
              key={principle.title}
              variants={sectionReveal(reduced)}
              className="rounded-[22px] border border-bark/10 bg-white p-7"
            >
              <h3 className="font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
                {principle.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-bark-soft">
                {principle.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Wrap>
    </section>
  );
}
