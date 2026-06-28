"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Layers } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CommodityVariant } from "@/types/commodity";

interface VariantSwitcherProps {
  variants?: CommodityVariant[] | null;
}

/**
 * Slim bar shown on a commodity's detail page when it belongs to a family with
 * siblings (e.g. Maize → White / Yellow / Flour). Selecting a variant navigates
 * to that variant's own detail page, which reloads its price, description,
 * image and analysis. Renders nothing for standalone commodities.
 */
export function VariantSwitcher({ variants }: VariantSwitcherProps) {
  const router = useRouter();

  // Only meaningful when there's more than one variant to switch between.
  if (!variants || variants.length < 2) return null;

  const active = variants.find((v) => v.active);

  function handleChange(id: string) {
    if (id === active?.id) return;
    router.push(`/dashboard/intelligence/commodity/${id}`);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Layers className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Variants
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {variants.length} types in this group
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Quick pills on wider screens */}
        <div className="hidden flex-wrap gap-2 md:flex">
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => handleChange(v.id)}
              className={
                v.active
                  ? "rounded-full bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-white"
                  : "rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Dropdown on small screens */}
        <div className="md:hidden">
          <Select value={active?.id} onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a variant" />
            </SelectTrigger>
            <SelectContent>
              {variants.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
