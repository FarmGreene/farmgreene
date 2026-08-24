"use client";

import React from "react";
import {
  MoreHorizontal,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Pause,
  Play,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CATEGORY_LABELS } from "@/types/commodity";
import {
  useAlerts,
  usePauseAlert,
  useResumeAlert,
  useDeleteAlert,
} from "@/lib/hooks/useAlerts";
import { toast } from "sonner";
import { timeAgo } from "@/lib/utils/time-ago";

export default function AlertsTable() {
  const { data: alerts = [], isLoading } = useAlerts();
  const pauseMutation = usePauseAlert();
  const resumeMutation = useResumeAlert();
  const deleteMutation = useDeleteAlert();

  const handleToggle = async (id: string, status: "active" | "paused") => {
    try {
      if (status === "active") {
        await pauseMutation.mutateAsync(id);
        toast.success("Alert paused");
      } else {
        await resumeMutation.mutateAsync(id);
        toast.success("Alert resumed");
      }
    } catch {
      toast.error("Couldn't update alert — try again");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Alert deleted");
    } catch {
      toast.error("Couldn't delete alert — try again");
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Active Alerts
            </CardTitle>
            <CardDescription>
              Manage your price thresholds and market triggers
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell className="h-8 w-8 text-slate-300 mb-3" />
            <p className="text-sm text-slate-500">
              No alerts yet. Create one to get notified when prices move.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commodity</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Triggered</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {alert.commodity.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {CATEGORY_LABELS[alert.commodity.category] ?? alert.commodity.category}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {alert.condition === "above" ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">
                        Price {alert.condition === "above" ? ">" : "<"} ₦
                        {Number(alert.targetPrice).toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        alert.status === "active"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-100 border-none"
                      }
                    >
                      {alert.status === "active" ? "Active" : "Paused"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {timeAgo(alert.lastTriggeredAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleToggle(alert.id, alert.status)}
                        >
                          {alert.status === "active" ? (
                            <span className="flex items-center gap-2">
                              <Pause className="h-4 w-4" /> Pause
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Play className="h-4 w-4" /> Resume
                            </span>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(alert.id)}
                        >
                          <span className="flex items-center gap-2">
                            <Trash2 className="h-4 w-4" /> Delete
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
