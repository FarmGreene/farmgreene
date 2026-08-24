import { useQuery } from "@tanstack/react-query";
import { getLatestInsight } from "@/lib/services/insight.service";

/** The insight only refreshes once a day, so a long staleTime avoids refetch churn. */
export function useLatestInsight() {
  return useQuery({
    queryKey: ["insight", "latest"],
    queryFn: getLatestInsight,
    staleTime: 30 * 60 * 1000,
  });
}
