import { apiClient } from "@/lib/api/axios";
import type { Notification, NotificationPreferences } from "@/types/notification";

export interface GetNotificationsParams {
  type?: string;
  unreadOnly?: boolean;
}

/** GET /notifications */
export async function getNotifications(
  params?: GetNotificationsParams,
): Promise<Notification[]> {
  const { data } = await apiClient.get("/notifications", { params });
  return data;
}

/** GET /notifications/unread-count */
export async function getUnreadCount(): Promise<{ count: number }> {
  const { data } = await apiClient.get("/notifications/unread-count");
  return data;
}

/** PATCH /notifications/:id/read */
export async function markAsRead(id: string): Promise<Notification> {
  const { data } = await apiClient.patch(`/notifications/${id}/read`);
  return data;
}

/** PATCH /notifications/read-all */
export async function markAllAsRead(): Promise<{ success: boolean }> {
  const { data } = await apiClient.patch("/notifications/read-all");
  return data;
}

/** GET /notification-preferences */
export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  const { data } = await apiClient.get("/notification-preferences");
  return data;
}

/** PATCH /notification-preferences */
export async function updateNotificationPreferences(
  partial: Partial<NotificationPreferences>,
): Promise<NotificationPreferences> {
  const { data } = await apiClient.patch("/notification-preferences", partial);
  return data;
}
