"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * The three roles that actually exist in the system, each led by a photograph
 * of the person rather than an icon. Icons would be cheaper and colder; this
 * page is for people who want to see people.
 */
const audiences = [
  {
    title: "You grow or trade",
    image: "/images/stakeholder-farmer.jpg",
    body: "See what your crop is fetching across the country, set the price you're waiting for, and get a message the moment it arrives.",
    href: "/intelligence",
    link: "See the prices",
  },
  {
    title: "You own machinery",
    image: "/images/stakeholder-owner.jpg",
    body: "Put your idle tractor to work. You set the rate, the deposit and the terms, and you approve every request yourself.",
    href: "/marketplace",
    link: "See the marketplace",
  },
  {
    title: "You know the markets",
    image: "/images/stakeholder-agent.jpg",
    body: "Collect prices where you already are, and help owners get listed. We're not onboarding agents yet — tell us your area and it could be the one we open next.",
    href: "/agents",
    link: "Join the agent waitlist",
  },
];

export function WhoItsFor() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>Who it&rsquo;s for</Kicker>
          <Display className="mt-5">
            Built for the people who <Warm>actually grow it</Warm>
          </Display>
          <Lede className="mt-6">
            Whether you farm, trade, own a tractor or know every price in your
            area — there&rsquo;s a way in.
          </Lede>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={staggerGrid(reduced)}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {audiences.map((audience) => (
            <motion.li key={audience.title} variants={sectionReveal(reduced)}>
              <Link
                href={audience.href}
                className="group block focus-visible:outline-none"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-[22px]">
                  <Image
                    src={audience.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="mt-6 font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-bark">
                  {audience.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-bark-soft">
                  {audience.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-leaf">
                  {audience.link}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </Wrap>
    </section>
  );
}
