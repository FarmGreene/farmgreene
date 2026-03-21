"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Flame,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAssignments } from "@/lib/hooks/useAssignments";
import { useAgentStats } from "@/lib/hooks/useUser";
import { motion, AnimatePresence } from "motion/react";

export default function RoleActionWidget() {
  const today = new Date().toISOString().split("T")[0];

  // Fetch today's assignments to track progress
  const { data: assignmentsData, isLoading: assignmentsLoading } =
    useAssignments({
      fromDate: today,
      toDate: today,
    });

  // Fetch overall agent stats for gamification
  const { data: stats, isLoading: statsLoading } = useAgentStats();

  const isLoading = assignmentsLoading || statsLoading;

  // Derive progress and market info
  const { progress, assignedMarket, lastHeard } = useMemo(() => {
    if (!assignmentsData?.data || assignmentsData.data.length === 0) {
      return {
        progress: { completed: 0, total: 0 },
        assignedMarket: "No assigned market",
        lastHeard: "No activity yet Today",
      };
    }

    const total = assignmentsData.data.length;
    const completed = assignmentsData.data.filter(
      (a) => a.status === "SUBMITTED",
    ).length;
    const market = assignmentsData.data[0]?.marketName || "Unknown Market";

    return {
      progress: { completed, total },
      assignedMarket: market,
      lastHeard: "Updated Today",
    };
  }, [assignmentsData]);

  const progressPercentage =
    progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
  const isCompleted =
    progress.total > 0 && progress.completed === progress.total;
  const isStarted = progress.completed > 0;

  if (isLoading) {
    return <WidgetSkeleton />;
  }

  return (
    <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-slate-900 relative">
      {/* Background Decorator */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full pointer-events-none" />

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <Badge
              variant="outline"
              className="mb-2 text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20"
            >
              Field Agent Daily
            </Badge>
            <CardTitle className="text-xl font-bold">Today's Tasks</CardTitle>
          </div>
          <div className="flex flex-col items-end text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {assignedMarket}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              {lastHeard}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Section 2: Submission Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              Submission Progress
            </span>
            <span className="text-muted-foreground">
              <span
                className={cn(
                  "font-bold text-foreground",
                  isCompleted ? "text-green-600" : "",
                )}
              >
                {progress.completed}
              </span>
              /{progress.total} commodities
            </span>
          </div>

          <div className="relative pt-1">
            <Progress
              value={progressPercentage}
              className="h-2.5 bg-slate-100 dark:bg-slate-800"
            />
          </div>

          {/* Status Message */}
          <div className="flex items-center gap-2 text-sm pt-1">
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 dark:text-green-400 font-medium">
                    All caught up! Great work.
                  </span>
                </motion.div>
              ) : isStarted ? (
                <motion.div
                  key="started"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-muted-foreground">
                    You have pending submissions.
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="not-started"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-500 font-medium">
                    No prices submitted yet.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Section 3: Quick Action (Primary CTA) */}
        <Link href="/agent">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/10 h-12 text-base font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]"
            disabled={isCompleted && progress.total > 0}
          >
            Go to dashboard
          </Button>
        </Link>

        {/* Section 4: Performance Snapshot (Gamification) */}
        <div className="grid grid-cols-3 gap-2 py-2 border-t border-dashed mt-4">
          <StatCard
            icon={<Flame className="h-5 w-5 text-orange-500" />}
            value={(stats?.currentStreak || 0).toString()}
            label="Day Streak"
            bgColor="bg-orange-50 dark:bg-orange-900/10"
            borderColor="border-orange-100 dark:border-orange-800/20"
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
            value={(stats?.points || 0).toString()}
            label="Pts Today"
            bgColor="bg-blue-50 dark:bg-blue-900/10"
            borderColor="border-blue-100 dark:border-blue-800/20"
          />
          <StatCard
            icon={<Trophy className="h-5 w-5 text-purple-500" />}
            value={
              stats?.accuracyScore
                ? `${Math.round(stats.accuracyScore)}%`
                : "#--"
            }
            label="Accuracy"
            bgColor="bg-purple-50 dark:bg-purple-900/10"
            borderColor="border-purple-100 dark:border-purple-800/20"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({
  icon,
  value,
  label,
  bgColor,
  borderColor,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-lg border",
        bgColor,
        borderColor,
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-lg font-bold text-foreground">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </span>
    </div>
  );
}

function WidgetSkeleton() {
  return (
    <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-slate-900">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-7 w-32" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-2.5 w-full" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-3 gap-2 py-2 border-t border-dashed mt-4">
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
