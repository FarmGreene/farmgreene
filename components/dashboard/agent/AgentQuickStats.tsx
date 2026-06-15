"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Files,
  Clock,
  Banknote,
  Info,
  CheckCircle2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useAgentStats } from "@/lib/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: React.ElementType;
  sparklineData: any[];
  delay?: number;
  isLoading?: boolean;
}

function MetricCard({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  sparklineData,
  delay = 0,
  isLoading,
}: MetricCardProps) {
  const isPositive = (trend ?? 0) >= 0;

  if (isLoading) {
    return (
      <Card className="overflow-hidden border-0 shadow-sm bg-background/50 backdrop-blur-sm">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-8 w-full mt-2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all relative group bg-background/40 backdrop-blur-sm ring-1 ring-white/10 h-full">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <Icon className="w-4 h-4" />
            </div>
            {trend !== undefined && (
              <div
                className={cn(
                  "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full",
                  isPositive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-destructive/10 text-destructive",
                )}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                {Math.abs(trend)}%
              </div>
            )}
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
              {title}
            </p>
            <h3 className="text-xl font-bold tracking-tight mt-0.5">{value}</h3>
            {trendLabel && (
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                {trendLabel}
              </p>
            )}
          </div>

          <div className="h-8 mt-3 -mx-1 -mb-1 opacity-30 group-hover:opacity-60 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "#10b981" : "#ef4444"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface AccuracyCardProps {
  score: number;
  delay?: number;
  isLoading?: boolean;
}

function AccuracyCard({ score, delay = 0, isLoading }: AccuracyCardProps) {
  let colorClass = "text-destructive stroke-destructive";
  let bgClass = "bg-destructive/10";
  let glowClass = "shadow-destructive/20";

  if (score >= 90) {
    colorClass = "text-emerald-500 stroke-emerald-500";
    bgClass = "bg-emerald-500/10";
    glowClass = "shadow-emerald-500/20";
  } else if (score >= 75) {
    colorClass = "text-amber-500 stroke-amber-500";
    bgClass = "bg-amber-500/10";
    glowClass = "shadow-amber-500/20";
  }

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  if (isLoading) {
    return <Skeleton className="h-full w-full rounded-xl" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="md:col-span-2 lg:col-span-1"
    >
      <Card className="h-full border-0 shadow-sm relative overflow-hidden bg-background/40 backdrop-blur-sm ring-1 ring-white/10">
        <div
          className={cn(
            "absolute inset-0 opacity-10 pointer-events-none",
            bgClass,
          )}
        />
        <CardContent className="p-4 flex flex-col items-center justify-center h-full relative z-10 space-y-3">
          <div className="flex items-center w-full justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
              Accuracy
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[180px]">
                    Reliability score based on your submission quality.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="relative w-24 h-24 flex items-center justify-center">
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: score >= 90 ? "#10b981" : score >= 75 ? "#f59e0b" : "#ef4444",
                textColor: "inherit",
                trailColor: "rgba(255, 255, 255, 0.05)",
                strokeLinecap: "round",
                pathTransitionDuration: 1.5,
              })}
              className={cn("font-black tracking-tighter", colorClass.split(" ")[0])}
            />
          </div>

          <div
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
              bgClass,
              colorClass.split(" ")[0],
            )}
          >
            {score >= 90 ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <Clock className="w-3 h-3" />
            )}
            {score >= 90 ? "Excellent" : score >= 75 ? "Good" : "Warning"}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Mock data generator helper for sparklines
const generateSparkData = (val: number) => {
  return Array.from({ length: 6 }).map((_, i) => ({
    value: val + (Math.random() - 0.5) * 5,
  }));
};

export function AgentQuickStats() {
  const { data: stats, isLoading } = useAgentStats();

  const metrics = useMemo(() => {
    return [
      {
        title: "Submissions Today",
        value: stats?.submissionsToday ?? 0,
        trend: stats ? 12 : undefined,
        trendLabel: stats ? "from yesterday" : undefined,
        icon: FileText,
        sparklineData: generateSparkData(stats?.submissionsToday ?? 0),
      },
      {
        title: "Submissions This Week",
        value: stats?.submissionsThisWeek ?? 0,
        trend: stats ? 5 : undefined,
        trendLabel: stats ? "vs last week" : undefined,
        icon: Files,
        sparklineData: generateSparkData(stats?.submissionsThisWeek ?? 0),
      },
      {
        title: "Pending Reviews",
        value: stats?.pendingReviews ?? 0,
        icon: Clock,
        sparklineData: generateSparkData(stats?.pendingReviews ?? 0),
      },
      {
        title: "Estimated Earnings",
        value: `₦${(stats?.totalEarnings ?? 0).toLocaleString()}`,
        trend: stats?.earningsTrend,
        trendLabel: stats ? `+${stats.earningsTrend}% bonus` : undefined,
        icon: Banknote,
        sparklineData: generateSparkData(20),
      },
    ];
  }, [stats]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      <AccuracyCard score={stats?.accuracyScore ?? 90} delay={0.1} />
      {metrics.map((metric, index) => (
        <MetricCard key={metric.title} {...metric} delay={0.2 + index * 0.1} />
      ))}
    </div>
  );
}
