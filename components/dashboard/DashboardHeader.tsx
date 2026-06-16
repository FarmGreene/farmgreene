"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react"; // Bell for standard notifications if needed, though QuickAlert uses it too.
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SidebarSwitcher } from "@/components/layout/SidebarSwitcher";
import { UserProfilePopover } from "@/components/dashboard/header/UserProfilePopover";
import { QuickAlertCreateDialog } from "@/components/dashboard/header/QuickAlertCreateDialog";
import Link from "next/link";
import { FieldAgentOnboardingModal } from "@/components/onboarding/field-agent/FieldAgentOnboardingModal";
import { useAuthStore } from "@/lib/store/useAuthStore";

function DashboardHeaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const slugParam = searchParams.get("slug");
  const segments = pathname.split("/").filter((item) => item !== "");
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const user = useAuthStore((state) => state.user);
  const isAgent = user?.roles.includes("AGENT") ?? false;
  const isOnAgentDashboard = pathname.startsWith("/agent");

  // Auto-show onboarding modal for agents who haven't completed it
  React.useEffect(() => {
    if (!user) return;

    // Check if user is an agent and hasn't been verified
    const isAgent = user.roles.includes("AGENT");
    if (isAgent && user.agentStatus !== "active") {
      setShowOnboarding(true);
    }
  }, [user]);

  // Generate breadcrumbs from path segments
  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    // Enhanced Title Formatting: Alert -> Alerts, etc. if needed, or just Capitalize
    let title = segment.charAt(0).toUpperCase() + segment.slice(1);

    // If we are looking at a commodity ID segment, try to replace it with the human-readable slug
    if (index > 0 && segments[index - 1] === "commodity" && slugParam) {
      title = slugParam
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage className="font-medium text-slate-900 dark:text-slate-100">
              {title}
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              href={href}
              className="text-slate-500 hover:text-slate-700"
            >
              {title}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator className="text-slate-400" />}
      </React.Fragment>
    );
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 px-4 md:px-6 backdrop-blur-md justify-between transition-all">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden -ml-2 text-slate-500"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[260px] border-r-0">
            <SidebarSwitcher className="flex w-full h-full" />
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex items-center">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.length > 0 ? (
                breadcrumbItems
              ) : (
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Right: Search, Actions, Profile */}
      <div className="flex items-center justify-end gap-3 md:gap-4">
        {/* Search */}
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search market data, reports..."
            className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
          />
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Alert Dialog */}
          <QuickAlertCreateDialog />
          {!isAgent && (
            <Button
              id="agent-onboarding-trigger"
              size="sm"
              className="gap-2 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowOnboarding(true)}
            >
              Become an agent
            </Button>
          )}
          {isAgent && isOnAgentDashboard && (
            <Button
              id="agent-return-to-dashboard"
              size="sm"
              // variant="outline"
              className="gap-2"
              asChild
            >
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          )}
        </div>

        {/* User Profile */}
        <div className="pl-1">
          <UserProfilePopover />
        </div>
      </div>

      <FieldAgentOnboardingModal
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
      />
    </header>
  );
}

export function DashboardHeader() {
  return (
    <React.Suspense
      fallback={
        <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 px-4 md:px-6 backdrop-blur-md justify-between transition-all" />
      }
    >
      <DashboardHeaderContent />
    </React.Suspense>
  );
}
