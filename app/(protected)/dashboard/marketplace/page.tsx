"use client";

import React, { useState } from "react";
import { UserRole, OwnerStats } from "@/types/marketplace";
import { MarketplaceHeader } from "@/components/marketplace/dashboard/MarketplaceHeader";
import { RoleSummaryStrip } from "@/components/marketplace/dashboard/RoleSummaryStrip";
import { getOwnerStats } from "@/lib/services/marketplace.service";
import { OwnerView } from "@/components/marketplace/dashboard/OwnerView";
import { BrowserView } from "@/components/marketplace/dashboard/BrowserView";
import { Separator } from "@/components/ui/separator";

export default function MarketplacePage() {
  const [role, setRole] = useState<UserRole>("owner");
  const [stats, setStats] = useState<OwnerStats | undefined>(undefined);
  const [statsLoading, setStatsLoading] = useState(true);

  React.useEffect(() => {
    if (role === "owner") {
      setStatsLoading(true);
      getOwnerStats()
        .then((data) => {
          setStats(data);
          setStatsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch owner stats", err);
          setStatsLoading(false);
        });
    }
  }, [role]);

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col space-y-8">
        {/* Header & Role Switcher */}
        <MarketplaceHeader role={role} onRoleChange={setRole} />

        {/* Role-Aware Summary Strip */}
        <RoleSummaryStrip role={role} stats={stats} isLoading={statsLoading} />

        <Separator className="my-4" />

        {/* Dynamic Content View */}
        <div className="min-h-[500px]">
          {role === "owner" ? (
            <OwnerView
              listings={[]}
              requests={[]}
            />
          ) : (
            <BrowserView listings={[]} />
          )}
        </div>
      </div>
    </div>
  );
}
