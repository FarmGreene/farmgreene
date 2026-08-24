"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutDashboard } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useHasRole } from "@/lib/store/useRoleHooks";
import { BecomeOwnerButton } from "./BecomeOwnerButton";

export function MarketplaceHeader() {
  const isOwner = useHasRole("OWNER");

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <PageHeader title="Marketplace" description="Find and rent equipment near you" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search equipment..."
            className="w-full pl-9 bg-white dark:bg-slate-900"
          />
        </div>
        {isOwner ? (
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/dashboard/marketplace/manage">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Manage Listings
            </Link>
          </Button>
        ) : (
          // Previously there was nothing here for non-owners, so somebody who
          // signed up without picking a role had no way to ever list anything.
          <BecomeOwnerButton />
        )}
      </div>
    </div>
  );
}
