import { apiClient } from "@/lib/api/axios";
import {
  CreateRentRequestPayload,
  OwnerUtilization,
  RentRequest,
} from "@/types/marketplace";

const BASE = "/marketplace/rent-requests";

/** Renter submits a request to rent a listing for a date range. */
export async function createRentRequest(
  payload: CreateRentRequestPayload,
): Promise<RentRequest> {
  const { data } = await apiClient.post(BASE, payload);
  return data;
}

/** Renter's own requests (owner contact appears once accepted). */
export async function getMyRentRequests(): Promise<RentRequest[]> {
  const { data } = await apiClient.get(`${BASE}/mine`);
  return data;
}

/** Requests received across the current owner's listings. */
export async function getReceivedRentRequests(): Promise<RentRequest[]> {
  const { data } = await apiClient.get(`${BASE}/received`);
  return data;
}

/** Fleet occupancy for the current month (drives the utilization insight). */
export async function getOwnerUtilization(): Promise<OwnerUtilization> {
  const { data } = await apiClient.get(`${BASE}/utilization`);
  return data;
}

export async function acceptRentRequest(
  id: string,
  note?: string,
): Promise<RentRequest> {
  const { data } = await apiClient.patch(`${BASE}/${id}/accept`, { note });
  return data;
}

export async function rejectRentRequest(
  id: string,
  note?: string,
): Promise<RentRequest> {
  const { data } = await apiClient.patch(`${BASE}/${id}/reject`, { note });
  return data;
}

export async function cancelRentRequest(id: string): Promise<RentRequest> {
  const { data } = await apiClient.patch(`${BASE}/${id}/cancel`);
  return data;
}
