import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trophy,
  Flame,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock Data for Field Agent
const AGENT_DATA = {
  name: "Emmy",
  role: "Field Agent",
  assignedMarket: "Ibadan Central Market",
  lastHeard: "2 hours ago",
  progress: {
    completed: 4,
    total: 6,
    status: "In Progress", // "Completed" | "In Progress" | "Not Started"
  },
  stats: {
    pointsToday: 120,
    rank: "Silver Agent",
    streak: 5,
    weeklyRank: 12,
  },
};

export default function RoleActionWidget() {
  const { progress, stats, assignedMarket, lastHeard } = AGENT_DATA;
  const progressPercentage = (progress.completed / progress.total) * 100;

  const isCompleted = progress.completed === progress.total;
  const isStarted = progress.completed > 0;

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
              Updated {lastHeard}
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
                  isCompleted ? "text-green-600" : ""
                )}
              >
                {progress.completed}
              </span>
              /{progress.total} commodities
            </span>
          </div>

          <Progress
            value={progressPercentage}
            className="h-2.5 bg-slate-100 dark:bg-slate-800"
          />

          {/* Status Message */}
          <div className="flex items-center gap-2 text-sm pt-1">
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-green-700 dark:text-green-400 font-medium">
                  All caught up! Great work.
                </span>
              </>
            ) : isStarted ? (
              <>
                <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-muted-foreground">
                  You have pending submissions.
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-500 font-medium">
                  No prices submitted yet.
                </span>
              </>
            )}
          </div>
        </div>

        {/* Section 3: Quick Action (Primary CTA) */}
        <Link href="/agent">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/10 h-12 text-base font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]"
            disabled={isCompleted}
          >
            Go to dashboard
          </Button>
        </Link>

        {/* Section 4: Performance Snapshot (Gamification) */}
        <div className="grid grid-cols-3 gap-2 py-2 border-t border-dashed mt-4">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/20">
            <Flame className="h-5 w-5 text-orange-500 mb-1" />
            <span className="text-lg font-bold text-foreground">
              {stats.streak}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Day Streak
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/20">
            <TrendingUp className="h-5 w-5 text-blue-500 mb-1" />
            <span className="text-lg font-bold text-foreground">
              {stats.pointsToday}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Pts Today
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/20">
            <Trophy className="h-5 w-5 text-purple-500 mb-1" />
            <span className="text-lg font-bold text-foreground">
              #{stats.weeklyRank}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Ranking
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
