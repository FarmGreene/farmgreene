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

// Mock Data
const ALERTS_DATA = [
  {
    id: "1",
    commodity: "Maize (White)",
    region: "Lagos - Mile 12",
    condition: "Price > ₦80,000",
    status: "active",
    lastTriggered: "2 days ago",
    type: "price_above",
  },
  {
    id: "2",
    commodity: "Rice (Local)",
    region: "Kano - Dawanau",
    price: 68500,
    condition: "Price < ₦65,000",
    status: "active",
    lastTriggered: "Never",
    type: "price_below",
  },
  {
    id: "3",
    commodity: "Soybeans",
    region: "Benue - Gboko",
    condition: "Change > 5% (7d)",
    status: "paused",
    lastTriggered: "1 week ago",
    type: "volatility",
  },
];

export default function AlertsTable() {
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
            {ALERTS_DATA.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {alert.commodity}
                    </span>
                    <span className="text-xs text-slate-500">
                      {alert.region}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {alert.type === "price_above" && (
                      <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                    )}
                    {alert.type === "price_below" && (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    {alert.type === "volatility" && (
                      <Bell className="h-4 w-4 text-amber-600" />
                    )}
                    <span className="text-sm font-medium">
                      {alert.condition}
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
                  {alert.lastTriggered}
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
                      <DropdownMenuItem>Edit Alert</DropdownMenuItem>
                      <DropdownMenuItem>
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
                      <DropdownMenuItem className="text-red-600 focus:text-red-600">
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
      </CardContent>
    </Card>
  );
}
