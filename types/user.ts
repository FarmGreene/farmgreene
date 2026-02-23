export type UserRole = "FARMER" | "AGENT" | "OWNER" | "ADMIN" | "SUPER_ADMIN";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  password?: string;
  agentStatus?: "pending" | "active" | "suspended" | "rejected" | "banned";
}

export enum Permission {
  // Super Admin Only (SUPER_ADMIN)
  MANAGE_ADMINS = "MANAGE_ADMINS",
  MANAGE_SYSTEM_SETTINGS = "MANAGE_SYSTEM_SETTINGS",
  VIEW_ALL_DATA = "VIEW_ALL_DATA",
  DELETE_ANY_CONTENT = "DELETE_ANY_CONTENT",

  // Admin Capabilities (ADMIN + SUPER_ADMIN)
  APPROVE_AGENTS = "APPROVE_AGENTS",
  APPROVE_PRICE_UPDATES = "APPROVE_PRICE_UPDATES",
  APPROVE_MARKETPLACE_UPLOADS = "APPROVE_MARKETPLACE_UPLOADS",
  MANAGE_USERS = "MANAGE_USERS",
  VIEW_REPORTS = "VIEW_REPORTS",
  MODERATE_CONTENT = "MODERATE_CONTENT",

  // Owner Capabilities (OWNER + higher)
  UPLOAD_MARKETPLACE_PRODUCTS = "UPLOAD_MARKETPLACE_PRODUCTS",
  MANAGE_OWN_LISTINGS = "MANAGE_OWN_LISTINGS",

  // Agent Capabilities (AGENT + higher)
  SUBMIT_FIELD_DATA = "SUBMIT_FIELD_DATA",
  MANAGE_ASSIGNED_AREAS = "MANAGE_ASSIGNED_AREAS",

  // Farmer Capabilities (everyone)
  VIEW_MARKETPLACE = "VIEW_MARKETPLACE",
  PURCHASE_PRODUCTS = "PURCHASE_PRODUCTS",
}

/**
 * Maps roles to their permissions
 */
export const RolePermissions: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    // Super admin has ALL permissions
    Permission.MANAGE_ADMINS,
    Permission.MANAGE_SYSTEM_SETTINGS,
    Permission.VIEW_ALL_DATA,
    Permission.DELETE_ANY_CONTENT,
    Permission.APPROVE_AGENTS,
    Permission.APPROVE_PRICE_UPDATES,
    Permission.APPROVE_MARKETPLACE_UPLOADS,
    Permission.MANAGE_USERS,
    Permission.VIEW_REPORTS,
    Permission.MODERATE_CONTENT,
    Permission.UPLOAD_MARKETPLACE_PRODUCTS,
    Permission.MANAGE_OWN_LISTINGS,
    Permission.SUBMIT_FIELD_DATA,
    Permission.MANAGE_ASSIGNED_AREAS,
    Permission.VIEW_MARKETPLACE,
    Permission.PURCHASE_PRODUCTS,
  ],
  ADMIN: [
    // Limited admin - approval and management
    Permission.APPROVE_AGENTS,
    Permission.APPROVE_PRICE_UPDATES,
    Permission.APPROVE_MARKETPLACE_UPLOADS,
    Permission.MANAGE_USERS,
    Permission.VIEW_REPORTS,
    Permission.MODERATE_CONTENT,
    Permission.VIEW_MARKETPLACE,
  ],
  OWNER: [
    // Marketplace vendor
    Permission.UPLOAD_MARKETPLACE_PRODUCTS,
    Permission.MANAGE_OWN_LISTINGS,
    Permission.VIEW_MARKETPLACE,
    Permission.PURCHASE_PRODUCTS,
  ],
  AGENT: [
    // Field agent
    Permission.SUBMIT_FIELD_DATA,
    Permission.MANAGE_ASSIGNED_AREAS,
    Permission.VIEW_MARKETPLACE,
    Permission.PURCHASE_PRODUCTS,
  ],
  FARMER: [
    // Regular user
    Permission.VIEW_MARKETPLACE,
    Permission.PURCHASE_PRODUCTS,
  ],
};

/**
 * Check if a user (with multiple roles) has a specific permission
 */
export function userHasPermission(
  roles: UserRole[],
  permission: Permission,
): boolean {
  return roles.some((role) => RolePermissions[role]?.includes(permission));
}

/**
 * Get all permissions for a user based on their roles
 */
export function getUserPermissions(roles: UserRole[]): Permission[] {
  const permissions = new Set<Permission>();
  roles.forEach((role) => {
    RolePermissions[role]?.forEach((permission) => permissions.add(permission));
  });
  return Array.from(permissions);
}
