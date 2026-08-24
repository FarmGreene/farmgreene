"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

import { LucideIcon } from "lucide-react";

interface TabItem {
  label: string;
  href?: string;
  value?: string;
  count?: number;
  icon?: LucideIcon;
}

interface TabNavigationProps {
  items: TabItem[];
  activeValue?: string; // For controlled mode
  onChange?: (value: string) => void; // For controlled mode
  className?: string;
}

export function TabNavigation({
  items,
  activeValue,
  onChange,
  className,
}: TabNavigationProps) {
  const pathname = usePathname();

  // Route-based active item: longest href that matches pathname exactly or as a path segment.
  // Using plain startsWith would match every ancestor tab (e.g. both "/dashboard/settings"
  // and "/dashboard/settings/security" match pathname "/dashboard/settings/security"),
  // so pick the single most specific (longest) href instead.
  const activeHref = React.useMemo(() => {
    let best: string | undefined;
    for (const item of items) {
      if (!item.href) continue;
      const matches =
        pathname === item.href || pathname.startsWith(item.href + "/");
      if (matches && (!best || item.href.length > best.length)) {
        best = item.href;
      }
    }
    return best;
  }, [items, pathname]);

  // Determine active state: either controlled (activeValue) or route-based (pathname matches href)
  const isActive = (item: TabItem) => {
    if (activeValue && item.value) {
      return activeValue === item.value;
    }
    if (item.href) {
      return item.href === activeHref;
    }
    return false;
  };

  return (
    <div
      className={cn(
        "relative flex h-11 w-fit items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800",
        className,
      )}
    >
      <div className="relative flex w-full items-center">
        {items.map((item) => {
          const isSelected = isActive(item);
          const Icon = item.icon;

          return (
            <div key={item.label} className="relative z-10 flex-1">
              {/* Render either a Link or a Button based on href presence */}
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "relative z-10 flex h-9 px-4 items-center justify-center rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap gap-2",
                    isSelected
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                  {item.count !== undefined && (
                    <span
                      className={cn(
                        "ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700",
                        isSelected && "bg-slate-100 dark:bg-slate-600",
                      )}
                    >
                      {item.count}
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => onChange?.(item.value || "")}
                  className={cn(
                    "relative z-10 flex h-9 px-4 items-center justify-center rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap w-full gap-2",
                    isSelected
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </button>
              )}

              {/* Sliding Background Pill */}
              {isSelected && (
                <motion.div
                  layoutId="tab-pill" // Shared ID for smooth transitions between items in this group
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm z-[-1]"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
