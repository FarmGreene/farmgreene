"use client";

import React, { useState } from "react";
import { UserRole } from "@/types/marketplace";
import { MarketplaceHeader } from "@/components/marketplace/dashboard/MarketplaceHeader";
import { RoleSummaryStrip } from "@/components/marketplace/dashboard/RoleSummaryStrip";
import { OwnerView } from "@/components/marketplace/dashboard/OwnerView";
import { BrowserView } from "@/components/marketplace/dashboard/BrowserView";
import {
  MOCK_OWNER_STATS,
  MOCK_MY_LISTINGS,
  MOCK_RENTAL_REQUESTS,
  MOCK_BROWSER_LISTINGS,
} from "@/lib/mock-marketplace-data";
import { Separator } from "@/components/ui/separator";

export default function MarketplacePage() {
  const [role, setRole] = useState<UserRole>("owner");

  return (
    <div className="flex-1 space-y-6 pt-6">
      <div className="flex flex-col space-y-8">
        {/* Header & Role Switcher */}
        <MarketplaceHeader role={role} onRoleChange={setRole} />

        {/* Role-Aware Summary Strip */}
        <RoleSummaryStrip role={role} stats={MOCK_OWNER_STATS} />

        <Separator className="my-4" />

        {/* Dynamic Content View */}
        <div className="min-h-[500px]">
          {role === "owner" ? (
            <OwnerView
              listings={MOCK_MY_LISTINGS}
              requests={MOCK_RENTAL_REQUESTS}
            />
          ) : (
            <BrowserView listings={MOCK_BROWSER_LISTINGS} />
          )}
        </div>
      </div>
    </div>
  );
}
