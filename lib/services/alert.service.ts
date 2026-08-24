import { apiClient } from "@/lib/api/axios";
import type { PriceAlert, CreatePriceAlertBody } from "@/types/alert";

/** GET /alerts — the current user's price alerts */
export async function getAlerts(): Promise<PriceAlert[]> {
  const { data } = await apiClient.get("/alerts");
  return data;
}

/** POST /alerts */
export async function createAlert(body: CreatePriceAlertBody): Promise<PriceAlert> {
  const { data } = await apiClient.post("/alerts", body);
  return data;
}

/** PATCH /alerts/:id/pause */
export async function pauseAlert(id: string): Promise<PriceAlert> {
  const { data } = await apiClient.patch(`/alerts/${id}/pause`);
  return data;
}

/** PATCH /alerts/:id/resume */
export async function resumeAlert(id: string): Promise<PriceAlert> {
  const { data } = await apiClient.patch(`/alerts/${id}/resume`);
  return data;
}

/** DELETE /alerts/:id */
export async function deleteAlert(id: string): Promise<void> {
  await apiClient.delete(`/alerts/${id}`);
}
