import type { User, UserRole } from "@/types/user";

export const ROLE_LABELS: Record<UserRole, string> = {
  FARMER: "Farmer",
  AGENT: "Field Agent",
  OWNER: "Equipment Owner",
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
};

type DisplayUser = Pick<User, "firstName" | "lastName" | "email" | "roles">;

/** Full name from first/last, falling back to email, then a generic label. */
export function getFullName(user?: DisplayUser | null): string {
  if (!user) return "Your account";
  return (
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.email ||
    "Your account"
  );
}

/** Up to two initials from the name, falling back to the email, then "U". */
export function getInitials(user?: DisplayUser | null): string {
  const fromName =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();
  return fromName || user?.email?.[0]?.toUpperCase() || "U";
}

/** Human-readable label for the user's primary role (empty if none). */
export function getRoleLabel(user?: DisplayUser | null): string {
  if (!user?.roles?.length) return "";
  return ROLE_LABELS[user.roles[0]] ?? user.roles[0];
}
