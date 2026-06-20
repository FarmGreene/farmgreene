import { apiClient } from "@/lib/api/axios";
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "@/types/auth";
import { handleApiError } from "@/lib/utils/error-handler";

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        data,
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials,
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<User>("/auth/me");
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async verifyAgent(): Promise<User> {
    try {
      const response = await apiClient.patch<User>("/auth/verify-agent");
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /** Upload an onboarding photo (selfie or proof-of-activity) for the agent. */
  async uploadAgentPhoto(
    file: File,
    type: "profile" | "proof",
  ): Promise<unknown> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiClient.post(
        `/agent/profile/photo?type=${type}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const response = await apiClient.post<{ accessToken: string }>(
        "/auth/refresh",
        { refreshToken },
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>(
        "/auth/forgot-password",
        { email },
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>(
        "/auth/reset-password",
        { token, newPassword },
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

export const authService = new AuthService();
