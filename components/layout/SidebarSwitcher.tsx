"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

/**
 * Field agents now have their own dedicated app, so the consumer app only ever
 * renders the dashboard sidebar. Kept as a thin wrapper so existing call sites
 * (protected layout + mobile header sheet) don't need to change.
 */
export function SidebarSwitcher({ className }: { className?: string }) {
  return <DashboardSidebar className={className} />;
}
