"use client";

import React from "react";
import { Bell, Mail, MessageSquare, ShieldAlert, Zap } from "lucide-react";
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

export default function NotificationSettings() {
  return (
    <div className="max-w-2xl space-y-6">
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-600" />
            General Notifications
          </CardTitle>
          <CardDescription>
            Manage non-market related alerts and updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-slate-500" />
                <Label className="text-base font-medium">Security Alerts</Label>
              </div>
              <p className="text-sm text-slate-500">
                New sign-ins and critical account updates.
              </p>
            </div>
            <Switch defaultChecked disabled />
          </div>

          <Separator />

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-slate-500" />
                <Label className="text-base font-medium">Product Updates</Label>
              </div>
              <p className="text-sm text-slate-500">
                News about new features and improvements.
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-slate-500" />
                <Label className="text-base font-medium">
                  Marketing & Offers
                </Label>
              </div>
              <p className="text-sm text-slate-500">
                Tips, rewards, and special offers.
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-500" />
            Email Preferences
          </CardTitle>
          <CardDescription>Fine-tune what land in your inbox.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label className="font-medium">Weekly Digest</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label className="font-medium">Monthly Newsletter</Label>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
