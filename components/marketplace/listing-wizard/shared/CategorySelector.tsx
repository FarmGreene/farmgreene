"use client";

import React from "react";
import {
  Tractor,
  Combine,
  Sprout,
  Droplets,
  Warehouse,
  Wrench,
  Shovel,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EquipmentCategory } from "@/types/marketplace";

const CATEGORIES: {
  value: EquipmentCategory;
  label: string;
  icon: React.ElementType;
  color: string;
  subcategories: string[];
}[] = [
  {
    value: "Tractors & Power",
    label: "Tractors & Power",
    icon: Tractor,
    color: "emerald",
    subcategories: ["2WD Tractor", "4WD Tractor", "Power Tiller", "Generator"],
  },
  {
    value: "Harvesting",
    label: "Harvesting",
    icon: Combine,
    color: "amber",
    subcategories: [
      "Combine Harvester",
      "Cassava Harvester",
      "Yam Digger",
      "Thresher",
      "Rice Mill",
    ],
  },
  {
    value: "Planting & Seeding",
    label: "Planting & Seeding",
    icon: Sprout,
    color: "green",
    subcategories: ["Seed Drill", "Planter", "Broadcaster", "Transplanter"],
  },
  {
    value: "Irrigation Systems",
    label: "Irrigation",
    icon: Droplets,
    color: "blue",
    subcategories: [
      "Drip Kit",
      "Sprinkler System",
      "Water Pump",
      "Borehole Pump",
    ],
  },
  {
    value: "Processing & Storage",
    label: "Processing & Storage",
    icon: Warehouse,
    color: "orange",
    subcategories: ["Dryer", "Sheller", "Grinder", "Thresher", "Cold Storage"],
  },
  {
    value: "Tractor Attachments",
    label: "Attachments",
    icon: Wrench,
    color: "purple",
    subcategories: ["Plough", "Harrow", "Ridger", "Rotavator", "Trailer"],
  },
  {
    value: "Hand Tools & Accessories",
    label: "Hand Tools",
    icon: Shovel,
    color: "slate",
    subcategories: [
      "Knapsack Sprayer",
      "Hoe Set",
      "Cutlass Set",
      "Watering Can",
    ],
  },
];

const colorMap: Record<string, string> = {
  emerald:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30",
  amber:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30",
  green:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30",
  blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30",
  orange:
    "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/30",
  purple:
    "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/30",
  slate:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950/30",
};

const selectedColorMap: Record<string, string> = {
  emerald:
    "border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400",
  amber: "border-amber-500 bg-amber-500 text-white dark:border-amber-400",
  green: "border-green-500 bg-green-500 text-white dark:border-green-400",
  blue: "border-blue-500 bg-blue-500 text-white dark:border-blue-400",
  orange: "border-orange-500 bg-orange-500 text-white dark:border-orange-400",
  purple: "border-purple-500 bg-purple-500 text-white dark:border-purple-400",
  slate: "border-slate-500 bg-slate-600 text-white dark:border-slate-400",
};

interface CategorySelectorProps {
  value: string;
  onChange: (category: EquipmentCategory) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isSelected = value === cat.value;
        return (
          <button
            key={cat.value}
            type="button"
            onClick={() => onChange(cat.value)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center cursor-pointer",
              isSelected
                ? selectedColorMap[cat.color]
                : `${colorMap[cat.color]} hover:border-opacity-70`
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                isSelected ? "bg-white/20" : "bg-white dark:bg-slate-800"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold leading-tight">
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Returns the subcategories for a given category */
export function getSubcategories(category: EquipmentCategory): string[] {
  return (
    CATEGORIES.find((c) => c.value === category)?.subcategories ?? []
  );
}
