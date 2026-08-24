import { useQuery } from "@tanstack/react-query";
import { getLatestMarketSnapshot } from "@/lib/services/market-snapshot.service";

/** The snapshot only refreshes once a day, so a long staleTime avoids refetch churn. */
export function useMarketSnapshot() {
  return useQuery({
    queryKey: ["market-snapshot", "latest"],
    queryFn: getLatestMarketSnapshot,
    staleTime: 30 * 60 * 1000,
  });
}
