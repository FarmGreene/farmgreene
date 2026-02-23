// ─── Enums (mirrors backend enums) ───────────────────────────────────────────

export enum CommodityCategory {
  GRAINS = "GRAINS",
  TUBERS = "TUBERS",
  LEGUMES = "LEGUMES",
  CASH_CROPS = "CASH_CROPS",
  VEGETABLES = "VEGETABLES",
  LIVESTOCK = "LIVESTOCK",
  OTHERS = "OTHERS",
}

export enum PriceSubmissionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum NigerianRegion {
  NORTH_CENTRAL = "NORTH_CENTRAL",
  NORTH_EAST = "NORTH_EAST",
  NORTH_WEST = "NORTH_WEST",
  SOUTH_EAST = "SOUTH_EAST",
  SOUTH_SOUTH = "SOUTH_SOUTH",
  SOUTH_WEST = "SOUTH_WEST",
}

// ─── Labels ───────────────────────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<CommodityCategory, string> = {
  GRAINS: "Grains",
  TUBERS: "Tubers",
  LEGUMES: "Legumes",
  CASH_CROPS: "Cash Crops",
  VEGETABLES: "Vegetables",
  LIVESTOCK: "Livestock",
  OTHERS: "Others",
};

export const REGION_LABELS: Record<NigerianRegion, string> = {
  NORTH_CENTRAL: "North Central",
  NORTH_EAST: "North East",
  NORTH_WEST: "North West",
  SOUTH_EAST: "South East",
  SOUTH_SOUTH: "South South",
  SOUTH_WEST: "South West",
};

// ─── Commodity ────────────────────────────────────────────────────────────────

export interface Commodity {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: CommodityCategory;
  unit: string;
  unitWeight: number | null;
  imageUrl: string | null;
  tags: string[];
  metadata: Record<string, any>;
  isActive: boolean;
  createdById: string | null;
  createdAt: string;
  updatedAt: string;
  /** Joined from the latest CommodityDailyAverage */
  latestAverage?: CommodityDailyAverage | null;
}

// ─── Daily Average ────────────────────────────────────────────────────────────

export interface CommodityDailyAverage {
  id: string;
  commodityId: string;
  date: string;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  submissionCount: number;
  /** { NORTH_CENTRAL: 32000, SOUTH_WEST: 28000 } */
  regionalBreakdown: Record<string, number>;
  /** % change vs previous day; null if no prior day data */
  priceChange: number | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Price Entry (agent submission) ──────────────────────────────────────────

export interface CommodityPriceEntry {
  id: string;
  commodityId: string;
  commodity?: Pick<Commodity, "id" | "name" | "slug" | "unit" | "category">;
  submittedById: string;
  submittedBy?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  price: number;
  region: NigerianRegion;
  state: string;
  market: string | null;
  date: string;
  status: PriceSubmissionStatus;
  reviewedById: string | null;
  reviewedAt: string | null;
  reviewNote: string | null;
  createdAt: string;
}

// ─── Top Movers ───────────────────────────────────────────────────────────────

export interface CommodityMover {
  id: string;
  name: string;
  slug: string;
  category: string;
  unit: string;
  average_price: string;
  price_change: string;
  date: string;
  regional_breakdown: Record<string, number>;
}

export interface TopMovers {
  gainers: CommodityMover[];
  decliners: CommodityMover[];
}

// ─── API Shapes ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CommodityWithLatest extends Commodity {
  latestAverage: CommodityDailyAverage | null;
}

export interface RegionalPrices {
  commodity: Pick<Commodity, "id" | "name" | "unit">;
  date: string | null;
  nationalAverage: number | null;
  regionalBreakdown: Record<string, number>;
}

export interface PriceHistory {
  commodity: Pick<Commodity, "id" | "name" | "unit">;
  history: CommodityDailyAverage[];
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface CommodityQueryParams {
  search?: string;
  category?: CommodityCategory;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface PriceSubmissionQueryParams {
  status?: PriceSubmissionStatus;
  commodityId?: string;
  agentId?: string;
  region?: NigerianRegion;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

// ─── Request Bodies ───────────────────────────────────────────────────────────

export interface CreateCommodityBody {
  name: string;
  category: CommodityCategory;
  unit: string;
  description?: string;
  unitWeight?: number;
  imageUrl?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  isActive?: boolean;
}

export type UpdateCommodityBody = Partial<CreateCommodityBody>;

export interface SubmitPriceBody {
  price: number;
  region: NigerianRegion;
  state: string;
  market?: string;
  date: string;
}
