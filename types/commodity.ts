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

export enum NigerianState {
  // North Central
  BENUE = "BENUE",
  FCT = "FCT",
  KOGI = "KOGI",
  KWARA = "KWARA",
  NASARAWA = "NASARAWA",
  NIGER = "NIGER",
  PLATEAU = "PLATEAU",
  // North East
  ADAMAWA = "ADAMAWA",
  BAUCHI = "BAUCHI",
  BORNO = "BORNO",
  GOMBE = "GOMBE",
  TARABA = "TARABA",
  YOBE = "YOBE",
  // North West
  JIGAWA = "JIGAWA",
  KADUNA = "KADUNA",
  KANO = "KANO",
  KATSINA = "KATSINA",
  KEBBI = "KEBBI",
  SOKOTO = "SOKOTO",
  ZAMFARA = "ZAMFARA",
  // South East
  ABIA = "ABIA",
  ANAMBRA = "ANAMBRA",
  EBONYI = "EBONYI",
  ENUGU = "ENUGU",
  IMO = "IMO",
  // South South
  AKWA_IBOM = "AKWA_IBOM",
  BAYELSA = "BAYELSA",
  CROSS_RIVER = "CROSS_RIVER",
  DELTA = "DELTA",
  EDO = "EDO",
  RIVERS = "RIVERS",
  // South West
  EKITI = "EKITI",
  LAGOS = "LAGOS",
  OGUN = "OGUN",
  ONDO = "ONDO",
  OSUN = "OSUN",
  OYO = "OYO",
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

export const STATE_LABELS: Record<NigerianState, string> = {
  BENUE: "Benue",
  FCT: "FCT (Abuja)",
  KOGI: "Kogi",
  KWARA: "Kwara",
  NASARAWA: "Nasarawa",
  NIGER: "Niger",
  PLATEAU: "Plateau",
  ADAMAWA: "Adamawa",
  BAUCHI: "Bauchi",
  BORNO: "Borno",
  GOMBE: "Gombe",
  TARABA: "Taraba",
  YOBE: "Yobe",
  JIGAWA: "Jigawa",
  KADUNA: "Kaduna",
  KANO: "Kano",
  KATSINA: "Katsina",
  KEBBI: "Kebbi",
  SOKOTO: "Sokoto",
  ZAMFARA: "Zamfara",
  ABIA: "Abia",
  ANAMBRA: "Anambra",
  EBONYI: "Ebonyi",
  ENUGU: "Enugu",
  IMO: "Imo",
  AKWA_IBOM: "Akwa Ibom",
  BAYELSA: "Bayelsa",
  CROSS_RIVER: "Cross River",
  DELTA: "Delta",
  EDO: "Edo",
  RIVERS: "Rivers",
  EKITI: "Ekiti",
  LAGOS: "Lagos",
  OGUN: "Ogun",
  ONDO: "Ondo",
  OSUN: "Osun",
  OYO: "Oyo",
};

/** Maps each state to its geopolitical zone */
export const STATE_REGION_MAP: Record<NigerianState, NigerianRegion> = {
  [NigerianState.BENUE]: NigerianRegion.NORTH_CENTRAL,
  [NigerianState.FCT]: NigerianRegion.NORTH_CENTRAL,
  [NigerianState.KOGI]: NigerianRegion.NORTH_CENTRAL,
  [NigerianState.KWARA]: NigerianRegion.NORTH_CENTRAL,
  [NigerianState.NASARAWA]: NigerianRegion.NORTH_CENTRAL,
  [NigerianState.NIGER]: NigerianRegion.NORTH_CENTRAL,
  [NigerianState.PLATEAU]: NigerianRegion.NORTH_CENTRAL,
  [NigerianState.ADAMAWA]: NigerianRegion.NORTH_EAST,
  [NigerianState.BAUCHI]: NigerianRegion.NORTH_EAST,
  [NigerianState.BORNO]: NigerianRegion.NORTH_EAST,
  [NigerianState.GOMBE]: NigerianRegion.NORTH_EAST,
  [NigerianState.TARABA]: NigerianRegion.NORTH_EAST,
  [NigerianState.YOBE]: NigerianRegion.NORTH_EAST,
  [NigerianState.JIGAWA]: NigerianRegion.NORTH_WEST,
  [NigerianState.KADUNA]: NigerianRegion.NORTH_WEST,
  [NigerianState.KANO]: NigerianRegion.NORTH_WEST,
  [NigerianState.KATSINA]: NigerianRegion.NORTH_WEST,
  [NigerianState.KEBBI]: NigerianRegion.NORTH_WEST,
  [NigerianState.SOKOTO]: NigerianRegion.NORTH_WEST,
  [NigerianState.ZAMFARA]: NigerianRegion.NORTH_WEST,
  [NigerianState.ABIA]: NigerianRegion.SOUTH_EAST,
  [NigerianState.ANAMBRA]: NigerianRegion.SOUTH_EAST,
  [NigerianState.EBONYI]: NigerianRegion.SOUTH_EAST,
  [NigerianState.ENUGU]: NigerianRegion.SOUTH_EAST,
  [NigerianState.IMO]: NigerianRegion.SOUTH_EAST,
  [NigerianState.AKWA_IBOM]: NigerianRegion.SOUTH_SOUTH,
  [NigerianState.BAYELSA]: NigerianRegion.SOUTH_SOUTH,
  [NigerianState.CROSS_RIVER]: NigerianRegion.SOUTH_SOUTH,
  [NigerianState.DELTA]: NigerianRegion.SOUTH_SOUTH,
  [NigerianState.EDO]: NigerianRegion.SOUTH_SOUTH,
  [NigerianState.RIVERS]: NigerianRegion.SOUTH_SOUTH,
  [NigerianState.EKITI]: NigerianRegion.SOUTH_WEST,
  [NigerianState.LAGOS]: NigerianRegion.SOUTH_WEST,
  [NigerianState.OGUN]: NigerianRegion.SOUTH_WEST,
  [NigerianState.ONDO]: NigerianRegion.SOUTH_WEST,
  [NigerianState.OSUN]: NigerianRegion.SOUTH_WEST,
  [NigerianState.OYO]: NigerianRegion.SOUTH_WEST,
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
  /** Groups variants of the same base commodity, e.g. "maize"; null = standalone */
  family?: string | null;
  /** Short variant label within the family, e.g. "White" */
  variantLabel?: string | null;
  createdById: string | null;
  createdAt: string;
  updatedAt: string;
  /** Joined from the latest CommodityDailyAverage */
  latestAverage?: CommodityDailyAverage | null;
  /** Sibling variants sharing this commodity's family (incl. itself); [] if standalone */
  variants?: CommodityVariant[];
}

/** Lightweight sibling entry for the detail-page variant switcher */
export interface CommodityVariant {
  id: string;
  slug: string;
  name: string;
  /** Display label, e.g. "White" (falls back to full name) */
  label: string;
  /** True for the commodity currently being viewed */
  active: boolean;
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
  state: NigerianState;
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

// ─── Recently Added ───────────────────────────────────────────────────────────

export interface RecentlyAddedCommodity {
  id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
}

// ─── Price Spikes ───────────────────────────────────────────────────────────────

export interface PriceSpike {
  id: string;
  name: string;
  slug: string;
  category: string;
  unit: string;
  currentPrice: number;
  baselineAvg: number;
  spikePercent: number;
  sampleCount: number;
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

export interface CommodityIndexItem extends CommodityWithLatest {
  currentPrice: number;
  sevenDayChange: number;
  history: CommodityDailyAverage[];
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

// ─── Weekly Average ───────────────────────────────────────────────────────────

export interface CommodityWeeklyAverage {
  id: string;
  commodityId: string;
  isoYear: number;
  isoWeek: number;
  weekStartDate: string;
  weekEndDate: string;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  submissionCount: number;
  regionalBreakdown: Record<string, number>;
  priceChange: number | null;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyPriceHistory {
  commodity: Pick<Commodity, "id" | "name" | "unit">;
  history: CommodityWeeklyAverage[];
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
  state: NigerianState;
  market?: string;
  date: string;
}
