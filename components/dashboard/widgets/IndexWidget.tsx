import React from "react";
import { LucideIcon, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  TrendUpIllustration,
  TrendDownIllustration,
} from "@/components/ui/illustrations";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IndexWidgetProps {
  title: string;
  value: string;
  trend: string;
  trendIcon: LucideIcon;
  trendColor: "green" | "red";
  icon?: LucideIcon;
  className?: string;
  href?: string;
  viewLabel?: string;
}

export default function IndexWidget({
  title,
  value,
  trend,
  trendIcon: TrendIcon,
  trendColor,
  icon: Icon,
  className,
  href = "#",
  viewLabel = "View details",
}: IndexWidgetProps) {
  const isPositive = trendColor === "green";

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between", // Added flex column
        "bg-white dark:bg-slate-900", // Explicit background
        className
      )}
    >
      {/* Background Vector Logic */}
      <div className="absolute inset-x-0 bottom-0 h-24 opacity-20 pointer-events-none">
        {isPositive ? (
          <TrendUpIllustration className="w-full h-full object-cover object-bottom" />
        ) : (
          <TrendDownIllustration className="w-full h-full object-cover object-bottom" />
        )}
      </div>

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="text-3xl font-bold mb-1 tracking-tight">{value}</div>
        <div
          className={cn(
            "text-xs flex items-center font-medium",
            isPositive
              ? "text-[#049878] dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          )}
        >
          <TrendIcon className="mr-1 h-3 w-3" />
          {trend}
          <span className="text-muted-foreground ml-1 font-normal opacity-80">
            vs last week
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 relative z-10">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="p-0 h-auto font-normal text-muted-foreground hover:text-primary transition-colors"
        >
          <Link href={href} className="flex items-center gap-1 group">
            {viewLabel}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
