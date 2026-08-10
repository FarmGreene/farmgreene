import { apiClient } from "@/lib/api/axios";
import { MarketBrief } from "@/types/market-brief";

/** GET /market-brief/latest — public, latest daily AI market brief (or null). */
export async function getLatestMarketBrief(): Promise<MarketBrief | null> {
  const { data } = await apiClient.get("/market-brief/latest");
  return data;
}
