import { apiClient } from "@/lib/api/axios";

export interface ContactMessagePayload {
  fullName: string;
  email: string;
  reason: string;
  organisation?: string;
  message: string;
  /** Honeypot — always sent empty by the real form. */
  website?: string;
}

/** Public, unauthenticated. Rate-limited server-side to 5 an hour. */
export async function sendContactMessage(
  payload: ContactMessagePayload,
): Promise<{ message: string }> {
  const { data } = await apiClient.post("/contact", payload);
  return data;
}
