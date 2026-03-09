"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useAssignments } from "@/lib/hooks/useAssignments";
import type { Assignment } from "@/lib/services/assignment.service";

function MiniAssignmentRow({ assignment }: { assignment: Assignment }) {
  const isOverdue = assignment.countdown.startsWith("Overdue");
  const isCompleted = assignment.status === "SUBMITTED";
  const Icon = isCompleted ? CheckCircle2 : isOverdue ? AlertTriangle : Clock;

  const iconClass = isCompleted
    ? "text-emerald-500"
    : isOverdue
      ? "text-red-500"
      : "text-amber-500";

  const submitUrl = `/agent/update-prices?commodityId=${assignment.commodity.id}&market=${encodeURIComponent(assignment.marketName ?? "")}&assignmentId=${assignment.id}`;

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border/40 last:border-0 group">
      <Icon className={cn("w-4 h-4 shrink-0", iconClass)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {assignment.commodity.name}
        </p>
        {assignment.marketName && (
          <p className="text-xs text-muted-foreground truncate">
            {assignment.marketName}
          </p>
        )}
      </div>
      <span
        className={cn(
          "text-xs font-semibold shrink-0",
          isOverdue
            ? "text-red-600"
            : isCompleted
              ? "text-emerald-600"
              : "text-amber-600",
        )}
      >
        {isCompleted ? "Done" : isOverdue ? "Overdue" : "Due"}
      </span>
      {!isCompleted && (
        <Button
          asChild
          size="sm"
          className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700 text-white shrink-0"
        >
          <Link href={submitUrl}>Submit</Link>
        </Button>
      )}
    </div>
  );
}

export function AgentTodaysTasks() {
  const today = new Date().toISOString().slice(0, 10);
  const { data, isLoading } = useAssignments({
    fromDate: today,
    toDate: today,
    limit: 5,
  });
  const tasks = data?.data ?? [];
  const totalToday = data?.meta.total ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="border-0 shadow-sm h-full">
        <CardHeader className="pb-3 border-b/50 px-5 bg-muted/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <ClipboardList className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-base font-semibold">
                Today&apos;s Tasks
              </CardTitle>
              {totalToday > 0 && (
                <span className="text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                  {totalToday}
                </span>
              )}
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs text-primary hover:text-primary/80 group hidden sm:flex"
            >
              <Link href="/agent/assignments">
                All Assignments{" "}
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-5 pt-2 pb-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <p className="text-sm font-medium">You&apos;re all caught up!</p>
              <p className="text-xs text-muted-foreground">
                No assignments due today.
              </p>
            </div>
          ) : (
            <div className="divide-y-0">
              {tasks.map((task) => (
                <MiniAssignmentRow key={task.id} assignment={task} />
              ))}
              {totalToday > 5 && (
                <div className="pt-3">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full text-xs gap-1.5"
                  >
                    <Link href="/agent/assignments">
                      View all {totalToday} assignments
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
