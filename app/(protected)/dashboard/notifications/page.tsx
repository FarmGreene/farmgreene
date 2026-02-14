"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import NotificationFeed from "@/components/dashboard/notifications/NotificationFeed";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl w-full mx-auto pb-20 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Notifications"
          description="Stay updated on market changes and important activity."
        />
        <Link href="/dashboard/settings/notifications">
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>

      {/* Feed */}
      <NotificationFeed />
    </div>
  );
}
