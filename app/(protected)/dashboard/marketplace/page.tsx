"use client";

import { MarketplaceHeader } from "@/components/marketplace/dashboard/MarketplaceHeader";
import { BrowserView } from "@/components/marketplace/dashboard/BrowserView";
import { Separator } from "@/components/ui/separator";

export default function MarketplacePage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col space-y-8">
        <MarketplaceHeader />

        <Separator className="my-4" />

        <div className="min-h-[500px]">
          <BrowserView />
        </div>
      </div>
    </div>
  );
}
