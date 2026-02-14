"use client";

import React from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  FileText,
  Clock,
  Activity,
  Info,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NotificationType =
  | "alert"
  | "report"
  | "reminder"
  | "signal"
  | "system";
export type NotificationPriority = "high" | "normal" | "low";

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

interface NotificationItemProps {
  notification: Notification;
  onRead?: (id: string) => void;
  index: number;
}

const TYPE_CONFIG = {
  alert: {
    icon: TrendingUp,
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-900/10",
    border: "border-red-100",
  },
  report: {
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/10",
    border: "border-blue-100",
  },
  reminder: {
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-900/10",
    border: "border-amber-100",
  },
  signal: {
    icon: Activity,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/10",
    border: "border-emerald-100",
  },
  system: {
    icon: Info,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-900/10",
    border: "border-violet-100",
  },
};

export default function NotificationItem({
  notification,
  onRead,
  index,
}: NotificationItemProps) {
  const config = TYPE_CONFIG[notification.type] || TYPE_CONFIG.system;
  const Icon = config.icon;
  const isHighPriority = notification.priority === "high";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => onRead?.(notification.id)}
      className={cn(
        "group relative flex gap-5 p-5 rounded-2xl transition-all duration-200 cursor-pointer border",
        // Base Stats
        "bg-white dark:bg-slate-900 hover:shadow-lg hover:border-emerald-500/20 dark:hover:border-emerald-500/20",
        // Unread State
        !notification.isRead
          ? "border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/10"
          : "border-slate-100 dark:border-slate-800",
        // High Priority Override
        isHighPriority &&
          !notification.isRead &&
          "border-red-200 bg-red-50/10 hover:border-red-300",
      )}
    >
      {/* Priority/Unread Indicator */}
      {!notification.isRead && (
        <div className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
      )}

      {/* Icon Container */}
      <div
        className={cn(
          "h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300",
          config.bg,
          config.color,
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={2.5} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center justify-between pr-6 mb-1">
          <div className="flex items-center gap-2">
            <h4
              className={cn(
                "text-[15px] font-semibold text-slate-900 dark:text-white",
                !notification.isRead ? "font-bold" : "font-medium",
              )}
            >
              {notification.title}
            </h4>
            {isHighPriority && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-1.5 py-0.5 rounded-md">
                Critical
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-slate-400 group-hover:text-slate-500 transition-colors">
            {notification.timestamp}
          </span>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[90%]">
          {notification.description}
        </p>

        {notification.actionLabel && (
          <div className="pt-3 flex justify-start">
            <Button
              size="sm"
              variant="link"
              className={cn(
                "h-auto p-0 text-sm font-semibold group-hover:underline underline-offset-4 decoration-2 decoration-emerald-500/30 hover:decoration-emerald-500",
                config.color,
              )}
              onClick={(e) => {
                e.stopPropagation();
                notification.onAction?.();
              }}
            >
              {notification.actionLabel}
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
