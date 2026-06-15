"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Wheat,
  CalendarClock,
  AlertCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import type { Assignment } from "@/lib/services/assignment.service";

interface AssignmentContextBannerProps {
  assignment?: Assignment | null;
  isLoading?: boolean;
  /** Fallback commodity name if no assignment loaded (e.g. direct navigation) */
  commodityName?: string;
  /** Fallback market from URL param */
  market?: string;
}

function CountdownBadge({
  countdown,
  status,
}: {
  countdown: string;
  status: Assignment["status"];
}) {
  const isOverdue = countdown.startsWith("Overdue");
  const isDueToday = countdown === "Due today";

  if (status === "SUBMITTED") {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800 font-medium">
        Completed
      </Badge>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full",
        isOverdue
          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          : isDueToday
            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            : "bg-muted text-muted-foreground",
      )}
    >
      {isOverdue ? (
        <AlertCircle className="w-3 h-3" />
      ) : (
        <Clock className="w-3 h-3" />
      )}
      {countdown}
    </span>
  );
}

export function AssignmentContextBanner({
  assignment,
  isLoading,
  commodityName,
  market,
}: AssignmentContextBannerProps) {
  const router = useRouter();

  const isOverdue = assignment?.countdown?.startsWith("Overdue") ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Back navigation */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Assignments
      </Button>

      <div
        className={cn(
          "rounded-2xl border overflow-hidden shadow-sm",
          isOverdue
            ? "border-red-200 dark:border-red-900/40 bg-red-50/60 dark:bg-red-950/10"
            : "border-border/70 bg-linear-to-br from-muted/40 to-muted/10",
        )}
      >
        {/* Accent bar */}
        <div
          className={cn(
            "h-1 w-full",
            isOverdue
              ? "bg-linear-to-r from-red-500 to-orange-500"
              : "bg-linear-to-r from-primary to-primary/50",
          )}
        />

        <div className="px-5 py-4 md:px-6 md:py-5">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-5 w-48" />
              <div className="flex gap-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Left: assignment info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1.5 rounded-md">
                    <Wheat className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {assignment?.commodity?.category ?? "Commodity"}
                    </p>
                    <h3 className="font-bold text-lg leading-tight">
                      {assignment?.commodity?.name ??
                        commodityName ??
                        "Price Submission"}
                      {assignment?.commodity?.unit && (
                        <span className="ml-2 text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                          per {assignment.commodity.unit}
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pl-1">
                  {(assignment?.marketName ?? market) && (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {assignment?.marketName ?? market}
                    </span>
                  )}
                  {assignment?.region && (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span className="w-3.5 h-3.5 shrink-0 text-center text-xs">
                        🌍
                      </span>
                      {assignment.region.replace(/_/g, " ")}
                    </span>
                  )}
                  {assignment?.dueDate && (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarClock className="w-3.5 h-3.5 shrink-0" />
                      Due{" "}
                      {new Date(assignment.dueDate).toLocaleDateString(
                        "en-NG",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: countdown badge + frequency */}
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                {assignment && (
                  <CountdownBadge
                    countdown={assignment.countdown}
                    status={assignment.status}
                  />
                )}
                {assignment?.frequency && (
                  <span className="text-xs font-medium bg-muted/70 px-2 py-0.5 rounded-md text-muted-foreground">
                    {assignment.frequency === "DAILY" ? "Daily" : "Weekly"}{" "}
                    Report
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
