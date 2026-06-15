"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "@/components/dashboard/SidebarItem";
import {
  Home,
  ClipboardList,
  Tag,
  Store,
  FileText,
  TrendingUp,
  User,
  ChevronLeft,
  ChevronRight,
  Tractor,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AgentSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AgentSidebar({ className }: AgentSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname(); // needed for PrimaryActionItem active state

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
        {!isCollapsed && <Logo textSize="text-xl" />}
        {isCollapsed && (
          <Tractor
            size={20}
            className={cn("text-green-600 fill-green-100")}
            strokeWidth={2.5}
          />
        )}
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
          {/* Primary */}
          <SidebarItem
            icon={Home}
            label="Overview"
            href="/agent"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={ClipboardList}
            label="Assignments"
            href="/agent/assignments"
            isCollapsed={isCollapsed}
          />
          {/* <SidebarItem
            icon={Tag}
            label="Update Prices"
            href="/agent/assignments"
            isCollapsed={isCollapsed}
          /> */}

          {/* Primary Action - Custom Styling */}

          {/* <Separator className="my-2" /> */}

          {/* Secondary */}
          {/* <SidebarItem
            icon={Store}
            label="Markets"
            href="/agent/markets"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={FileText}
            label="Reports"
            href="/agent/reports"
            isCollapsed={isCollapsed}
          /> */}

          {/* <Separator className="my-2" /> */}

          {/* Tertiary */}
          <SidebarItem
            icon={TrendingUp}
            label="Performance"
            href="/agent/performance"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={User}
            label="Profile"
            href="/agent/profile"
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>

      {/* User Profile / Footer */}
      <div className="p-4 border-t">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
              <User size={16} className="text-slate-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Field Agent</span>
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                Online
              </span>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="h-8 w-8 mx-auto rounded-full bg-slate-200 flex items-center justify-center">
            <User size={16} className="text-slate-500" />
          </div>
        )}
      </div>
    </div>
  );
}

// Internal component for the highlighted primary action
function PrimaryActionItem({
  icon: Icon,
  label,
  href,
  isCollapsed,
  isActive,
  className,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  isCollapsed: boolean;
  isActive: boolean;
  className?: string;
}) {
  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 group",
        isActive
          ? "bg-green-600 text-white shadow-md hover:bg-green-700"
          : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50",
        isCollapsed ? "justify-center px-2" : "",
        className,
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          isActive ? "text-white" : "text-green-700 dark:text-green-400",
        )}
      />
      {!isCollapsed && <span className="flex-1 truncate">{label}</span>}
    </Link>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent
            side="right"
            className="font-medium bg-green-600 text-white border-green-700"
          >
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}
