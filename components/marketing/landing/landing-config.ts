/**
 * Which commodity the landing page's price chart features.
 *
 * Set NEXT_PUBLIC_LANDING_COMMODITY_SLUG to any commodity slug to change it
 * without touching code.
 */
export const LANDING_COMMODITY_SLUG =
  process.env.NEXT_PUBLIC_LANDING_COMMODITY_SLUG?.trim() || "onions";

/**
 * Used only when the configured commodity can't fill a chart.
 *
 * Worth knowing before changing either of these: a full 52 weeks of history is
 * not the same as a chart worth showing. Weekly history comes from the
 * weekly-price-backfill job, and coverage is uneven — at the time of writing
 * about half the catalogue has a full year at all, and several that do are
 * effectively flat.
 *
 * Measured across the catalogue:
 *   onions    52 weeks, 9 distinct values  — a real declining trend
 *   oil-palm  52 weeks, 9 distinct values  — flat with a mid-year step
 *   millet    52 weeks, 10 distinct values — flat, then one spike at the end
 *   maize     52 weeks, 2 distinct values  — a flat line and one cliff
 *   beans      1 week                      — cannot draw a line at all
 *
 * Onions leads because its series actually moves over the year. Prefer a
 * commodity with spread-out values over one that merely has enough rows.
 */
export const LANDING_COMMODITY_FALLBACK_SLUG = "oil-palm";

/** Weeks of history behind the chart. 52 = one year. */
export const LANDING_CHART_WEEKS = 52;

/** A line needs at least two points to be a line. */
export const MIN_CHART_POINTS = 2;
