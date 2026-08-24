"use client";

import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { getAgentAction } from "./agent-app";
import { AgentWaitlistForm } from "./AgentWaitlistForm";
import { Wrap, Display, Warm, Lede, Kicker, Action } from "@/components/marketing/ui";

/**
 * Two versions of the same sequence. While onboarding is closed the first step
 * is the waitlist and the second is the honest reason there's a wait; once the
 * agent app is deployed it collapses back to a straight application flow.
 */
const waitlistSteps = [
  {
    title: "Tell us your area",
    body: "Which state, and which markets you could realistically get to. That's the part that decides where we open first — we'd rather start where somebody is already standing.",
  },
  {
    title: "We open your area when we can pay for it",
    body: "This is field work and it should be paid like field work. Rather than ask people to collect for free, we're opening areas as the money allows. It's the honest reason for the wait.",
  },
  {
    title: "You get verified",
    body: "Applications are reviewed one at a time. Agents are the source of everything on the platform, so this step isn't a formality.",
  },
  {
    title: "Assignments start arriving",
    body: "A crop, a market, a due date. Submit what you record, and your approval rate builds as your entries pass review.",
  },
];

const openSteps = [
  {
    title: "Apply",
    body: "Tell us who you are and the area you can realistically cover. Applications are handled individually while the network is still small.",
  },
  {
    title: "Get verified",
    body: "We review your application before you're activated. Agents are the source of everything on the platform, so this step isn't a formality.",
  },
  {
    title: "Start collecting",
    body: "Assignments appear in your dashboard. Submit what you record, and your approval rate builds as your entries pass review.",
  },
];

export function GettingStarted() {
  const reduced = useReducedMotion() ?? false;
  const action = getAgentAction();
  const steps = action.waitlist ? waitlistSteps : openSteps;

  return (
    <section id="waitlist" className="scroll-mt-24 bg-field py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>{action.waitlist ? "What happens next" : "Getting started"}</Kicker>
          <Display className="mt-5">
            {action.waitlist ? (
              <>
                How you&rsquo;ll <Warm>hear from us</Warm>
              </>
            ) : (
              <>
                Three steps to your <Warm>first assignment</Warm>
              </>
            )}
          </Display>
          {action.waitlist && (
            <Lede className="mt-6">
              No form that goes nowhere, and no promise of a start date we
              can&rsquo;t keep. Just a note to a person who reads it.
            </Lede>
          )}
        </div>

        <div
          className={
            action.waitlist
              ? "mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
              : "mt-12"
          }
        >
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={staggerGrid(reduced)}
            className={action.waitlist ? undefined : "max-w-3xl"}
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
                  <p className="mt-2.5 text-[15px] leading-[1.65] text-bark-soft">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {action.waitlist ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={REVEAL_VIEWPORT}
              variants={sectionReveal(reduced)}
              className="lg:pt-4"
            >
              <AgentWaitlistForm />
            </motion.div>
          ) : (
            <div className="mt-10">
              <Action href={action.href}>{action.label}</Action>
            </div>
          )}
        </div>
      </Wrap>
    </section>
  );
}
