"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EquipmentCategory } from "@/types/marketplace";
import { NIGERIAN_STATES } from "@/lib/data/nigeria-states-lgas";
import { DEFAULT_FILTERS, MarketplaceFilters, SortOption } from "@/lib/marketplace/filters";
import { cn } from "@/lib/utils";

const SORT_CHOICES: { id: SortOption; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
];

interface FilterPanelProps {
  categories: { name: EquipmentCategory; count: number }[];
  filters: MarketplaceFilters;
  onApply: (filters: MarketplaceFilters) => void;
  onClear: () => void;
}

export function FilterPanel({ categories, filters, onApply, onClear }: FilterPanelProps) {
  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FilterContent categories={categories} filters={filters} onApply={onApply} onClear={onClear} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-20">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FilterContent categories={categories} filters={filters} onApply={onApply} onClear={onClear} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function FilterContent({ categories, filters, onApply, onClear }: FilterPanelProps) {
  // Local draft — edits here don't touch the URL (and don't refetch/refilter
  // the list) until "Apply Filters" commits them. Keeps typing in the price
  // inputs from thrashing the URL on every keystroke.
  const [draft, setDraft] = useState<MarketplaceFilters>(filters);

  // The committed filters can change from outside this panel too (the "Top
  // Categories" tiles in BrowserView write straight to the URL) — stay in
  // sync so the draft never shows a stale category.
  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  function toggleCategory(name: EquipmentCategory) {
    setDraft((d) => ({ ...d, category: d.category === name ? null : name }));
  }

  function handleClear() {
    setDraft(DEFAULT_FILTERS);
    onClear();
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-3">
        <Label>Category</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = draft.category === cat.name;
            return (
              <Badge
                key={cat.name}
                variant="secondary"
                onClick={() => toggleCategory(cat.name)}
                className={cn(
                  "cursor-pointer transition-colors",
                  active
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "hover:bg-slate-200 dark:hover:bg-slate-700",
                )}
              >
                {cat.name} ({cat.count})
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label>Price Range (₦)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={0}
            placeholder="Min"
            className="h-8 text-xs"
            value={draft.minPrice ?? ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, minPrice: e.target.value === "" ? null : Number(e.target.value) }))
            }
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            min={0}
            placeholder="Max"
            className="h-8 text-xs"
            value={draft.maxPrice ?? ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, maxPrice: e.target.value === "" ? null : Number(e.target.value) }))
            }
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-3">
        <Label>State</Label>
        <Select
          value={draft.state ?? "all"}
          onValueChange={(v) => setDraft((d) => ({ ...d, state: v === "all" ? null : v }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any state</SelectItem>
            {NIGERIAN_STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort By */}
      <div className="space-y-3">
        <Label>Sort By</Label>
        <div className="flex flex-col gap-2">
          {SORT_CHOICES.map((sort) => (
            <label
              key={sort.id}
              className="group flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <span className="text-sm font-medium">{sort.label}</span>
              <input
                type="radio"
                name="sort"
                value={sort.id}
                checked={draft.sort === sort.id}
                onChange={() => setDraft((d) => ({ ...d, sort: sort.id }))}
                className="w-4 h-4 border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Apply / Clear */}
      <div className="space-y-2">
        <Button className="w-full" onClick={() => onApply(draft)}>
          Apply Filters
        </Button>
        <Button variant="ghost" className="w-full text-muted-foreground hover:text-red-500" onClick={handleClear}>
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
