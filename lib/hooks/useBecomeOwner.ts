"use client";

import { useMutation } from "@tanstack/react-query";
import { becomeOwner } from "@/lib/services/user-roles.service";
import { authService } from "@/lib/services/auth.service";
import { useAuthStore } from "@/lib/store/useAuthStore";

/**
 * Adds the OWNER role to the signed-in user and gets their session back in
 * sync.
 *
 * The token refresh is the part that's easy to get wrong. Roles are baked into
 * the JWT at sign-in, so straight after the upgrade the client still holds a
 * token that says FARMER — and the backend's permissions guard reads the
 * token, not the database. Without refreshing, the very next call to the
 * listing wizard would 401 despite the role being correctly saved.
 *
 * The axios interceptor would eventually paper over it by refreshing on the
 * 401 and retrying, but relying on that means a guaranteed failed round-trip
 * on every upgrade. Better to ask for the new token deliberately.
 */
export function useBecomeOwner() {
  const { user, refreshToken, setUser, setTokens } = useAuthStore();

  const isOwner = !!user?.roles?.includes("OWNER");

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await becomeOwner();

      if (result.staleToken && refreshToken) {
        const { accessToken } = await authService.refreshToken(refreshToken);
        setTokens(accessToken, refreshToken);
      }

      setUser(result.user);
      return result;
    },
  });

  return {
    isOwner,
    becomeOwner: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
