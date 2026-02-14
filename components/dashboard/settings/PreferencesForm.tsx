"use client";

import React from "react";
import { Globe, Layout, Moon, Sun, Monitor } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function PreferencesForm() {
  return (
    <div className="max-w-2xl space-y-6">
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Layout className="h-5 w-5 text-indigo-500" />
            Display & Experience
          </CardTitle>
          <CardDescription>
            Customize how Farmgreene looks and feels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Appearance</Label>
            <div className="grid grid-cols-3 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors">
                <Sun className="h-6 w-6 text-amber-500" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors bg-slate-50 dark:bg-slate-800/50">
                <Moon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                <span className="text-sm font-medium">Dark</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20 transition-colors">
                <Monitor className="h-6 w-6 text-emerald-600" />
                <span className="text-sm font-medium">System</span>
              </button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="density" className="text-base font-medium">
                Compact Density
              </Label>
              <p className="text-sm text-slate-500">
                Show more data on screen with tighter spacing.
              </p>
            </div>
            <Switch id="density" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-600" />
            Regional Context
          </CardTitle>
          <CardDescription>
            Set defaults for market intelligence and currency.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="default-region">Default Region</Label>
              <Select defaultValue="lagos">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lagos">Lagos (South West)</SelectItem>
                  <SelectItem value="kano">Kano (North West)</SelectItem>
                  <SelectItem value="abuja">Abuja (North Central)</SelectItem>
                  <SelectItem value="ph">
                    Port Harcourt (South South)
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[11px] text-slate-500">
                Used for initial dashboard views.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="ngn">
                <SelectTrigger disabled className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ngn">Nigerian Naira (₦)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
