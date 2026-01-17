"use client";

import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { AgentSidebar } from "@/components/layout/AgentSidebar";

export function SidebarSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();

  // Check if current route starts with /agent or /dashboard/agent
  // The user requirement specifically mentioned /agent/* routing structure for field agents.
  // Assuming the route might be /agent or /dashboard/agent depending on how nextjs routes are set up.
  // The user prompt said:
  // /agent
  //   ├── overview
  //   ...
  //
  // However, the file structure shows `app/(protected)/layout.tsx`.
  // If the user is moving to a root /agent group, that would be in `app/agent` or `app/(agent)`.
  // But the user said: "Start with /agent".
  // Wait, if the user wants /agent to be a top level route, I might need to clarify if it shares the same layout as dashboard.
  // The current layout is `app/(protected)/layout.tsx`.
  // If I put `SidebarSwitcher` in `app/(protected)/layout.tsx`, then /agent needs to be under (protected).
  // Let's assume the routes will be `app/(protected)/agent/...` OR `app/agent/...` using the same layout?
  // If `app/agent` is a sibling to `app/dashboard` under `(protected)`, then `pathname` will support it.

  const isAgentRoute =
    pathname?.startsWith("/agent") || pathname?.startsWith("/dashboard/agent");

  if (isAgentRoute) {
    return <AgentSidebar className={className} />;
  }

  return <DashboardSidebar className={className} />;
}
