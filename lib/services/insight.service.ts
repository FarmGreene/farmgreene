import { apiClient } from "@/lib/api/axios";
import { MarketInsight } from "@/types/insight";

/** GET /insights/latest — public, latest daily AI market insight (or null). */
export async function getLatestInsight(): Promise<MarketInsight | null> {
  const { data } = await apiClient.get("/insights/latest");
  return data;
}
