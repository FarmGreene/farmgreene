"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isCollapsed?: boolean;
  badge?: number | string;
}

export function SidebarItem({
  icon: Icon,
  label,
  href,
  isCollapsed,
  badge,
}: SidebarItemProps) {
  const pathname = usePathname();

  // Exact-match for root-level section pages (e.g. "/dashboard", "/agent")
  // so that the Overview item doesn't stay active on every sub-route.
  // A href is considered a root page when it has only one non-empty path segment.
  const isRootPage = href.replace(/^\//, "").indexOf("/") === -1;
  const isActive = isRootPage
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 group",
        isActive
          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          : "text-muted-foreground hover:bg-slate-50 hover:text-foreground dark:hover:bg-slate-800",
        isCollapsed ? "justify-center px-2" : "",
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          isActive
            ? "text-green-600 dark:text-green-400"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      />
      {!isCollapsed && <span className="flex-1 truncate">{label}</span>}
      {!isCollapsed && badge && (
        <Badge
          variant="secondary"
          className="ml-auto h-5 px-1.5 min-w-5 flex items-center justify-center text-[10px] font-bold"
        >
          {badge}
        </Badge>
      )}
    </Link>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-2">
            {label}
            {badge && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                {badge}
              </Badge>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}
