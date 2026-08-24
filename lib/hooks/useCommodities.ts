import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  getCommodities,
  getCommodityById,
  getCommodityBySlug,
  getTopMovers,
  getRecentlyAdded,
  getPriceSpikes,
  getCommodityPriceHistory,
  getCommodityWeeklyPriceHistory,
  getRegionalPrices,
  getCommodityInsight,
  submitPrice,
  getPublicCommodityIndex,
  getPremiumCommodityIndex,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "@/lib/services/commodity.service";

import type { CommodityQueryParams, SubmitPriceBody } from "@/types/commodity";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const commodityKeys = {
  all: ["commodities"] as const,
  list: (params?: CommodityQueryParams) =>
    [...commodityKeys.all, "list", params] as const,
  detail: (id: string) => [...commodityKeys.all, "detail", id] as const,
  slug: (slug: string) => [...commodityKeys.all, "slug", slug] as const,
  topMovers: (limit?: number) =>
    [...commodityKeys.all, "top-movers", limit] as const,
  recentlyAdded: (limit?: number) =>
    [...commodityKeys.all, "recently-added", limit] as const,
  priceSpikes: (limit?: number) =>
    [...commodityKeys.all, "price-spikes", limit] as const,
  priceHistory: (id: string, days?: number) =>
    [...commodityKeys.all, "price-history", id, days] as const,
  weeklyPriceHistory: (id: string, weeks?: number) =>
    [...commodityKeys.all, "weekly-price-history", id, weeks] as const,
  regionalPrices: (id: string, date?: string) =>
    [...commodityKeys.all, "regional-prices", id, date] as const,
  index: (params?: CommodityQueryParams, isPremium?: boolean) =>
    [...commodityKeys.all, "index", isPremium, params] as const,
  insight: (id: string) => [...commodityKeys.all, "insight", id] as const,
  watchlist: () => [...commodityKeys.all, "watchlist"] as const,
};

// ─── Read Hooks ───────────────────────────────────────────────────────────────

/**
 * Get a filterable, paginated list of commodities with latest prices.
 * Great for commodity catalog pages and intelligence grids.
 */
export function useCommodities(params?: CommodityQueryParams) {
  return useQuery({
    queryKey: commodityKeys.list(params),
    queryFn: () => getCommodities(params),
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

/**
 * Get aggregated commodity index (commodities + history).
 * Replaces N+1 calls in widgets and summary grids.
 */
export function useCommodityIndex(
  params?: CommodityQueryParams,
  isPremium = false,
) {
  return useQuery({
    queryKey: commodityKeys.index(params, isPremium),
    queryFn: () =>
      isPremium
        ? getPremiumCommodityIndex(params)
        : getPublicCommodityIndex(params),
    staleTime: 5 * 60 * 1000,
  });
}

/** Get detailed commodity + latest average by ID */
export function useCommodity(id: string) {
  return useQuery({
    queryKey: commodityKeys.detail(id),
    queryFn: () => getCommodityById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/** Get commodity by URL slug */
export function useCommodityBySlug(slug: string) {
  return useQuery({
    queryKey: commodityKeys.slug(slug),
    queryFn: () => getCommodityBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Get top gainers and decliners.
 * Powers the TopMoversWidget on the dashboard.
 */
export function useTopMovers(limit = 10) {
  return useQuery({
    queryKey: commodityKeys.topMovers(limit),
    queryFn: () => getTopMovers(limit),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000, // refresh every 10 min
  });
}

/** Get the most recently added active commodities. Powers the Discovery sidebar. */
export function useRecentlyAdded(limit = 5) {
  return useQuery({
    queryKey: commodityKeys.recentlyAdded(limit),
    queryFn: () => getRecentlyAdded(limit),
    staleTime: 10 * 60 * 1000,
  });
}

/** Get commodities with the largest deviation from their trailing 30-day average. Powers Risk Watch. */
export function usePriceSpikes(limit = 5) {
  return useQuery({
    queryKey: commodityKeys.priceSpikes(limit),
    queryFn: () => getPriceSpikes(limit),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Get daily price history for sparklines and full charts.
 * @param commodityId The commodity UUID
 * @param days Number of historical days to fetch (default 30)
 */
export function usePriceHistory(commodityId: string, days = 30) {
  return useQuery({
    queryKey: commodityKeys.priceHistory(commodityId, days),
    queryFn: () => getCommodityPriceHistory(commodityId, days),
    enabled: !!commodityId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Get long-range weekly price history for a commodity (1Y/all-time chart
 * views, where daily granularity would be too many points). Omit `weeks`
 * for the full all-time history. `enabled` lets callers defer the fetch
 * until the long-range tab is actually selected.
 */
export function useWeeklyPriceHistory(
  commodityId: string,
  weeks?: number,
  enabled = true,
) {
  return useQuery({
    queryKey: commodityKeys.weeklyPriceHistory(commodityId, weeks),
    queryFn: () => getCommodityWeeklyPriceHistory(commodityId, weeks),
    enabled: !!commodityId && enabled,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Get the regional price breakdown for a commodity.
 * Powers the map and regional tables on the intelligence page.
 */
export function useRegionalPrices(commodityId: string, date?: string) {
  return useQuery({
    queryKey: commodityKeys.regionalPrices(commodityId, date),
    queryFn: () => getRegionalPrices(commodityId, date),
    enabled: !!commodityId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Get the 7-day-cached AI market insight for one commodity. A cold or
 * stale cache generates on the server (~25s) — no window-focus refetch
 * and only one retry so a slow first load isn't hammered.
 */
export function useCommodityInsight(commodityId: string) {
  return useQuery({
    queryKey: commodityKeys.insight(commodityId),
    queryFn: () => getCommodityInsight(commodityId),
    enabled: !!commodityId,
    staleTime: 60 * 60 * 1000, // 1h — backend cache is 7 days anyway
    gcTime: 2 * 60 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/** The current user's tracked commodities, with real 7-day trend + sparkline. */
export function useWatchlist() {
  return useQuery({
    queryKey: commodityKeys.watchlist(),
    queryFn: getWatchlist,
    staleTime: 60 * 1000,
  });
}

// ─── Mutation Hooks ───────────────────────────────────────────────────────────

export function useAddToWatchlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commodityId: string) => addToWatchlist(commodityId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commodityKeys.watchlist() });
    },
  });
}

export function useRemoveFromWatchlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commodityId: string) => removeFromWatchlist(commodityId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commodityKeys.watchlist() });
    },
  });
}

/**
 * Agent: Submit a new price for a commodity.
 * Invalidates the commodity detail and list queries on success.
 */
export function useSubmitPrice(commodityId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: SubmitPriceBody) => submitPrice(commodityId, body),
    onSuccess: () => {
      // Submissions go into PENDING state, no need to invalidate averages
      // but we can invalidate top-movers in case admin approves later
      qc.invalidateQueries({ queryKey: commodityKeys.all });
    },
  });
}
