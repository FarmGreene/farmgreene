"use client";

import { useCurrentUser } from "@/lib/hooks/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Automatically load user if we have a token
  useCurrentUser();

  return <>{children}</>;
}
