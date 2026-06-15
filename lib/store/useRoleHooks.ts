import { useAuthStore } from "./useAuthStore";

/**
 * Hook to check if user has a specific role
 */
export function useHasRole(role: "FARMER" | "OWNER" | "AGENT"): boolean {
  const user = useAuthStore((state) => state.user);
  return user?.roles.includes(role) ?? false;
}

/**
 * Hook to check if user has any of the specified roles
 */
export function useHasAnyRole(
  roles: ("FARMER" | "OWNER" | "AGENT")[],
): boolean {
  const user = useAuthStore((state) => state.user);
  return roles.some((role) => user?.roles.includes(role)) ?? false;
}

/**
 * Hook to check if user has all of the specified roles
 */
export function useHasAllRoles(
  roles: ("FARMER" | "OWNER" | "AGENT")[],
): boolean {
  const user = useAuthStore((state) => state.user);
  return roles.every((role) => user?.roles.includes(role)) ?? false;
}
