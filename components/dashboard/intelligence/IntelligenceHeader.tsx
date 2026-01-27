"use client";

import React from "react";
import { Filter, Calendar, MapPin, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IntelligenceHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-2">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Market Intelligence
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Track price movements, identify market signals, and uncover
          opportunities across agricultural commodities.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs font-medium bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
        >
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
          All Regions
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs font-medium bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
        >
          <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
          This Week
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs font-medium bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
        >
          <Layers className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
          All Categories
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Filter className="w-4 h-4 text-emerald-600" />
        </Button>
      </div>
    </div>
  );
}
