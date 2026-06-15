"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Star, ThumbsUp, Wrench } from "lucide-react";

const CONDITIONS = [
  {
    value: "excellent" as const,
    label: "Excellent",
    description: "Like new. No visible wear or damage.",
    icon: Star,
    color: "emerald",
  },
  {
    value: "good" as const,
    label: "Good",
    description: "Minor wear, fully operational and reliable.",
    icon: ThumbsUp,
    color: "blue",
  },
  {
    value: "fair" as const,
    label: "Fair",
    description: "Some visible wear, but fully functional.",
    icon: Wrench,
    color: "amber",
  },
];

const colorMap: Record<
  string,
  { idle: string; selected: string; icon: string }
> = {
  emerald: {
    idle: "border-slate-200 dark:border-slate-700 hover:border-emerald-300",
    selected:
      "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/30",
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40",
  },
  blue: {
    idle: "border-slate-200 dark:border-slate-700 hover:border-blue-300",
    selected:
      "border-blue-500 bg-blue-50 dark:bg-blue-950/30 ring-2 ring-blue-500/30",
    icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/40",
  },
  amber: {
    idle: "border-slate-200 dark:border-slate-700 hover:border-amber-300",
    selected:
      "border-amber-500 bg-amber-50 dark:bg-amber-950/30 ring-2 ring-amber-500/30",
    icon: "bg-amber-100 text-amber-600 dark:bg-amber-900/40",
  },
};

interface ConditionSelectorProps {
  value: string;
  onChange: (value: "excellent" | "good" | "fair") => void;
}

export function ConditionSelector({ value, onChange }: ConditionSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {CONDITIONS.map((condition) => {
        const Icon = condition.icon;
        const isSelected = value === condition.value;
        const colors = colorMap[condition.color];

        return (
          <button
            key={condition.value}
            type="button"
            onClick={() => onChange(condition.value)}
            className={cn(
              "flex flex-col items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer",
              isSelected ? colors.selected : colors.idle
            )}
          >
            <div
              className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center",
                colors.icon
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-sm">{condition.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {condition.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
