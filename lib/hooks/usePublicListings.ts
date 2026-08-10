import { useQuery } from "@tanstack/react-query";
import { getPublicListings } from "@/lib/services/marketplace.service";

export const publicListingKeys = {
  all: ["public-listings"] as const,
  list: (limit: number) => [...publicListingKeys.all, limit] as const,
};

/** Active, non-archived listings for the browse/storefront view. */
export function usePublicListings(limit = 60) {
  return useQuery({
    queryKey: publicListingKeys.list(limit),
    queryFn: () => getPublicListings(limit),
    staleTime: 2 * 60 * 1000,
  });
}
