import { apiClient } from "@/lib/api/axios";
import type {
  Commodity,
  CommodityWithLatest,
  CommodityDailyAverage,
  CommodityPriceEntry,
  PaginatedResponse,
  TopMovers,
  RegionalPrices,
  PriceHistory,
  CommodityQueryParams,
  PriceSubmissionQueryParams,
  CreateCommodityBody,
  UpdateCommodityBody,
  SubmitPriceBody,
  CommodityIndexItem,
} from "@/types/commodity";


// ─── Public Endpoints ─────────────────────────────────────────────────────────

/** GET /commodities — paginated list with filters */
export async function getCommodities(
  params?: CommodityQueryParams,
): Promise<PaginatedResponse<CommodityWithLatest>> {
  const { data } = await apiClient.get("/commodities", { params });
  return data;
}

/** GET /commodities/detail?id= */
export async function getCommodityById(
  id: string,
): Promise<CommodityWithLatest> {
  const { data } = await apiClient.get("/commodities/detail", {
    params: { id },
  });
  return data;
}

/** GET /commodities/by-slug?slug= */
export async function getCommodityBySlug(
  slug: string,
): Promise<CommodityWithLatest> {
  const { data } = await apiClient.get("/commodities/by-slug", {
    params: { slug },
  });
  return data;
}


/** GET /commodities/index — Public index (no auth) */
export async function getPublicCommodityIndex(params?: {
  category?: string;
}): Promise<PaginatedResponse<CommodityIndexItem>> {
  const { data } = await apiClient.get("/commodities/index", { params });
  return data;
}

/** GET /commodities/index/premium — Premium index (requires auth) */
export async function getPremiumCommodityIndex(
  params?: CommodityQueryParams,
): Promise<PaginatedResponse<CommodityIndexItem>> {
  const { data } = await apiClient.get("/commodities/index/premium", { params });
  return data;
}

/** GET /commodities/top-movers?limit= */

export async function getTopMovers(limit = 10): Promise<TopMovers> {
  const { data } = await apiClient.get("/commodities/top-movers", {
    params: { limit },
  });
  return data;
}

/** GET /commodities/price-history?id=&days= */
export async function getCommodityPriceHistory(
  commodityId: string,
  days = 30,
): Promise<PriceHistory> {
  const { data } = await apiClient.get("/commodities/price-history", {
    params: { id: commodityId, days },
  });
  return data;
}

/** GET /commodities/regional-prices?id=&date= */
export async function getRegionalPrices(
  commodityId: string,
  date?: string,
): Promise<RegionalPrices> {
  const { data } = await apiClient.get("/commodities/regional-prices", {
    params: { id: commodityId, ...(date ? { date } : {}) },
  });
  return data;
}

// ─── Agent: Submit Price ──────────────────────────────────────────────────────

/** POST /commodities/submit-price?id= */
export async function submitPrice(
  commodityId: string,
  body: SubmitPriceBody,
): Promise<CommodityPriceEntry> {
  const { data } = await apiClient.post("/commodities/submit-price", body, {
    params: { id: commodityId },
  });
  return data;
}

// ─── Admin: Commodity CRUD ────────────────────────────────────────────────────

export async function adminGetCommodities(
  params?: CommodityQueryParams,
): Promise<PaginatedResponse<CommodityWithLatest>> {
  const { data } = await apiClient.get("/admin/commodities", { params });
  return data;
}

export async function adminGetCommodityById(
  id: string,
): Promise<CommodityWithLatest> {
  const { data } = await apiClient.get("/admin/commodities/detail", {
    params: { id },
  });
  return data;
}

export async function adminCreateCommodity(
  body: CreateCommodityBody,
): Promise<Commodity> {
  const { data } = await apiClient.post("/admin/commodities", body);
  return data;
}

/** PUT /admin/commodities?id= */
export async function adminUpdateCommodity(
  id: string,
  body: UpdateCommodityBody,
): Promise<Commodity> {
  const { data } = await apiClient.put("/admin/commodities", body, {
    params: { id },
  });
  return data;
}

/** DELETE /admin/commodities?id= */
export async function adminDeleteCommodity(
  id: string,
): Promise<{ message: string }> {
  const { data } = await apiClient.delete("/admin/commodities", {
    params: { id },
  });
  return data;
}

// ─── Admin: Price Submissions ─────────────────────────────────────────────────

/** GET /admin/commodities/prices */
export async function adminGetPriceSubmissions(
  params?: PriceSubmissionQueryParams,
): Promise<PaginatedResponse<CommodityPriceEntry>> {
  const { data } = await apiClient.get("/admin/commodities/prices", { params });
  return data;
}

/** PATCH /admin/commodities/prices/approve?entryId= */
export async function adminApprovePrice(
  entryId: string,
  note?: string,
): Promise<CommodityPriceEntry> {
  const { data } = await apiClient.patch(
    "/admin/commodities/prices/approve",
    { note },
    { params: { entryId } },
  );
  return data;
}

/** PATCH /admin/commodities/prices/reject?entryId= */
export async function adminRejectPrice(
  entryId: string,
  note: string,
): Promise<CommodityPriceEntry> {
  const { data } = await apiClient.patch(
    "/admin/commodities/prices/reject",
    { note },
    { params: { entryId } },
  );
  return data;
}

/** POST /admin/commodities/prices/bulk-approve */
export async function adminBulkApprovePrice(
  ids: string[],
  note?: string,
): Promise<{ approved: number }> {
  const { data } = await apiClient.post(
    "/admin/commodities/prices/bulk-approve",
    { ids, note },
  );
  return data;
}

/** POST /admin/commodities/recompute?id=&date= */
export async function adminRecomputeAverage(
  commodityId: string,
  date?: string,
): Promise<void> {
  await apiClient.post("/admin/commodities/recompute", undefined, {
    params: { id: commodityId, ...(date ? { date } : {}) },
  });
}
