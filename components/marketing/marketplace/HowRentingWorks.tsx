"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * Numbered because it genuinely is a sequence — this is the real lifecycle of
 * a rent request, ending where the product ends: at the introduction, not at a
 * payment the platform never handles.
 */
const steps = [
  {
    title: "Pick your dates",
    body: "Choose the days you need it. The cost builds as you go — rate, deposit, operator, delivery — so nothing arrives later as a surprise.",
  },
  {
    title: "Send the request",
    body: "Your dates and the full breakdown reach the owner together, and stay attached to the request as a record of what was asked.",
  },
  {
    title: "The owner replies",
    body: "They accept or decline, and can leave you a note. While it's still pending, you can withdraw it yourself.",
  },
  {
    title: "You arrange the rest",
    body: "Collection or delivery, and the money, are settled between you and the owner. Farmgreene makes the introduction and keeps the terms on record.",
  },
];

export function HowRentingWorks() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden bg-loam py-20 md:py-28">
      <div className="absolute inset-0">
        <Image
          src="/images/categories/harvesting.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-loam via-loam/95 to-loam/75" />
      </div>

      <Wrap className="relative">
        <div className="max-w-2xl">
          <Kicker onDark>Renting</Kicker>
          <Display className="mt-5 text-white">
            How a rental <Warm onDark>actually happens</Warm>
          </Display>
          <Lede onDark className="mt-6">
            Four steps between finding the machine and standing next to it, and
            a straight answer about where the platform stops.
          </Lede>
        </div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={staggerGrid(reduced)}
          className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <motion.li key={step.title} variants={sectionReveal(reduced)}>
              <div className="flex items-center gap-4">
                <span className="font-data text-[12px] font-semibold tabular-nums text-sun">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
              </div>
              <h3 className="mt-5 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-white/65">
                {step.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Wrap>
    </section>
  );
}
