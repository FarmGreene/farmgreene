"use client";

import React from "react";
import {
  Key,
  Smartphone,
  Laptop,
  LogOut,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useSessions,
  useRevokeSession,
  useRevokeOtherSessions,
} from "@/lib/hooks/useSessions";

function isMobileDevice(deviceLabel: string): boolean {
  return /iOS|Android/i.test(deviceLabel);
}

function formatLastActive(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 5) return "Online now";
  if (minutes < 60) return `Active ${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Active ${hours}h ago`;
  return `Active ${Math.floor(hours / 24)}d ago`;
}

export default function SecuritySettings() {
  const { data: sessions = [], isLoading } = useSessions();
  const revokeSession = useRevokeSession();
  const revokeOthers = useRevokeOtherSessions();
  const hasOtherSessions = sessions.some((s) => !s.isCurrent);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Password Change */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Key className="h-5 w-5 text-slate-500" />
            Password
          </CardTitle>
          <CardDescription>Change your account password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <Button variant="outline">Update Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Active Sessions
          </CardTitle>
          <CardDescription>
            Manage devices where you are currently logged in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </>
          ) : sessions.length === 0 ? (
            <p className="text-sm text-slate-500">No active sessions found.</p>
          ) : (
            sessions.map((session) => {
              const Icon = isMobileDevice(session.deviceLabel)
                ? Smartphone
                : Laptop;
              const location = [session.city, session.country]
                .filter(Boolean)
                .join(", ");
              return (
                <div
                  key={session.id}
                  className={
                    session.isCurrent
                      ? "flex items-center justify-between p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20"
                      : "flex items-center justify-between p-3"
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={
                        session.isCurrent
                          ? "h-10 w-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-emerald-600"
                          : "h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        {session.deviceLabel}
                        {session.isCurrent && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">
                            Current
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500">
                        {location ? `${location} • ` : ""}
                        {formatLastActive(session.lastActiveAt)}
                      </p>
                    </div>
                  </div>
                  {session.isCurrent ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8"
                      onClick={() => revokeSession.mutate(session.id)}
                      disabled={revokeSession.isPending}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Revoke
                    </Button>
                  )}
                </div>
              );
            })
          )}

          {hasOtherSessions && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                onClick={() => revokeOthers.mutate()}
                disabled={revokeOthers.isPending}
              >
                {revokeOthers.isPending && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Log Out All Other Devices
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
