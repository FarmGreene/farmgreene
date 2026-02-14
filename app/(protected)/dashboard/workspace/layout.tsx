"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Settings,
  LayoutDashboard,
  Users,
  ShieldCheck,
  BarChart2,
  Zap,
  CreditCard,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { TabNavigation } from "@/components/ui/tab-navigation";

const WORKSPACE_NAV_ITEMS = [
  { label: "Overview", href: "/dashboard/workspace", icon: LayoutDashboard },
  { label: "Members", href: "/dashboard/workspace/members", icon: Users },
  { label: "Roles", href: "/dashboard/workspace/roles", icon: ShieldCheck },
  {
    label: "Shared Views",
    href: "/dashboard/workspace/dashboards",
    icon: BarChart2,
  },
  { label: "Usage", href: "/dashboard/workspace/usage", icon: Zap },
  { label: "Billing", href: "/dashboard/workspace/billing", icon: CreditCard },
];

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full pb-20">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <PageHeader
            title="Farmgreene Lagos Ops"
            description="Manage your team, roles, and workspace settings from one place."
          />
          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-semibold px-2 py-0.5 self-start mt-1"
          >
            Pro Plan
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-slate-200 text-slate-500"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-9">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="overflow-x-auto pb-1 no-scrollbar">
        <TabNavigation items={WORKSPACE_NAV_ITEMS} className="w-[800px]" />
      </div>

      {/* 3. Page Content */}
      <div className="mt-0 outline-none animate-in fade-in-50 duration-300">
        {children}
      </div>
    </div>
  );
}
