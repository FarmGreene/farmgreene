"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "@/components/dashboard/SidebarItem";
import {
  LayoutDashboard,
  BrainCircuit,
  Store,
  ClipboardList,
  FileText,
  Users,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Tractor,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store/useAuthStore";
import {
  getFullName,
  getInitials,
  getRoleLabel,
} from "@/lib/utils/user-display";
import { Logo } from "@/components/layout/Logo";
import { useUnreadCount } from "@/lib/hooks/useNotifications";

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useAuthStore((state) => state.user);
  const fullName = getFullName(user);
  const initials = getInitials(user);
  const roleLabel = getRoleLabel(user);
  const { data: unread } = useUnreadCount();

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-background border-r transition-all duration-300 ease-in-out z-50",
        isCollapsed ? "w-[60px]" : "w-[240px]",
        className,
      )}
    >
      {/* Sidebar Header / Logo */}
      <div
        className={cn(
          "flex items-center h-16 border-b px-4",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        {!isCollapsed && <Logo textSize="text-xl" iconSize={40} />}
        {isCollapsed && (
          <Logo textSize="text-[0px]" iconSize={30} variant="white" />
        )}{" "}
        {/* Simple logo placeholder */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-6 w-6 hidden md:flex",
            isCollapsed
              ? "absolute -right-3 top-6 bg-background border shadow-sm rounded-full"
              : "",
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {/* Main Workflows */}
          <SidebarItem
            icon={LayoutDashboard}
            label="Overview"
            href="/dashboard"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={BrainCircuit}
            label="Intelligence"
            href="/dashboard/intelligence"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={Store}
            label="Marketplace"
            href="/dashboard/marketplace"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={ClipboardList}
            label="My Rentals"
            href="/dashboard/rentals"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={FileText}
            label="Reports"
            href="/dashboard/reports"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={Activity}
            label="Watchlist & Alerts"
            href="/dashboard/watchlist"
            isCollapsed={isCollapsed}
          />

          <Separator className="my-2" />

          {/* System / Utility */}
          <div className={cn("mt-auto", isCollapsed ? "" : "pt-4")}>
            {/* <SidebarItem
              icon={Users}
              label="Manage Workspace"
              href="/dashboard/workspace"
              isCollapsed={isCollapsed}
            /> */}
            <SidebarItem
              icon={Bell}
              label="Notifications"
              href="/dashboard/notifications"
              isCollapsed={isCollapsed}
              badge={unread?.count || undefined}
            />
            <SidebarItem
              icon={Settings}
              label="Settings"
              href="/dashboard/settings"
              isCollapsed={isCollapsed}
            />
          </div>
        </nav>
      </div>

      {/* User Profile / Footer */}
      <div className="p-4 border-t">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              {user?.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={fullName} />
              ) : null}
              <AvatarFallback className="bg-green-700 text-white text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium truncate max-w-[120px]">
                {fullName}
              </span>
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                {roleLabel || "User"}
              </span>
            </div>
          </div>
        )}
        {isCollapsed && (
          <Avatar className="h-8 w-8 mx-auto">
            {user?.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={fullName} />
            ) : null}
            <AvatarFallback className="bg-green-700 text-white text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
