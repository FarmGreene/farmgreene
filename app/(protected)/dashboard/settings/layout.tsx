"use client";

import React from "react";
import {
  User,
  Sliders,
  Shield,
  Bell,
  CreditCard,
  Briefcase,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { TabNavigation } from "@/components/ui/tab-navigation";

const SETTINGS_NAV_ITEMS = [
  { label: "Profile", href: "/dashboard/settings", icon: User },
  {
    label: "Preferences",
    href: "/dashboard/settings/preferences",
    icon: Sliders,
  },
  { label: "Security", href: "/dashboard/settings/security", icon: Shield },
  {
    label: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: Bell,
  },
  // {
  //   label: "Subscription",
  //   href: "/dashboard/settings/billing",
  //   icon: CreditCard,
  // },
  // {
  //   label: "Workspace",
  //   href: "/dashboard/settings/workspace",
  //   icon: Briefcase,
  // },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full pb-20">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Settings"
          description="Manage your account, preferences, and subscription"
        />
      </div>

      {/* 2. Navigation Tabs */}
      <div className="overflow-x-auto pb-1 no-scrollbar">
        <TabNavigation items={SETTINGS_NAV_ITEMS} />
      </div>

      {/* 3. Page Content */}
      <div className="mt-0 outline-none animate-in fade-in-50 duration-300">
        {children}
      </div>
    </div>
  );
}
