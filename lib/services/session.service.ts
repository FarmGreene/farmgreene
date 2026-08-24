import { apiClient } from "@/lib/api/axios";
import { Session } from "@/types/auth";

export async function getSessions(): Promise<Session[]> {
  const { data } = await apiClient.get<Session[]>("/auth/sessions");
  return data;
}

export async function revokeSession(id: string): Promise<void> {
  await apiClient.delete(`/auth/sessions/${id}`);
}

export async function revokeOtherSessions(): Promise<void> {
  await apiClient.post("/auth/sessions/revoke-others");
}
