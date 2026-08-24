import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";
import type { EquipmentCategory } from "@/types/marketplace";

export const SORT_OPTIONS = ["recommended", "price_asc", "price_desc"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

/** URL search-param parsers for the marketplace filter panel — nuqs keeps
 *  these in sync with the address bar, so filters survive a refresh and are
 *  shareable/bookmarkable links into a filtered view. */
export const marketplaceFilterParsers = {
  category: parseAsString,
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  state: parseAsString,
  sort: parseAsStringEnum<SortOption>([...SORT_OPTIONS]).withDefault("recommended"),
};

export interface MarketplaceFilters {
  category: EquipmentCategory | null;
  minPrice: number | null;
  maxPrice: number | null;
  state: string | null;
  sort: SortOption;
}

export const DEFAULT_FILTERS: MarketplaceFilters = {
  category: null,
  minPrice: null,
  maxPrice: null,
  state: null,
  sort: "recommended",
};
