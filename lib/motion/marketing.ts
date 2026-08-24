import type { Variants, Transition } from "motion/react";

/**
 * Shared motion vocabulary for the public marketing site.
 *
 * The design spends its motion budget in one place — the price board settling
 * on load, like a departure board. Everything else is a quiet reveal. Consumers
 * pass `reduced` (from `useReducedMotion()`) so every variant collapses to a
 * no-op rather than each component re-implementing the guard.
 */

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

/** Container for the board: staggers its rows so they land in sequence. */
export function boardContainer(reduced: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: reduced
        ? {}
        : { staggerChildren: 0.045, delayChildren: 0.12 },
    },
  };
}

/** A single board row settling into place. */
export function boardRow(reduced: boolean): Variants {
  return {
    hidden: reduced ? {} : { opacity: 0, y: 8 },
    visible: reduced
      ? {}
      : { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  };
}

/** Standard scroll-triggered section reveal: fade plus a short rise. */
export function sectionReveal(reduced: boolean, delay = 0): Variants {
  return {
    hidden: reduced ? {} : { opacity: 0, y: 12 },
    visible: reduced
      ? {}
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        },
  };
}

/** Staggered container for grids of cards. */
export function staggerGrid(reduced: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: reduced ? {} : { staggerChildren: 0.08 },
    },
  };
}

/** Viewport config shared by every scroll reveal — fire once, slightly early. */
export const REVEAL_VIEWPORT = { once: true, margin: "-80px" } as const;
