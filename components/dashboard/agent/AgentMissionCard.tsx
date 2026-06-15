"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Clock,
  MapPin,
  Store,
  Wheat,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAssignments } from "@/lib/hooks/useAssignments";

export type MissionStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "overdue"
  | "loading"
  | "empty";

interface AgentMissionCardProps {
  // Props are now optional as we fetch data internally for "today"
  status?: MissionStatus;
  region?: string;
  market?: string;
  commodities?: string[];
  completedSubmissions?: number;
  totalSubmissions?: number;
  deadline?: Date;
}

export function AgentMissionCard({
  deadline: forcedDeadline,
}: AgentMissionCardProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState("");

  // Fetch today's assignments
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const { data, isLoading } = useAssignments({
    fromDate: today,
    toDate: today,
    limit: 100,
  });

  const tasks = data?.data ?? [];
  const totalSubmissions = tasks.length;
  const completedSubmissions = tasks.filter(
    (t) => t.status === "SUBMITTED",
  ).length;
  const isAnyOverdue = tasks.some(
    (t) => t.status === "MISSED" || t.countdown.startsWith("Overdue"),
  );

  const commodities = Array.from(
    new Set(tasks.map((t) => t.commodity.name)),
  ).slice(0, 3);
  const remainingCommoditiesCount =
    new Set(tasks.map((t) => t.commodity.name)).size - 3;

  const firstTask = tasks[0];
  const region = firstTask?.region || "Unknown";
  const market = firstTask?.marketName || "Unknown Market";

  // Determine Overall Status
  const status: MissionStatus = useMemo(() => {
    if (isLoading) return "loading";
    if (totalSubmissions === 0) return "empty";
    if (completedSubmissions === totalSubmissions) return "completed";
    if (isAnyOverdue) return "overdue";
    if (completedSubmissions > 0) return "in-progress";
    return "not-started";
  }, [isLoading, totalSubmissions, completedSubmissions, isAnyOverdue]);

  // Default deadline to 6 PM today if not provided
  const targetDeadline =
    forcedDeadline || new Date(new Date().setHours(18, 0, 0, 0));

  // Progress calculation
  const progressPercentage =
    totalSubmissions > 0
      ? Math.min(
          Math.max((completedSubmissions / totalSubmissions) * 100, 0),
          100,
        )
      : 0;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDeadline.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("Deadline passed");
        return;
      }

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${hours}h ${minutes}m remaining`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [targetDeadline]);

  const handleActionClick = () => {
    if (status === "completed") {
      router.push("/agent/assignments");
      return;
    }

    const firstPending = tasks.find((t) => t.status === "PENDING" || t.status === "MISSED");
    if (firstPending) {
      const url = `/agent/assignments/${firstPending.commodity.id}?assignmentId=${firstPending.id}&market=${encodeURIComponent(firstPending.marketName ?? "")}`;
      router.push(url);
    } else {
      router.push("/agent/assignments");
    }
  };

  const statusConfig = {
    loading: {
      badge: "Loading...",
      badgeVariant: "secondary" as const,
      badgeClassName: "bg-muted animate-pulse",
      cta: "Please wait",
      message: "",
    },
    empty: {
      badge: "No Tasks",
      badgeVariant: "secondary" as const,
      badgeClassName: "bg-muted text-muted-foreground",
      cta: "Check Assignments",
      message: "No price reporting tasks assigned for today.",
    },
    "not-started": {
      badge: "Due Today",
      badgeVariant: "secondary" as const,
      badgeClassName:
        "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/15 dark:text-blue-400 dark:bg-blue-400/10 dark:border-blue-400/20",
      cta: "Start Reporting",
      message: "Ready to log today's market prices.",
    },
    "in-progress": {
      badge: "Updating",
      badgeVariant: "outline" as const,
      badgeClassName:
        "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/15 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20",
      cta: "Continue Tasks",
      message: "You're making great progress!",
    },
    completed: {
      badge: "Mission Complete",
      badgeVariant: "default" as const,
      badgeClassName:
        "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20",
      cta: "Review Today",
      message: "Fantastic! All assignments are submitted.",
    },
    overdue: {
      badge: "Overdue",
      badgeVariant: "destructive" as const,
      badgeClassName: "animate-pulse shadow-lg shadow-destructive/20",
      cta: "Urgent Update",
      message: "Priority needed! Some tasks are past their deadline.",
    },
  };

  const config = statusConfig[status];

  if (status === "loading") {
    return (
      <Card className="overflow-hidden border-0 shadow-xl bg-background/50 backdrop-blur-md">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
          <Skeleton className="h-32 w-full rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        className={cn(
          "overflow-hidden border-0 shadow-md relative group",
          status === "overdue"
            ? "ring-1 ring-destructive/30"
            : "ring-1 ring-primary/10",
          "bg-linear-to-br from-background via-background to-muted/20",
        )}
      >
        {/* Modern decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-700" />

        {/* Abstract Wheat Icon - subtle pattern */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none transform rotate-12 group-hover:scale-105 group-hover:rotate-0 transition-transform duration-1000">
          <Wheat size={240} />
        </div>

        <CardContent className="p-5 md:p-7 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-stretch justify-between gap-6">
            {/* Main Info Section */}
            <div className="space-y-5 flex-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                    <Zap size={18} className="fill-current" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                    Daily Mission
                  </h2>
                  <Badge
                    variant={config.badgeVariant}
                    className={cn(
                      "ml-auto sm:ml-2 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      config.badgeClassName,
                    )}
                  >
                    {status === "completed" && (
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                    )}
                    {status === "overdue" && (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {config.badge}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs md:text-sm max-w-lg leading-relaxed">
                  {status === "empty"
                    ? "Enjoy your break! No reporting tasks scheduled for today."
                    : `Provide real-time market insights for ${region}.`}
                </p>
              </div>

              {status !== "empty" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 uppercase">
                  <div className="flex items-center gap-3 bg-muted/40 backdrop-blur-sm rounded-xl p-3 border border-white/5 shadow-sm hover:shadow-md transition-all hover:bg-muted/60 hover:-translate-y-0.5 duration-300">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-widest text-muted-foreground/60">
                        Region
                      </p>
                      <p className="font-semibold text-xs">{region}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-muted/40 backdrop-blur-sm rounded-xl p-3 border border-white/5 shadow-sm hover:shadow-md transition-all hover:bg-muted/60 hover:-translate-y-0.5 duration-300">
                    <div className="bg-amber-500/10 p-2 rounded-lg">
                      <Store className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-widest text-muted-foreground/60">
                        Location
                      </p>
                      <p
                        className="font-semibold text-xs truncate max-w-[100px]"
                        title={market}
                      >
                        {market}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-muted/40 backdrop-blur-sm rounded-xl p-3 border border-white/5 shadow-sm hover:shadow-md transition-all hover:bg-muted/60 hover:-translate-y-0.5 duration-300 sm:col-span-2 lg:col-span-1">
                    <div className="bg-emerald-500/10 p-2 rounded-lg">
                      <Wheat className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold tracking-widest text-muted-foreground/60">
                        Focus Area
                      </p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-semibold text-xs truncate">
                          {commodities.join(", ")}
                        </p>
                        {remainingCommoditiesCount > 0 && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-600 px-1 py-0.5 rounded-full font-bold">
                            +{remainingCommoditiesCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Card Section */}
            <motion.div
              key="progress"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card/40 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl min-w-full lg:min-w-[320px] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <TrendingUp size={12} className="text-primary" />
                      <p className="text-[10px] font-bold uppercase tracking-widest">
                        Progress
                      </p>
                    </div>
                    <p className="text-3xl font-black tracking-tighter">
                      {completedSubmissions}
                      <span className="text-muted-foreground/40 text-xl font-light mx-1.5">
                        /
                      </span>
                      <span className="text-muted-foreground/60 text-xl font-medium">
                        {totalSubmissions}
                      </span>
                    </p>
                  </div>

                  {status !== "completed" && status !== "empty" && (
                    <div
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold bg-muted/50 border border-white/5 shadow-inner",
                        status === "overdue"
                          ? "text-destructive animate-pulse"
                          : "text-amber-500",
                      )}
                    >
                      <Clock className="w-3 h-3" />
                      {timeLeft}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    <span>Completion</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="relative h-2 w-full bg-muted/60 rounded-full overflow-hidden p-0.5 shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn(
                        "h-full rounded-full shadow-sm relative overflow-hidden",
                        status === "completed"
                          ? "bg-linear-to-r from-emerald-500 to-emerald-400"
                          : status === "overdue"
                            ? "bg-linear-to-r from-destructive to-red-400"
                            : "bg-linear-to-r from-primary to-primary/60",
                      )}
                    >
                      {/* Shimmer effect */}
                      <div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent w-full animate-shimmer"
                        style={{ backgroundSize: "200% 100%" }}
                      />
                    </motion.div>
                  </div>

                  <p
                    className={cn(
                      "text-xs font-medium pt-1 transition-colors",
                      status === "completed"
                        ? "text-emerald-500"
                        : status === "overdue"
                          ? "text-destructive font-bold"
                          : "text-muted-foreground",
                    )}
                  >
                    {config.message}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleActionClick}
                size="default"
                className={cn(
                  "w-full mt-5 h-11 rounded-xl group transition-all duration-300 font-bold text-sm shadow-lg",
                  status === "overdue"
                    ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-destructive/20"
                    : status === "completed"
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl",
                )}
              >
                {config.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Global CSS for the shimmer effect */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </motion.div>
  );
}
