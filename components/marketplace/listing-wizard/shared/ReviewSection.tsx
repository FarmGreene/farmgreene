"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ReviewSection({ title, children }: ReviewSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border rounded-xl overflow-hidden bg-white dark:bg-slate-950">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
      >
        <span className="font-semibold text-sm">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
