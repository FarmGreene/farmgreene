import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getSessions,
  revokeSession,
  revokeOtherSessions,
} from "@/lib/services/session.service";

export const sessionKeys = {
  all: ["sessions"] as const,
};

export function useSessions() {
  return useQuery({
    queryKey: sessionKeys.all,
    queryFn: getSessions,
    staleTime: 30 * 1000,
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => revokeSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
      toast.success("Device logged out.");
    },
    onError: () => {
      toast.error("Couldn't revoke that session. Try again.");
    },
  });
}

export function useRevokeOtherSessions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: revokeOtherSessions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
      toast.success("Logged out of all other devices.");
    },
    onError: () => {
      toast.error("Couldn't log out other devices. Try again.");
    },
  });
}
