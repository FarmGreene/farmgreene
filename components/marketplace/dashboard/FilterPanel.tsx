"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EquipmentCategory } from "@/types/marketplace";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  categories: { name: EquipmentCategory; count: number }[];
  selectedCategory: EquipmentCategory | null;
  onSelectCategory: (category: EquipmentCategory | null) => void;
}

export function FilterPanel({ categories, selectedCategory, onSelectCategory }: FilterPanelProps) {
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
              <FilterContent
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
              />
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
              <FilterContent
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function FilterContent({ categories, selectedCategory, onSelectCategory }: FilterPanelProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-3">
        <Label>Category</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat.name;
            return (
              <Badge
                key={cat.name}
                variant="secondary"
                onClick={() => onSelectCategory(active ? null : cat.name)}
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
        <div className="flex justify-between">
          <Label>Price Range</Label>
          <span className="text-xs text-muted-foreground">Up to ₦100k</span>
        </div>
        <Slider defaultValue={[50]} max={100} step={1} className="py-2" />
        <div className="flex items-center gap-2">
          <Input type="number" placeholder="Min" className="h-8 text-xs" />
          <span className="text-muted-foreground">-</span>
          <Input type="number" placeholder="Max" className="h-8 text-xs" />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-3">
        <Label>Location</Label>
        <Input placeholder="Enter city or state" />
      </div>

      {/* Sort By */}
      <div className="space-y-3">
        <Label>Sort By</Label>
        <div className="flex flex-col gap-2">
          {[
            { id: "recommended", label: "Recommended" },
            { id: "price_asc", label: "Price: Low to High" },
            { id: "price_desc", label: "Price: High to Low" },
          ].map((sort) => (
            <label
              key={sort.id}
              className="group flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <span className="text-sm font-medium">{sort.label}</span>
              <input
                type="radio"
                name="sort"
                value={sort.id}
                defaultChecked={sort.id === "recommended"}
                className="w-4 h-4 border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="ghost"
        className="w-full text-muted-foreground hover:text-red-500"
        onClick={() => onSelectCategory(null)}
      >
        <X className="mr-2 h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
}
