import { UserRole } from "./user";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  location?: string | null;
  avatarUrl?: string | null;
  roles: UserRole[];
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: string;
  /** New avatar as a base64 data URL; omit to leave the avatar unchanged. */
  avatar?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roles: UserRole[];
}
