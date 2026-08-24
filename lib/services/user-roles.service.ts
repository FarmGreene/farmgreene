import { apiClient } from "@/lib/api/axios";
import type { User } from "@/types/user";

export interface BecomeOwnerResponse {
  user: User;
  /**
   * The access token in hand was signed before OWNER was on the account, so
   * it no longer reflects the user's roles. Refresh before calling anything
   * the permissions guard protects.
   */
  staleToken: boolean;
}

/**
 * Grants the signed-in user the OWNER role. Idempotent — safe to call for
 * somebody who is already an owner.
 */
export async function becomeOwner(): Promise<BecomeOwnerResponse> {
  const { data } = await apiClient.post("/users/me/roles/owner");
  return data;
}
