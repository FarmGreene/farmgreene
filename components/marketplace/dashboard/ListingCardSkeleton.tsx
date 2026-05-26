"use client";

import React from "react";


export function ListingCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800/80 rounded-[22px] overflow-hidden animate-pulse">
      {/* Aspect-ratio [1.5] image container skeleton */}
      <div className="relative aspect-[1.5] w-full bg-slate-100 dark:bg-slate-800/60" />

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Subtitle & Title Skeleton */}
          <div className="space-y-1">
            <div className="h-2.5 w-16 bg-slate-100 dark:bg-slate-800 rounded" />
            <div className="h-4.5 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>

          {/* Quick Specs Row Skeletons (Single row, compact badges) */}
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="h-4.5 w-10 bg-slate-100 dark:bg-slate-800 rounded-md" />
            <div className="h-4.5 w-14 bg-slate-100 dark:bg-slate-800 rounded-md" />
            <div className="h-4.5 w-12 bg-slate-100 dark:bg-slate-800 rounded-md" />
          </div>

          {/* Location skeleton */}
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-slate-100 dark:bg-slate-800 rounded-full" />
            <div className="h-3.5 w-1/3 bg-slate-100 dark:bg-slate-800 rounded-md" />
          </div>
        </div>

        {/* Price + Button Bottom Row unified skeleton */}
        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 w-full">
          {/* Price Block Skeleton */}
          <div className="space-y-1 w-1/3">
            <div className="h-2 w-8 bg-slate-100 dark:bg-slate-800 rounded" />
            <div className="h-4.5 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>

          {/* Button Action Skeleton */}
          <div className="h-9 w-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
