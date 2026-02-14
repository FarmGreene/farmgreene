"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./ModeToggle";
import { UserRole } from "@/types/marketplace";
import { Search } from "lucide-react";
import PageHeader from "@/components/PageHeader";

interface MarketplaceHeaderProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function MarketplaceHeader({
  role,
  onRoleChange,
}: MarketplaceHeaderProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <PageHeader
        title="Marketplace"
        description={
          role === "owner"
            ? "Manage your equipment and rental activity"
            : "Find and rent equipment near you"
        }
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={
              role === "owner"
                ? "Search your listings..."
                : "Search equipment..."
            }
            className="w-full pl-9 bg-white dark:bg-slate-900"
          />
        </div>
        <ModeToggle currentRole={role} onRoleChange={onRoleChange} />
      </div>
    </div>
  );
}
