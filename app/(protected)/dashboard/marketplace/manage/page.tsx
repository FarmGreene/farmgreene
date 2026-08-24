"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { OwnerStats } from "@/types/marketplace";
import { getOwnerStats } from "@/lib/services/marketplace.service";
import { RoleSummaryStrip } from "@/components/marketplace/dashboard/RoleSummaryStrip";
import { OwnerView } from "@/components/marketplace/dashboard/OwnerView";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useHasRole } from "@/lib/store/useRoleHooks";

export default function ManageListingsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isOwner = useHasRole("OWNER");

  // Owner-only page — bounce anyone else back to the marketplace. Only fires
  // once the auth store has actually resolved a user, so it doesn't redirect
  // during the brief window before auth hydrates.
  useEffect(() => {
    if (user && !isOwner) {
      router.replace("/dashboard/marketplace");
    }
  }, [user, isOwner, router]);

  const [stats, setStats] = useState<OwnerStats | undefined>(undefined);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    getOwnerStats()
      .then(setStats)
      .catch((err) => console.error("Failed to fetch owner stats", err))
      .finally(() => setStatsLoading(false));
  }, []);

  if (!user || !isOwner) return null;

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col space-y-8">
        <PageHeader
          title="Manage Listings"
          description="Manage your equipment and rental activity"
        />

        <RoleSummaryStrip role="owner" stats={stats} isLoading={statsLoading} />

        <Separator className="my-4" />

        <OwnerView />
      </div>
    </div>
  );
}
