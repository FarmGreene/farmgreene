"use client";

import React from "react";
import { Building, Trash2, AlertTriangle } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function WorkspaceSettings() {
  return (
    <div className="max-w-2xl space-y-6">
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Building className="h-5 w-5 text-slate-500" />
            Workspace Profile
          </CardTitle>
          <CardDescription>
            Update your organization's public information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 border-2 border-slate-100 dark:border-slate-800">
              <AvatarImage src="/logos/farm-logo.png" />
              <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold text-xl">
                FG
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                Upload Logo
              </Button>
              <p className="text-xs text-slate-500">Recommended 400x400px.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input id="workspace-name" defaultValue="Farmgreene Lagos Ops" />
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="default"
              className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-100 dark:border-red-900/20 bg-red-50/30 dark:bg-red-900/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-red-600/80">
            Irreversible actions for your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-950 rounded-lg border border-red-100 dark:border-red-900/20">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white">
                Delete Workspace
              </h4>
              <p className="text-sm text-slate-500">
                Permanently delete this workspace and all data.
              </p>
            </div>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
