"use client";

import React from "react";
import { Bell, Mail, Smartphone, Moon, Sparkles, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function NotificationPreferences() {
  return (
    <div className="space-y-6 max-w-2xl">
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-600" />
            Alert Delivery Channels
          </CardTitle>
          <CardDescription>
            Choose how you want to receive price alerts and market updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="in-app" className="text-base font-medium">
                In-App Notifications
              </Label>
              <p className="text-sm text-slate-500">
                Receive alerts within the Farmgreene dashboard.
              </p>
            </div>
            <Switch id="in-app" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="email" className="text-base font-medium">
                Email Alerts
              </Label>
              <p className="text-sm text-slate-500">
                Get critical updates sent to your registered email.
              </p>
            </div>
            <Switch id="email" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="push" className="text-base font-medium">
                Mobile Push Notifications
              </Label>
              <p className="text-sm text-slate-500">
                Receive real-time alerts on your mobile device.
              </p>
            </div>
            <Switch id="push" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Frequency & Timing
          </CardTitle>
          <CardDescription>
            Manage when and how often you get notified.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="digest" className="text-base font-medium">
                Daily Market Digest
              </Label>
              <p className="text-sm text-slate-500">
                A summary of all your watchlist movements at 8:00 AM.
              </p>
            </div>
            <Switch id="digest" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-indigo-500" />
                <Label htmlFor="quiet-hours" className="text-base font-medium">
                  Quiet Hours
                </Label>
              </div>
              <p className="text-sm text-slate-500">
                Pause notifications between 10:00 PM and 7:00 AM.
              </p>
            </div>
            <Switch id="quiet-hours" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-800 bg-emerald-50/50 dark:bg-emerald-900/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
            <Sparkles className="h-5 w-5" />
            Smart Intelligence
          </CardTitle>
          <CardDescription className="text-emerald-700/80 dark:text-emerald-500/80">
            AI-powered suggestions based on your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label
                htmlFor="ai-suggest"
                className="text-base font-medium text-emerald-900 dark:text-emerald-100"
              >
                Market Moving Suggestions
              </Label>
              <p className="text-sm text-emerald-700 dark:text-emerald-500">
                Let AI suggest new commodities to watch based on market
                volatility.
              </p>
            </div>
            <Switch
              id="ai-suggest"
              className="data-[state=checked]:bg-emerald-600"
              defaultChecked
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
