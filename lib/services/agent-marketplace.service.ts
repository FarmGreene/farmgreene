import { apiClient } from "@/lib/api/axios";
import {
  CreateAgentListingInput,
  EquipmentListing,
  ListingDraftResponse,
} from "@/types/marketplace";

// ─── Create draft (owner + equipment in one shot) ─────────────────────────────

export async function createAgentListing(
  data: CreateAgentListingInput,
): Promise<ListingDraftResponse> {
  const { data: res } = await apiClient.post(
    "/agent/marketplace/listings",
    data,
  );
  return res;
}

// ─── Photo upload ─────────────────────────────────────────────────────────────

export async function uploadAgentListingPhoto(
  id: string,
  file: File,
  isPrimary: boolean,
): Promise<ListingDraftResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const { data: res } = await apiClient.post(
    `/agent/marketplace/listings/photo?id=${id}&primary=${isPrimary}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res;
}

// ─── Submit for admin review ──────────────────────────────────────────────────

export async function submitAgentListing(
  id: string,
): Promise<ListingDraftResponse> {
  const { data: res } = await apiClient.patch(
    `/agent/marketplace/listings/submit?id=${id}`,
  );
  return res;
}

// ─── Read — listings I onboarded ──────────────────────────────────────────────

export async function getMyOnboardedListings(): Promise<EquipmentListing[]> {
  const { data } = await apiClient.get("/agent/marketplace/listings/mine");
  return data;
}
