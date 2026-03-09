"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Files,
  Clock,
  Banknote,
  Info,
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

// Mock data for sparklines
const generateSparklineData = (trend: "up" | "down") => {
  return Array.from({ length: 7 }).map((_, i) => ({
    value:
      trend === "up"
        ? 10 + i * 2 + Math.random() * 5
        : 20 - i * 1.5 + Math.random() * 5,
  }));
};

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: number;
  trendLabel: string;
  icon: React.ElementType;
  sparklineData: any[];
  delay?: number;
}

function MetricCard({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  sparklineData,
  delay = 0,
}: MetricCardProps) {
  const isPositive = trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow relative group">
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
              <Icon className="w-5 h-5" />
            </div>
            <div
              className={cn(
                "flex items-center text-xs font-semibold px-2 py-1 rounded-full",
                isPositive
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive-foreground",
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {Math.abs(trend)}%
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight mt-1 mb-1">
              {value}
            </h3>
            <p className="text-xs text-muted-foreground">{trendLabel}</p>
          </div>

          <div className="h-10 mt-4 -mx-2 -mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
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
}

function AccuracyCard({ score, delay = 0 }: AccuracyCardProps) {
  // Determine color based on PRD: 90-100% Green, 75-89% Yellow, Below 75% Red
  let colorClass = "text-destructive stroke-destructive";
  let bgClass = "bg-destructive/10";

  if (score >= 90) {
    colorClass = "text-emerald-500 stroke-emerald-500";
    bgClass = "bg-emerald-500/10";
  } else if (score >= 75) {
    colorClass = "text-amber-500 stroke-amber-500";
    bgClass = "bg-amber-500/10";
  }

  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="md:col-span-2 lg:col-span-1"
    >
      <Card className="h-full border-0 shadow-sm relative overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 opacity-20 pointer-events-none",
            bgClass,
          )}
        />
        <CardContent className="p-5 flex flex-col items-center justify-center h-full relative z-10 space-y-4">
          <div className="flex items-center w-full justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Accuracy Score
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-[200px]">
                    Accuracy is calculated based on approved vs rejected
                    submissions.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                className="stroke-muted"
                strokeWidth={8}
                fill="none"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r={radius}
                className={colorClass}
                strokeWidth={8}
                strokeDasharray={circumference}
                strokeLinecap="round"
                fill="none"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: delay + 0.2,
                }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-bold">{score}%</span>
            </div>
          </div>
          <p
            className={cn(
              "text-xs font-medium px-3 py-1 rounded-full",
              bgClass,
              colorClass.split(" ")[0],
            )}
          >
            {score >= 90
              ? "Excellent Performance"
              : score >= 75
                ? "Needs Improvement"
                : "Critical Warning"}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function AgentQuickStats() {
  const metrics = [
    {
      title: "Submissions Today",
      value: "8",
      trend: 14,
      trendLabel: "vs yesterday",
      icon: FileText,
      sparklineData: generateSparklineData("up"),
    },
    {
      title: "Submissions This Week",
      value: "42",
      trend: 5,
      trendLabel: "vs last week",
      icon: Files,
      sparklineData: generateSparklineData("up"),
    },
    {
      title: "Pending Reviews",
      value: "3",
      trend: -12,
      trendLabel: "vs last week",
      icon: Clock,
      sparklineData: generateSparklineData("down"),
    },
    {
      title: "Total Earnings",
      value: "₦24,500",
      trend: 8,
      trendLabel: "vs last week",
      icon: Banknote,
      sparklineData: generateSparklineData("up"),
    },
  ];

  return (
    <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-5 md:overflow-visible md:pb-0 gap-4 [&>div]:min-w-[260px] md:[&>div]:min-w-0 [&>div]:snap-center hide-scrollbar">
      <AccuracyCard score={92} delay={0.1} />
      {metrics.map((metric, index) => (
        <MetricCard key={metric.title} {...metric} delay={0.2 + index * 0.1} />
      ))}
    </div>
  );
}
