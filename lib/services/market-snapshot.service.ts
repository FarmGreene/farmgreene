import { apiClient } from "@/lib/api/axios";
import { MarketSnapshot } from "@/types/market-snapshot";

/** GET /market-snapshot/latest — public, latest daily market-wide snapshot (or null). */
export async function getLatestMarketSnapshot(): Promise<MarketSnapshot | null> {
  const { data } = await apiClient.get("/market-snapshot/latest");
  return data;
}
