import { apiClient } from "@/lib/api/axios";
import {
  EquipmentListing,
  ListingDraftResponse,
  ListingStatus,
  OwnerStats,
  PublicListing,
} from "@/types/marketplace";

// ─── Step 1: Create Draft ─────────────────────────────────────────────────────

export async function createListingDraft(data: {
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  model?: string;
  yearManufactured: number;
  description: string;
}): Promise<ListingDraftResponse> {
  const { data: res } = await apiClient.post(
    "/marketplace/listings",
    data
  );
  return res;
}

// ─── Step 2: Specs ────────────────────────────────────────────────────────────

export async function updateListingSpecs(
  id: string,
  data: {
    condition: string;
    maintenanceStatus: string;
    engineHours?: number;
    horsePower?: number;
    fuelType?: string;
    weightKg?: number;
    additionalSpecs?: string;
    lastServiceDate?: string;
  }
): Promise<ListingDraftResponse> {
  const { data: res } = await apiClient.patch(
    `/marketplace/listings/${id}/step/2`,
    data
  );
  return res;
}

// ─── Step 3: Pricing ──────────────────────────────────────────────────────────

export async function updateListingPricing(
  id: string,
  data: {
    pricePerDay: number;
    pricePerWeek?: number;
    pricePerMonth?: number;
    primaryPeriod: string;
    minRentalDays: number;
    maxRentalDays?: number;
    depositRequired: boolean;
    depositAmount?: number;
    includesOperator: boolean;
    operatorChargePerDay?: number;
    cancellationPolicy: string;
    additionalRules?: string;
  }
): Promise<ListingDraftResponse> {
  const { data: res } = await apiClient.patch(
    `/marketplace/listings/${id}/step/3`,
    data
  );
  return res;
}

// ─── Step 4: Location ─────────────────────────────────────────────────────────

export async function updateListingLocation(
  id: string,
  data: {
    state: string;
    lga: string;
    city: string;
    exactAddress?: string;
    landmark?: string;
    deliveryAvailable: boolean;
    deliveryRadiusKm?: number;
    deliveryFeePerKm?: number;
    availabilityType: string;
    unavailableDates?: string[];
    advanceBookingDays: number;
  }
): Promise<ListingDraftResponse> {
  const { data: res } = await apiClient.patch(
    `/marketplace/listings/${id}/step/4`,
    data
  );
  return res;
}

// ─── Step 5: Photo upload ─────────────────────────────────────────────────────

export async function uploadListingPhoto(
  id: string,
  file: File,
  isPrimary: boolean
): Promise<ListingDraftResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const { data: res } = await apiClient.post(
    `/marketplace/listings/${id}/photos?primary=${isPrimary}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res;
}

// ─── Step 5: Document upload ──────────────────────────────────────────────────

export async function uploadListingDocument(
  id: string,
  file: File,
  type: "ownership" | "insurance"
): Promise<ListingDraftResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const { data: res } = await apiClient.post(
    `/marketplace/listings/${id}/documents?type=${type}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res;
}

// ─── Step 5: Delete photo ─────────────────────────────────────────────────────

export async function deleteListingPhoto(
  id: string,
  publicId: string
): Promise<ListingDraftResponse> {
  const { data: res } = await apiClient.delete(
    `/marketplace/listings/${id}/photos?publicId=${encodeURIComponent(publicId)}`
  );
  return res;
}

// ─── Step 6: Publish ──────────────────────────────────────────────────────────

export async function publishListing(id: string): Promise<ListingDraftResponse> {
  const { data: res } = await apiClient.patch(
    `/marketplace/listings/${id}/publish`,
    { agreeToTerms: true, agreeToAccuracyDeclaration: true }
  );
  return res;
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getMyListings(params?: {
  status?: ListingStatus;
  archived?: boolean;
}): Promise<EquipmentListing[]> {
  const { data } = await apiClient.get("/marketplace/listings/mine", {
    params: {
      status: params?.status,
      archived: params?.archived ? "true" : undefined,
    },
  });
  return data;
}

export async function getMyDrafts(): Promise<EquipmentListing[]> {
  const { data } = await apiClient.get("/marketplace/listings/mine/drafts");
  return data;
}

export async function getListingById(id: string): Promise<EquipmentListing> {
  const { data } = await apiClient.get(`/marketplace/listings/${id}`);
  return data;
}

export async function deleteListing(id: string): Promise<void> {
  await apiClient.delete(`/marketplace/listings/${id}`);
}

export async function archiveListing(id: string): Promise<EquipmentListing> {
  const { data } = await apiClient.patch(`/marketplace/listings/${id}/archive`);
  return data;
}

export async function unarchiveListing(id: string): Promise<EquipmentListing> {
  const { data } = await apiClient.patch(
    `/marketplace/listings/${id}/unarchive`,
  );
  return data;
}

export async function getOwnerStats(): Promise<OwnerStats> {
  const { data } = await apiClient.get("/marketplace/listings/owner/stats");
  return data;
}

export async function getPublicListings(limit?: number): Promise<PublicListing[]> {
  const { data } = await apiClient.get("/public/marketplace/listings", {
    params: { limit },
  });
  return data;
}

/** Public single-listing fetch for the buyer-facing detail page. Owner PII and
 *  exact address are stripped server-side. */
export async function getPublicListingById(id: string): Promise<PublicListing> {
  const { data } = await apiClient.get(`/public/marketplace/listings/${id}`);
  return data;
}
