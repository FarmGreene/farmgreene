import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-full" />}>
      {children}
    </Suspense>
  );
}
