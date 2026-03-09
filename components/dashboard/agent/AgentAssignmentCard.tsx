"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  CalendarClock,
  Calendar,
  RefreshCcw,
} from "lucide-react";
import Link from "next/link";
import type { Assignment } from "@/lib/services/assignment.service";

interface AgentAssignmentCardProps {
  assignment: Assignment;
  delay?: number;
}

function StatusBadge({ status }: { status: Assignment["status"] }) {
  const cfg = {
    PENDING: {
      label: "Due",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    },
    SUBMITTED: {
      label: "Submitted",
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    },
    MISSED: {
      label: "Missed",
      className:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
    },
  }[status];

  const Icon =
    status === "SUBMITTED"
      ? CheckCircle2
      : status === "MISSED"
        ? AlertCircle
        : Clock;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border",
        cfg.className,
      )}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

export function AgentAssignmentCard({
  assignment,
  delay = 0,
}: AgentAssignmentCardProps) {
  const isOverdue = assignment.countdown.startsWith("Overdue");
  const isDueToday = assignment.countdown === "Due today";
  const isCompleted = assignment.status === "SUBMITTED";

  const urgencyClass = isOverdue
    ? "border-l-4 border-l-red-500"
    : isDueToday
      ? "border-l-4 border-l-amber-500"
      : "border-l-4 border-l-slate-200 dark:border-l-slate-700";

  const submitUrl = `/agent/update-prices?commodityId=${assignment.commodity.id}&market=${encodeURIComponent(assignment.marketName ?? "")}&assignmentId=${assignment.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      <div
        className={cn(
          "group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200",
          urgencyClass,
          isCompleted && "opacity-70",
        )}
      >
        {/* Subtle overdue overlay */}
        {isOverdue && (
          <div className="absolute inset-0 bg-red-500/3 pointer-events-none" />
        )}

        <div className="p-4 sm:p-5">
          {/* Top row: commodity + status */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {assignment.commodity.category ?? "Commodity"}
              </p>
              <h3 className="font-semibold text-sm sm:text-base leading-tight truncate">
                {assignment.commodity.name}
              </h3>
            </div>
            <div className="shrink-0 flex flex-col items-end gap-1.5">
              <StatusBadge status={assignment.status} />
              <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                <RefreshCcw className="w-2.5 h-2.5" />
                {assignment.frequency === "DAILY" ? "Daily" : "Weekly"}
              </span>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
            {assignment.marketName && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[180px]">
                  {assignment.marketName}
                </span>
              </span>
            )}
            {assignment.region && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 shrink-0" />
                {assignment.region.replace(/_/g, " ")}
              </span>
            )}
          </div>

          {/* Countdown + CTA */}
          <div className="flex items-center justify-between gap-3">
            <span
              className={cn(
                "flex items-center gap-1.5 text-xs font-semibold",
                isOverdue
                  ? "text-red-600 dark:text-red-400"
                  : isDueToday
                    ? "text-amber-600 dark:text-amber-400"
                    : isCompleted
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-muted-foreground",
              )}
            >
              <CalendarClock className="w-3.5 h-3.5" />
              {assignment.countdown}
            </span>

            {!isCompleted ? (
              <Button
                asChild
                size="sm"
                className={cn(
                  "h-8 text-xs gap-1.5 group/btn",
                  isOverdue
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white",
                )}
              >
                <Link href={submitUrl}>
                  Submit Price
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="h-8 text-xs gap-1.5"
              >
                <Link href={`/agent/assignments/${assignment.id}`}>
                  View
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            )}
          </div>

          {/* Admin note */}
          {assignment.note && (
            <p className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground italic leading-relaxed">
              📌 {assignment.note}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
