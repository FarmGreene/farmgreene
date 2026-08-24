import { useQuery } from "@tanstack/react-query";
import { getLatestMarketBrief } from "@/lib/services/market-brief.service";

/** The brief only refreshes once a day, so a long staleTime avoids refetch churn. */
export function useMarketBrief() {
  return useQuery({
    queryKey: ["market-brief", "latest"],
    queryFn: getLatestMarketBrief,
    staleTime: 30 * 60 * 1000,
  });
}
