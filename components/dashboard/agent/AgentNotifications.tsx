"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  AlertCircle,
  MessageSquare,
  Clock,
  TrendingDown,
  Check,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";

type NotificationType = "rejected" | "feedback" | "reminder" | "warning";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionRequired?: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "rejected",
    title: "Submission Rejected",
    message:
      "Maize price out of typical bounds. Please verify the market source.",
    time: "10 min ago",
    read: false,
    actionRequired: true,
  },
  {
    id: "2",
    type: "feedback",
    title: "Admin Feedback",
    message: "Great job completing the Kwari market survey early today.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "reminder",
    title: "Deadline Approaching",
    message: "You have 2 submissions due for Kano Central market by 6 PM.",
    time: "4 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "warning",
    title: "Performance Alert",
    message:
      "Your rejection rate has increased slightly this week. Check guidelines.",
    time: "Yesterday",
    read: true,
  },
];

export function AgentNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "feedback":
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case "reminder":
        return <Clock className="w-4 h-4 text-amber-500" />;
      case "warning":
        return <TrendingDown className="w-4 h-4 text-orange-500" />;
    }
  };

  const getStyles = (type: NotificationType, read: boolean) => {
    if (read) return "bg-muted/30 border-transparent hover:bg-muted/50";

    switch (type) {
      case "rejected":
        return "bg-destructive/5 border-destructive/20 hover:bg-destructive/10";
      case "feedback":
        return "bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10";
      case "reminder":
        return "bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10";
      case "warning":
        return "bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Card className="flex flex-col h-full border-0 shadow-sm relative overflow-hidden group">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none -z-10 transition-transform group-hover:scale-110" />

      <CardHeader className="pb-3 px-5 flex flex-row items-center justify-between border-b/50">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Bell className="w-4 h-4 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <Badge
                variant="default"
                className="w-5 h-5 p-0 flex items-center justify-center rounded-full text-[10px]"
              >
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            <Check className="w-3.5 h-3.5 mr-1" />
            Mark all read
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-12">
              <Bell className="w-12 h-12 opacity-20 mb-4" />
              <p>Everything looks good. No new alerts.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border/50">
              <AnimatePresence>
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "p-4 transition-colors relative",
                      getStyles(notification.type, notification.read),
                    )}
                  >
                    {!notification.read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                    )}

                    <div className="flex gap-4">
                      <div className="mt-1">{getIcon(notification.type)}</div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={cn(
                              "text-sm font-semibold leading-none",
                              !notification.read
                                ? "text-foreground"
                                : "text-foreground/80",
                            )}
                          >
                            {notification.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>

                        <p
                          className={cn(
                            "text-xs leading-relaxed",
                            !notification.read
                              ? "text-muted-foreground"
                              : "text-muted-foreground/70",
                          )}
                        >
                          {notification.message}
                        </p>

                        {notification.actionRequired && (
                          <div className="pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs font-medium"
                            >
                              View Feedback{" "}
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {!notification.read && (
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover/item:opacity-100 transition-opacity rounded-full hover:bg-background/50"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                          >
                            <Check className="w-3 h-3 text-muted-foreground" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <div className="p-3 border-t bg-muted/20 flex justify-center text-center">
        <Button
          variant="link"
          size="sm"
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          View All Notifications
        </Button>
      </div>
    </Card>
  );
}
