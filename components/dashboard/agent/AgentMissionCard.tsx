"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Clock,
  MapPin,
  Store,
  Wheat,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export type MissionStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "overdue";

interface AgentMissionCardProps {
  status?: MissionStatus;
  region?: string;
  market?: string;
  commodities?: string[];
  completedSubmissions?: number;
  totalSubmissions?: number;
  deadline?: Date;
}

export function AgentMissionCard({
  status = "not-started",
  region = "North Central",
  market = "Kano Central Market",
  commodities = ["Maize", "Sorghum", "Soybeans"],
  completedSubmissions = 0,
  totalSubmissions = 5,
  deadline,
}: AgentMissionCardProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState("");

  // Default deadline to 6 PM today if not provided
  const targetDeadline = deadline || new Date(new Date().setHours(18, 0, 0, 0));

  // Progress calculation
  const progressPercentage = Math.min(
    Math.max((completedSubmissions / totalSubmissions) * 100, 0),
    100,
  );

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
    router.push("/agent/update-prices");
  };

  const statusConfig = {
    "not-started": {
      badge: "Due Today",
      badgeVariant: "secondary" as const,
      badgeClassName:
        "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200",
      cta: "Start Updating Prices",
      message: "",
    },
    "in-progress": {
      badge: "In Progress",
      badgeVariant: "outline" as const,
      badgeClassName:
        "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800",
      cta: "Continue Updating",
      message: "",
    },
    completed: {
      badge: "Completed",
      badgeVariant: "default" as const,
      badgeClassName: "bg-emerald-500 hover:bg-emerald-600 text-white",
      cta: "Review Submissions",
      message: "All submissions for today are complete.",
    },
    overdue: {
      badge: "Overdue",
      badgeVariant: "destructive" as const,
      badgeClassName: "animate-pulse",
      cta: "Submit Now",
      message: "This assignment is past due. Please submit immediately.",
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "overflow-hidden border-0 shadow-lg relative",
          status === "overdue"
            ? "ring-2 ring-destructive/50 shadow-destructive/10"
            : "shadow-primary/5",
          "bg-linear-to-br from-background to-muted/30",
        )}
      >
        {/* Subtle background pattern/decoration */}
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none transform translate-x-1/2 -translate-y-1/2">
          <Wheat size={400} />
        </div>

        <CardContent className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            {/* Left side: Mission info */}
            <div className="space-y-6 flex-1">
              <div className="flex items-center justify-between md:justify-start gap-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Today's Assignment
                </h2>
                <Badge
                  variant={config.badgeVariant}
                  className={cn("px-3 py-1 font-medium", config.badgeClassName)}
                >
                  {status === "completed" && (
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  )}
                  {status === "overdue" && (
                    <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  )}
                  {config.badge}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-muted-foreground bg-background rounded-lg p-3 border shadow-sm">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider opacity-70">
                      Region
                    </p>
                    <p className="font-medium text-foreground">{region}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground bg-background rounded-lg p-3 border shadow-sm">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Store className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider opacity-70">
                      Market
                    </p>
                    <p className="font-medium text-foreground">{market}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground bg-background rounded-lg p-3 border shadow-sm sm:col-span-2 lg:col-span-1">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Wheat className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider opacity-70">
                      Commodities
                    </p>
                    <p
                      className="font-medium text-foreground truncate max-w-[150px]"
                      title={commodities.join(", ")}
                    >
                      {commodities.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Progress & Actions */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-5 border shadow-sm min-w-full md:min-w-[320px] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Submissions
                    </p>
                    <p className="text-2xl font-bold">
                      {completedSubmissions}{" "}
                      <span className="text-muted-foreground text-lg font-normal">
                        / {totalSubmissions}
                      </span>
                    </p>
                  </div>

                  {status !== "completed" && (
                    <div
                      className={cn(
                        "flex items-center gap-1.5 text-sm font-medium",
                        status === "overdue"
                          ? "text-destructive"
                          : "text-amber-600 dark:text-amber-500",
                      )}
                    >
                      <Clock className="w-4 h-4" />
                      {timeLeft}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Progress
                    value={progressPercentage}
                    className={cn(
                      "h-2",
                      status === "completed" && "[&>div]:bg-emerald-500",
                      status === "overdue" && "[&>div]:bg-destructive",
                    )}
                  />

                  {config.message && (
                    <p
                      className={cn(
                        "text-sm font-medium pt-1",
                        status === "completed"
                          ? "text-emerald-600 dark:text-emerald-500"
                          : "text-destructive",
                      )}
                    >
                      {config.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                onClick={handleActionClick}
                size="lg"
                className={cn(
                  "w-full mt-6 group transition-all",
                  status === "overdue" &&
                    "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                  status === "completed" &&
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                {config.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
