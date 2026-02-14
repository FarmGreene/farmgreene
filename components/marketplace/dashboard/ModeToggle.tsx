"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { UserRole } from "@/types/marketplace";
import { cn } from "@/lib/utils";
import { Briefcase, Search } from "lucide-react";

interface ModeToggleProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function ModeToggle({ currentRole, onRoleChange }: ModeToggleProps) {
  return (
    <div className="relative flex h-11 w-fit items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800">
      <div className="relative flex w-full items-center">
        {/* Sliding Background Pill */}
        <div className="absolute inset-0 flex">
          <motion.div
            layout
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className={cn(
              "absolute top-0 bottom-0 my-auto h-full w-1/2 rounded-full shadow-sm",
              currentRole === "owner"
                ? "left-0 bg-white dark:bg-slate-700"
                : "left-1/2 bg-white dark:bg-slate-700",
            )}
          />
        </div>

        {/* Owner Trigger */}
        <button
          onClick={() => onRoleChange("owner")}
          className={cn(
            "relative z-10 flex h-9 w-32 items-center justify-center rounded-full text-sm font-medium transition-colors duration-200",
            currentRole === "owner"
              ? "text-slate-900 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
          )}
        >
          <Briefcase className="mr-2 h-4 w-4" />
          Manage
        </button>

        {/* Renter Trigger */}
        <button
          onClick={() => onRoleChange("renter")}
          className={cn(
            "relative z-10 flex h-9 w-32 items-center justify-center rounded-full text-sm font-medium transition-colors duration-200",
            currentRole === "renter"
              ? "text-slate-900 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
          )}
        >
          <Search className="mr-2 h-4 w-4" />
          Browse
        </button>
      </div>
    </div>
  );
}
