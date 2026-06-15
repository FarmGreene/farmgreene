import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/services/auth.service";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { LoginCredentials, RegisterData } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "current-user"] as const,
};

/**
 * Hook to login user
 */
export function useLogin() {
  const router = useRouter();
  const { setUser, setTokens, setError, clearError } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      clearError();
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
}

/**
 * Hook to register new user
 */
export function useRegister() {
  const router = useRouter();
  const { setUser, setTokens, setError, clearError } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      clearError();
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      setError(error.message);
      toast.error(error.message);
    },
  });
}

/**
 * Hook to get current user profile
 */
export function useCurrentUser() {
  const { accessToken, user, setUser, logout } = useAuthStore();

  const query = useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => authService.getCurrentUser(),
    enabled: !!accessToken && !user, // Only fetch if we have token but no user
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Handle success/error with useEffect
  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.error) {
      logout();
    }
  }, [query.error, logout]);

  return query;
}

/**
 * Hook to logout user
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      // You can add a logout API call here if your backend has one
      logout();
    },
    onSuccess: () => {
      queryClient.clear(); // Clear all queries
      router.push("/login");
    },
  });
}

/**
 * Hook to request password reset email
 */
export function useForgotPassword() {
  const { setError, clearError } = useAuthStore();

  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onMutate: () => clearError(),
    onError: (error: Error) => {
      setError(error.message);
    },
  });
}

/**
 * Hook to reset password with token
 */
export function useResetPassword() {
  const router = useRouter();
  const { setError, clearError } = useAuthStore();

  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => authService.resetPassword(token, newPassword),
    onMutate: () => clearError(),
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
}
