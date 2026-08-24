"use client";

import { motion, useReducedMotion } from "motion/react";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { ContactForm } from "./ContactForm";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "./contact-details";
import { Wrap, Display, Warm, Lede, Tag, Kicker } from "@/components/marketing/ui";

export function ContactHero() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="morning-light relative overflow-hidden bg-field pt-14 pb-14 md:pt-20 md:pb-16">
      <Wrap>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-3xl"
        >
          <motion.div variants={sectionReveal(reduced)}>
            <Tag>Every message gets read</Tag>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Display as="h1" className="mt-8">
              Talk to <Warm>a person</Warm>
            </Display>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Lede className="mt-7 max-w-xl">
              Farmgreene is small enough that your message reaches somebody who
              can actually do something about it. Questions, problems, a market
              we should be covering — all of it is worth sending.
            </Lede>
          </motion.div>
        </motion.div>
      </Wrap>
    </section>
  );
}

export function ContactBody() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field-2 py-16 md:py-24">
      <Wrap>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={sectionReveal(reduced)}
            className="h-fit rounded-[24px] border border-leaf/20 bg-leaf-tint p-7 md:p-9"
          >
            <Kicker>Direct</Kicker>
            <h2 className="mt-4 font-display text-[1.6rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
              Reach us
            </h2>

            <dl className="mt-8 space-y-6">
              <div>
                <dt className="font-data text-[11px] uppercase tracking-[0.16em] text-bark-soft">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-[15px] font-medium text-leaf-deep underline decoration-1 decoration-leaf/40 underline-offset-[6px] transition-colors hover:decoration-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>

              {SOCIAL_LINKS.map((social) => (
                <div key={social.label}>
                  <dt className="font-data text-[11px] uppercase tracking-[0.16em] text-bark-soft">
                    {social.label}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[15px] font-medium text-leaf-deep underline decoration-1 decoration-leaf/40 underline-offset-[6px] transition-colors hover:decoration-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
                    >
                      {social.handle}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 border-t border-leaf/20 pt-6 text-[14px] leading-[1.65] text-bark-soft">
              We answer as quickly as we can. There&rsquo;s no support team
              behind this yet, so it&rsquo;s a person reading it, not a queue.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={sectionReveal(reduced)}
          >
            <ContactForm />
          </motion.div>
        </div>
      </Wrap>
    </section>
  );
}

const faqs = [
  {
    q: "Does it cost anything?",
    a: "No. Everything on the platform is free while we're in early access. When paid plans arrive, we'll say so clearly and well in advance.",
  },
  {
    q: "Where do the prices come from?",
    a: "They're recorded in markets against an assigned crop and area — today mostly by the founder himself. Every submission is reviewed before it counts toward a published average.",
  },
  {
    q: "How often do prices update?",
    a: "Averages are recalculated daily from approved submissions. How fresh a given crop is depends on how often somebody has been assigned to it.",
  },
  {
    q: "Does Farmgreene handle rental payments?",
    a: "No. The marketplace introduces renters and owners and records the agreed terms, including deposit and delivery. Money is settled directly between the two parties.",
  },
  {
    q: "Can I collect prices for you?",
    a: "Eventually, yes — that's the agent role, and it's built. We're not onboarding yet because we want to pay properly for the work. Tell us the area you could cover and we'll come to you when we open it.",
  },
];

export function ContactFAQ() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-field py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>Common questions</Kicker>
          <Display className="mt-5">
            Before you <Warm>write</Warm>
          </Display>
        </div>

        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          variants={staggerGrid(reduced)}
          className="mt-12 border-t border-bark/10"
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.q}
              variants={sectionReveal(reduced)}
              className="grid gap-3 border-b border-bark/10 py-7 md:grid-cols-[0.9fr_1.4fr] md:gap-12"
            >
              <dt className="text-[16px] font-semibold leading-snug text-bark">
                {faq.q}
              </dt>
              <dd className="text-[15px] leading-[1.65] text-bark-soft">
                {faq.a}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </Wrap>
    </section>
  );
}
