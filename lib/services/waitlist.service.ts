import { apiClient } from "@/lib/api/axios";

/** Mirrors WaitlistSegment in the backend. */
export type WaitlistSegment =
  | "FARMER"
  | "EQUIPMENT_OWNER"
  | "MARKET_AGENT"
  | "PRICE_WATCHER";

export interface JoinWaitlistPayload {
  email: string;
  segment: WaitlistSegment;
  /** Where the signup came from, for attribution. */
  source?: string;
  /** State or region they can cover. Only collected for MARKET_AGENT. */
  area?: string;
  /** Honeypot — always sent empty by the real form. */
  website?: string;
}

/**
 * Public, unauthenticated. Returns 409 when the address is already on the
 * list, which callers should treat as a soft success — the person is on it
 * either way.
 */
export async function joinWaitlist(
  payload: JoinWaitlistPayload,
): Promise<{ message: string }> {
  const { data } = await apiClient.post("/waitlist/join", payload);
  return data;
}
