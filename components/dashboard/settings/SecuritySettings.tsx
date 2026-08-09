"use client";

import React from "react";
import {
  Shield,
  Key,
  Smartphone,
  Laptop,
  LogOut,
  CheckCircle2,
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
import { Switch } from "@/components/ui/switch";

export default function SecuritySettings() {
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

      {/* 2FA */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">
                Text Message (SMS)
              </Label>
              <p className="text-sm text-slate-500">
                Receive a code via SMS to verify login.
              </p>
            </div>
            <Switch />
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
          {/* Current Session */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-emerald-600">
                <Laptop className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                  MacBook Pro (Chrome)
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">
                    Current
                  </span>
                </p>
                <p className="text-xs text-slate-500">
                  Lagos, Nigeria • Online now
                </p>
              </div>
            </div>
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </div>

          {/* Other Session */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  iPhone 14 (Safari)
                </p>
                <p className="text-xs text-slate-500">
                  Abuja, Nigeria • Active 2h ago
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Revoke
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              Log Out All Other Devices
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
