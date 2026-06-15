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
  getCommodityPriceHistory,
  getRegionalPrices,
  submitPrice,
  getPublicCommodityIndex,
  getPremiumCommodityIndex,
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
  priceHistory: (id: string, days?: number) =>
    [...commodityKeys.all, "price-history", id, days] as const,
  regionalPrices: (id: string, date?: string) =>
    [...commodityKeys.all, "regional-prices", id, date] as const,
  index: (params?: CommodityQueryParams, isPremium?: boolean) =>
    [...commodityKeys.all, "index", isPremium, params] as const,
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

// ─── Mutation Hooks ───────────────────────────────────────────────────────────

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
