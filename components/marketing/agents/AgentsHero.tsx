"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { sectionReveal } from "@/lib/motion/marketing";
import { getAgentAction } from "./agent-app";
import { Wrap, Display, Warm, Lede, Tag, Action } from "@/components/marketing/ui";

export function AgentsHero() {
  const reduced = useReducedMotion() ?? false;
  const action = getAgentAction();

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
            <Tag>{action.waitlist ? "Not open yet" : "Applications open"}</Tag>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Display as="h1" className="mt-8">
              Every price here starts with{" "}
              <Warm>somebody standing in a market</Warm>
            </Display>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Lede className="mt-7 max-w-xl">
              {action.waitlist ? (
                <>
                  Right now that somebody is the founder, walking markets
                  himself. Agents are how this gets bigger than one person — and
                  we&rsquo;ll open areas as soon as we can pay properly for the
                  work. Tell us where you are and we&rsquo;ll come to you first.
                </>
              ) : (
                <>
                  Agents are how this platform knows anything. You take
                  assignments in your own area, record what things actually
                  cost, and help equipment owners get listed. The data everybody
                  else reads is the data you collect.
                </>
              )}
            </Lede>
          </motion.div>

          <motion.div
            variants={sectionReveal(reduced)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Action href={action.href}>{action.label}</Action>
            <Action href="/intelligence" variant="outline">
              See the data you&rsquo;d collect
            </Action>
          </motion.div>
        </motion.div>
      </Wrap>

      <Wrap className="mt-16">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 30 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
          className="photo-veil relative aspect-[16/11] overflow-hidden rounded-[28px] md:aspect-[16/8]"
        >
          <Image
            src="/images/stakeholder-agent.jpg"
            alt="An agent recording commodity prices at a market"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <p className="absolute bottom-6 left-6 right-6 font-data text-[11px] uppercase tracking-[0.16em] text-white/80">
            The job, as it actually looks
          </p>
        </motion.div>
      </Wrap>
    </section>
  );
}
