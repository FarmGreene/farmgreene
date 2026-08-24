"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NotificationFiltersProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  showUnreadOnly: boolean;
  onUnreadToggle: (checked: boolean) => void;
}

const TABS = [
  { id: "all", label: "All" },
  { id: "alert", label: "Alerts" },
  { id: "report", label: "Reports" },
  { id: "reminder", label: "Reminders" },
  { id: "signal", label: "Signals" },
  { id: "system", label: "System" },
];

export default function NotificationFilters({
  activeTab,
  onTabChange,
  showUnreadOnly,
  onUnreadToggle,
}: NotificationFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      {/* Premium Pill Tabs */}
      <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-full overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap outline-none",
              activeTab === tab.id
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Toggles */}
      <div className="flex items-center space-x-3 px-2">
        <Label
          htmlFor="unread-mode"
          className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer"
        >
          Unread only
        </Label>
        <Switch
          id="unread-mode"
          checked={showUnreadOnly}
          onCheckedChange={onUnreadToggle}
          className="data-[state=checked]:bg-emerald-600"
        />
      </div>
    </div>
  );
}
