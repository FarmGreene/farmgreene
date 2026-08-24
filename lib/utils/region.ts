import { REGION_LABELS, NigerianRegion } from "@/types/commodity";

/** Given a commodity's regional price breakdown, returns the label of the
 * region with the highest average price, or null if there's no data. */
export function getHighestPricedRegion(
  regionalBreakdown: Record<string, number> | undefined | null,
): string | null {
  if (!regionalBreakdown) return null;
  const entries = Object.entries(regionalBreakdown);
  if (entries.length === 0) return null;

  const [region] = entries.reduce((max, cur) => (cur[1] > max[1] ? cur : max));
  return REGION_LABELS[region as NigerianRegion] ?? region;
}
