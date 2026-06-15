import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/lib/services/news.service";

export const newsKeys = {
  all: ["news"] as const,
  list: () => [...newsKeys.all, "list"] as const,
};

/**
 * Hook to fetch and manage agriculture news state.
 * Caches results for 10 minutes to reduce API pressure.
 */
export function useNews() {
  return useQuery({
    queryKey: newsKeys.list(),
    queryFn: getNews,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
