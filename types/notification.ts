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
  isRead: boolean;
  actionLabel?: string | null;
  actionHref?: string | null;
  createdAt: string;
}

export interface NotificationPreferences {
  emailAlerts: boolean;
  inAppNotifications: boolean;
  dailyDigest: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: number;
  quietHoursEnd: number;
  aiSuggestions: boolean;
}
