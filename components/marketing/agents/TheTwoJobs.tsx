"use client";

import { motion, useReducedMotion } from "motion/react";
import { ClipboardList, Handshake } from "lucide-react";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * The two things an agent account can genuinely do today, both backed by real
 * endpoints: price submission against assignments, and onboarding off-platform
 * equipment owners. Described in the present tense because the software is
 * built and in use — it's the hiring that's waiting on money, not the tooling.
 */
const jobs = [
  {
    icon: ClipboardList,
    title: "Record market prices",
    body: "You're assigned a crop, a region and a market, with a due date and how often it repeats. You go, you check, you submit what you see — price, place, and the day you saw it.",
    points: [
      "Assignments arrive in your dashboard with their deadlines",
      "Submit from your phone while you're still at the market",
      "Watch how many you've submitted and how many were approved",
    ],
  },
  {
    icon: Handshake,
    title: "Onboard equipment owners",
    body: "Plenty of people with idle machinery will never sign up on their own. You find them, and you build the listing on their behalf.",
    points: [
      "Create a listing for an owner who isn't on the platform",
      "Add the photos and the details from where you're standing",
      "Submit it for review, and track what you've onboarded",
    ],
  },
];

export function TheTwoJobs() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field-2 py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>The work</Kicker>
          <Display className="mt-5">
            Two jobs, both <Warm>out in the field</Warm>
          </Display>
          <Lede className="mt-6">
            Neither of them happens at a desk, and both of them are already
            built into the app — assignments, submissions, review and all.
          </Lede>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={staggerGrid(reduced)}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {jobs.map(({ icon: Icon, title, body, points }) => (
            <motion.li
              key={title}
              variants={sectionReveal(reduced)}
              className="rounded-[22px] border border-bark/10 bg-white p-7 md:p-9"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-leaf-soft">
                <Icon
                  className="h-5 w-5 text-leaf-deep"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-6 font-display text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-bark-soft">
                {body}
              </p>
              <ul className="mt-7 space-y-3 border-t border-bark/10 pt-6">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[14px] leading-snug text-bark"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-sun"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </Wrap>
    </section>
  );
}
