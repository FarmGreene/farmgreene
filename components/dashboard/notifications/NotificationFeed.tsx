"use client";

import React, { useMemo, useState } from "react";
import { LayoutGroup, AnimatePresence, motion } from "motion/react";
import NotificationItem from "./NotificationItem";
import NotificationFilters from "./NotificationFilters";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Notification } from "@/types/notification";
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
} from "@/lib/hooks/useNotifications";

function groupByRecency(notifications: Notification[]) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const groups: Record<"Today" | "Yesterday" | "Earlier", Notification[]> = {
    Today: [],
    Yesterday: [],
    Earlier: [],
  };

  for (const n of notifications) {
    const createdAt = new Date(n.createdAt);
    if (createdAt >= startOfToday) groups.Today.push(n);
    else if (createdAt >= startOfYesterday) groups.Yesterday.push(n);
    else groups.Earlier.push(n);
  }

  return groups;
}

export default function NotificationFeed() {
  const [activeTab, setActiveTab] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const { data: notifications = [], isLoading } = useNotifications({
    type: activeTab !== "all" ? activeTab : undefined,
    unreadOnly: showUnreadOnly,
  });
  const markReadMutation = useMarkAsRead();
  const markAllReadMutation = useMarkAllAsRead();

  const groupedNotifications = useMemo(
    () => groupByRecency(notifications),
    [notifications],
  );

  const hasNotifications = notifications.length > 0;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            Activity Feed
            {unreadCount > 0 && (
              <span className="flex h-5 items-center justify-center rounded-full bg-emerald-100 px-2 text-[11px] font-bold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                {unreadCount} New
              </span>
            )}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => markAllReadMutation.mutate()}
          disabled={unreadCount === 0 || markAllReadMutation.isPending}
          className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
        >
          <Check className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      {/* Filters (Sticky) */}
      <div className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-20 py-2 -mx-4 px-4">
        <NotificationFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showUnreadOnly={showUnreadOnly}
          onUnreadToggle={setShowUnreadOnly}
        />
      </div>

      {/* Feed */}
      <div className="min-h-[500px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : hasNotifications ? (
          <LayoutGroup>
            <div className="space-y-8 pb-10">
              {Object.entries(groupedNotifications).map(
                ([group, update_list]) =>
                  update_list.length > 0 && (
                    <motion.div
                      key={group}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                          {group}
                        </h3>
                        <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
                      </div>
                      <div className="grid gap-3">
                        <AnimatePresence mode="popLayout">
                          {update_list.map((notification, index) => (
                            <NotificationItem
                              key={notification.id}
                              notification={notification}
                              onRead={() => markReadMutation.mutate(notification.id)}
                              index={index}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ),
              )}
            </div>
          </LayoutGroup>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-6"
          >
            <div className="h-24 w-24 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl flex items-center justify-center shadow-inner">
              <Sparkles className="h-10 w-10 text-emerald-400/50" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                All caught up!
              </h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2 leading-relaxed">
                {showUnreadOnly
                  ? "You have zero unread notifications. Great job appearing on top of things!"
                  : "There are no notifications to display in this category right now."}
              </p>
            </div>
            {showUnreadOnly && (
              <Button
                variant="outline"
                onClick={() => setShowUnreadOnly(false)}
              >
                View earlier notifications
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
