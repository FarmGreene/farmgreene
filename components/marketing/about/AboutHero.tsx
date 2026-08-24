"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Tag } from "@/components/marketing/ui";

export function AboutHero() {
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
            <Tag>Why Farmgreene exists</Tag>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Display as="h1" className="mt-8">
              A market works better when{" "}
              <Warm>everyone can see the price</Warm>
            </Display>
          </motion.div>

          <motion.div variants={sectionReveal(reduced)}>
            <Lede className="mt-7 max-w-xl">
              We&rsquo;re closing the gap between the people who grow food and
              the people who buy it. The slow, unglamorous way: put people in
              markets, write down what things actually cost, publish it.
            </Lede>
          </motion.div>
        </motion.div>
      </Wrap>

      <Wrap className="mt-16">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 30 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
          className="grid gap-4 lg:grid-cols-[1.5fr_1fr]"
        >
          <div className="photo-veil relative aspect-[16/11] overflow-hidden rounded-[28px] lg:aspect-[16/10]">
            <Image
              src="/images/about-hero.png"
              alt="Farmland worked at first light"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <p className="absolute bottom-6 left-6 right-6 font-data text-[11px] uppercase tracking-[0.16em] text-white/80">
              Where the numbers start
            </p>
          </div>

          <div className="photo-veil relative aspect-[4/3] overflow-hidden rounded-[28px] lg:aspect-auto lg:h-full">
            <Image
              src="/images/stakeholder-farmer.jpg"
              alt="Farmers standing together in their cabbage field"
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </Wrap>
    </section>
  );
}
