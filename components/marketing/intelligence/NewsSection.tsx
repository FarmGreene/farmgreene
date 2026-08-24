"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useNews } from "@/lib/hooks/useNews";
import { REVEAL_VIEWPORT, staggerGrid, sectionReveal } from "@/lib/motion/marketing";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * Real articles from the aggregated agriculture feed. The lead story gets its
 * image; the rest are a list, because most feed images are stock and repeating
 * them at size makes the section look padded.
 *
 * Renders nothing when the feed is empty rather than showing sample headlines.
 */
export function NewsSection() {
  const reduced = useReducedMotion() ?? false;
  const { data, isLoading } = useNews();

  const articles = (data?.articles ?? []).slice(0, 5);
  const [lead, ...rest] = articles;

  if (!isLoading && articles.length === 0) return null;

  return (
    <section className="bg-field py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>Context</Kicker>
          <Display className="mt-5">
            The news that <Warm>moves the numbers</Warm>
          </Display>
          <Lede className="mt-6">
            Farming and food-policy coverage gathered from dedicated sources
            and refreshed daily.
          </Lede>
        </div>

        {isLoading ? (
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr]" aria-hidden="true">
            <div className="aspect-[16/10] animate-pulse rounded-[24px] bg-field-2" />
            <ul className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <li
                  key={i}
                  className="h-4 w-3/4 animate-pulse rounded-full bg-field-2"
                />
              ))}
            </ul>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={REVEAL_VIEWPORT}
            variants={staggerGrid(reduced)}
            className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14"
          >
            {lead && (
              <motion.a
                variants={sectionReveal(reduced)}
                href={lead.link}
                target="_blank"
                rel="noreferrer"
                className="group block focus-visible:outline-none"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-field-2">
                  <Image
                    src={lead.image ?? "/images/news/news-1.png"}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                  />
                </div>
                <span className="mt-5 block font-data text-[11px] uppercase tracking-[0.16em] text-leaf">
                  {lead.source}
                </span>
                <h3 className="mt-2 font-display text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
                  {lead.title}
                </h3>
                {lead.snippet && (
                  <p className="mt-3 line-clamp-2 text-[15px] leading-[1.6] text-bark-soft">
                    {lead.snippet}
                  </p>
                )}
              </motion.a>
            )}

            <ul className="divide-y divide-bark/10 border-t border-bark/10">
              {rest.map((article) => (
                <motion.li key={article.link} variants={sectionReveal(reduced)}>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group block py-5 focus-visible:outline-none"
                  >
                    <span className="font-data text-[10.5px] uppercase tracking-[0.16em] text-bark-soft">
                      {article.source}
                    </span>
                    <h3 className="mt-1.5 text-[16px] font-medium leading-snug text-bark underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-leaf group-focus-visible:decoration-leaf">
                      {article.title}
                    </h3>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </Wrap>
    </section>
  );
}
