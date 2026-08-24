"use client";

import React from "react";
import { Filter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PageHeader from "@/components/PageHeader";

export default function IntelligenceHeader() {
  return (
    <div className="flex flex-col gap-6 pb-2">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <PageHeader
          title="Market Intelligence"
          description="Real-time market signals and commodity insights."
        />

        <div className="flex items-center gap-3">
          {/* Minimalist Time Filter */}
          {/* <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
            <button className="px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-white bg-white dark:bg-slate-800 rounded shadow-sm transition-all hover:text-slate-900">
              7D
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              30D
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              3M
            </button>
          </div> */}

          {/* <Separator orientation="vertical" className="h-6 mx-1" /> */}

          {/* Minimalist Options */}
          {/* <Button
            variant="outline"
            size="sm"
            className="h-8 border-slate-200 dark:border-slate-800 text-xs font-medium"
          >
            <MapPin className="w-3.5 h-3.5 mr-2 text-slate-500" />
            All Regions
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-slate-200 dark:border-slate-800 text-xs font-medium"
          >
            <Filter className="w-3.5 h-3.5 mr-2 text-slate-500" />
            Filter
          </Button> */}
        </div>
      </div>
      <Separator className="bg-slate-100 dark:bg-slate-800/50" />
    </div>
  );
}
