"use client";

import React, { useState } from "react";
import { LayoutGroup, AnimatePresence, motion } from "motion/react";
import NotificationItem, { Notification } from "./NotificationItem";
import NotificationFilters from "./NotificationFilters";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Data Generation
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "alert",
    priority: "high",
    title: "Maize Price Surge in Kaduna",
    description:
      "Maize price in Kaduna has risen above ₦82,000, triggering your alert threshold.",
    timestamp: "2 hours ago",
    isRead: false,
    actionLabel: "View Commodity",
  },
  {
    id: "2",
    type: "report",
    priority: "normal",
    title: "AI Report Ready: Rice (Lagos)",
    description:
      "Your requested AI analysis for Rice market trends in Lagos is ready for review.",
    timestamp: "4 hours ago",
    isRead: false,
    actionLabel: "View Report",
  },
  {
    id: "3",
    type: "reminder",
    priority: "normal",
    title: "Submit Market Prices",
    description:
      "Reminder: Please submit the daily market prices for your assigned region (Ogun).",
    timestamp: "5 hours ago",
    isRead: true,
    actionLabel: "Submit Now",
  },
  {
    id: "4",
    type: "signal",
    priority: "normal",
    title: "High Volatility Detected",
    description:
      "Cassava prices are showing unusual volatility this week. Check the intelligence hub for details.",
    timestamp: "Yesterday",
    isRead: true,
    actionLabel: "View Intelligence",
  },
  {
    id: "5",
    type: "system",
    priority: "low",
    title: "New Feature: TradingView Charts",
    description:
      "We've integrated TradingView charts for advanced technical analysis. Explore it now.",
    timestamp: "2 days ago",
    isRead: true,
    actionLabel: "Explore Feature",
  },
  {
    id: "6",
    type: "alert",
    priority: "normal",
    title: "Soybeans Price Drop",
    description: "Soybeans in Benue have dropped by 5% in the last 24 hours.",
    timestamp: "3 days ago",
    isRead: true,
  },
];

export default function NotificationFeed() {
  const [activeTab, setActiveTab] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);

  const handleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Filter Logic
  const filteredNotifications = notifications.filter((n) => {
    const matchesTab = activeTab === "all" || n.type === activeTab;
    const matchesUnread = !showUnreadOnly || !n.isRead;
    return matchesTab && matchesUnread;
  });

  // Grouping Logic
  const groupedNotifications = {
    Today: filteredNotifications.filter(
      (n) => n.timestamp.includes("ago") && !n.timestamp.includes("day"),
    ),
    Yesterday: filteredNotifications.filter((n) =>
      n.timestamp.toLowerCase().includes("yesterday"),
    ),
    Earlier: filteredNotifications.filter(
      (n) =>
        (!n.timestamp.includes("ago") && n.timestamp !== "Yesterday") ||
        n.timestamp.includes("day"),
    ),
  };

  const hasNotifications = filteredNotifications.length > 0;
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
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
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
        {hasNotifications ? (
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
                              onRead={() => handleRead(notification.id)}
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
