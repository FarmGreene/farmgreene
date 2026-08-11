"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  FileText,
  Bell,
  Plus,
  Settings,
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  useSavedReports,
  useDeleteSavedReport,
} from "@/lib/hooks/useReports";
import {
  useAlerts,
  usePauseAlert,
  useResumeAlert,
  useDeleteAlert,
} from "@/lib/hooks/useAlerts";
import { periodLabel } from "@/lib/constants/report";
import { timeAgo } from "@/lib/utils/time-ago";
import { SavedReportViewDialog } from "@/components/dashboard/reports/SavedReportViewDialog";
import { HiddenReportDownloader } from "@/components/dashboard/reports/HiddenReportDownloader";
import type { SavedReportSummary } from "@/types/report";
import type { PriceAlert } from "@/types/alert";

// --- Main Component ---

export default function ReportsWidget() {
  const { data: reports = [], isLoading: reportsLoading } = useSavedReports();
  const deleteReportMutation = useDeleteSavedReport();

  const { data: alerts = [], isLoading: alertsLoading } = useAlerts();
  const pauseAlertMutation = usePauseAlert();
  const resumeAlertMutation = useResumeAlert();
  const deleteAlertMutation = useDeleteAlert();

  const [viewingId, setViewingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDeleteReport = (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    deleteReportMutation.mutate(id, {
      onSuccess: () => toast.success("Report deleted."),
      onError: () => toast.error("Failed to delete report."),
    });
  };

  const handleToggleAlert = (alert: PriceAlert) => {
    const mutation = alert.status === "active" ? pauseAlertMutation : resumeAlertMutation;
    mutation.mutate(alert.id, {
      onSuccess: () =>
        toast.success(alert.status === "active" ? "Alert paused" : "Alert resumed"),
      onError: () => toast.error("Couldn't update alert — try again"),
    });
  };

  const handleDeleteAlert = (id: string) => {
    deleteAlertMutation.mutate(id, {
      onSuccess: () => toast.success("Alert deleted"),
      onError: () => toast.error("Couldn't delete alert — try again"),
    });
  };

  const reportColumns = useMemo<ColumnDef<SavedReportSummary>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Report Name",
        cell: ({ row }) => (
          <div
            className="font-medium text-foreground cursor-pointer hover:underline decoration-green-500/30 underline-offset-4"
            onClick={() => setViewingId(row.original.id)}
          >
            {row.original.title}
          </div>
        ),
      },
      {
        accessorKey: "hasAi",
        header: "Type",
        cell: ({ row }) => (
          <Badge
            variant={row.original.hasAi ? "default" : "outline"}
            className="text-[10px] whitespace-nowrap font-normal"
          >
            {row.original.hasAi ? "AI Generated" : "Data Report"}
          </Badge>
        ),
      },
      {
        accessorKey: "commodityName",
        header: "Commodity",
        cell: ({ row }) => (
          <div className="text-xs text-muted-foreground">{row.original.commodityName}</div>
        ),
      },
      {
        accessorKey: "period",
        header: "Time Range",
        cell: ({ row }) => (
          <div className="text-xs">{periodLabel(row.original.period)}</div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Generated",
        cell: ({ row }) => (
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            {timeAgo(row.original.createdAt)}
          </div>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: () => (
          <div className="flex items-center gap-1.5 text-xs text-[#049878] dark:text-green-400">
            <div className="h-1.5 w-1.5 rounded-full bg-current" />
            Ready
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-[#049878]"
              onClick={() => setViewingId(row.original.id)}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">View</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              disabled={downloadingId === row.original.id}
              onClick={() => setDownloadingId(row.original.id)}
            >
              {downloadingId === row.original.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span className="sr-only">Download</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-red-600"
              onClick={() => handleDeleteReport(row.original.id, row.original.title)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [downloadingId],
  );

  const alertColumns = useMemo<ColumnDef<PriceAlert>[]>(
    () => [
      {
        id: "commodity",
        header: "Commodity",
        cell: ({ row }) => (
          <div className="font-medium text-foreground">{row.original.commodity.name}</div>
        ),
      },
      {
        id: "condition",
        header: "Condition",
        cell: ({ row }) => (
          <Badge variant="outline" className="font-mono text-[10px] gap-1">
            {row.original.condition === "above" ? (
              <ArrowUpRight className="h-3 w-3 text-emerald-600" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-600" />
            )}
            ₦{Number(row.original.targetPrice).toLocaleString()}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const active = row.original.status === "active";
          return (
            <div className="flex items-center gap-2 text-xs">
              <span className={`h-2 w-2 rounded-full ${active ? "bg-green-500" : "bg-gray-400"}`} />
              {active ? "Active" : "Paused"}
            </div>
          );
        },
      },
      {
        accessorKey: "lastTriggeredAt",
        header: "Last Triggered",
        cell: ({ row }) => (
          <div className="text-xs text-muted-foreground">
            {timeAgo(row.original.lastTriggeredAt)}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleToggleAlert(row.original)}>
                {row.original.status === "active" ? (
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
                onClick={() => handleDeleteAlert(row.original.id)}
              >
                <span className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" /> Delete
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const reportsTable = useReactTable({
    data: reports,
    columns: reportColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const alertsTable = useReactTable({
    data: alerts,
    columns: alertColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const hasRecentTrigger = alerts.some(
    (a) => a.lastTriggeredAt && Date.now() - new Date(a.lastTriggeredAt).getTime() < 24 * 60 * 60 * 1000,
  );

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4 border-none shadow-md bg-white dark:bg-slate-900 flex flex-col h-fit overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b space-y-4 md:space-y-0">
        <div>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            Intelligence Reports & Alerts
          </CardTitle>
          <CardDescription className="text-xs">
            Review your AI-generated insights and managing monitoring alerts.
          </CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 hidden sm:flex" asChild>
            <Link href="/dashboard/watchlist/alerts">
              <Settings className="h-4 w-4" />
              Manage Alerts
            </Link>
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-[#049878] hover:bg-green-700 text-white"
            asChild
          >
            <Link href="/dashboard/reports">
              <Plus className="h-4 w-4" />
              Generate Report
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <Tabs defaultValue="reports" className="w-full flex flex-col h-full">
          <div className="px-6 pb-2">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="reports" className="gap-2">
                <FileText className="h-4 w-4" /> Reports
              </TabsTrigger>
              <TabsTrigger value="alerts" className="gap-2">
                <Bell className="h-4 w-4" /> Alerts
                {hasRecentTrigger && (
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto p-0">
            <TabsContent value="reports" className="m-0 border-none">
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    {reportsTable.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className="text-xs uppercase tracking-wider font-semibold"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {reportsLoading ? (
                      <TableRow>
                        <TableCell colSpan={reportColumns.length} className="h-24 text-center">
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : reportsTable.getRowModel().rows?.length ? (
                      reportsTable.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-3">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={reportColumns.length} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <FileText className="h-8 w-8 opacity-20" />
                            <p>No reports generated yet.</p>
                            <Button variant="link" size="sm" className="text-[#049878]" asChild>
                              <Link href="/dashboard/reports">Generate your first report</Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination for Reports */}
              <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t">
                <div className="flex-1 text-xs text-muted-foreground">
                  Page {reportsTable.getState().pagination.pageIndex + 1} of{" "}
                  {reportsTable.getPageCount() || 1}
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => reportsTable.previousPage()}
                    disabled={!reportsTable.getCanPreviousPage()}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => reportsTable.nextPage()}
                    disabled={!reportsTable.getCanNextPage()}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="m-0 border-none">
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    {alertsTable.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className="text-xs uppercase tracking-wider font-semibold"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {alertsLoading ? (
                      <TableRow>
                        <TableCell colSpan={alertColumns.length} className="h-24 text-center">
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : alertsTable.getRowModel().rows?.length ? (
                      alertsTable.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-3">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={alertColumns.length} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <Bell className="h-8 w-8 opacity-20" />
                            <p>No active alerts.</p>
                            <Button variant="link" size="sm" className="text-[#049878]" asChild>
                              <Link href="/dashboard/watchlist/alerts">Create Alert</Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination for Alerts */}
              <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t">
                <div className="flex-1 text-xs text-muted-foreground">
                  Page {alertsTable.getState().pagination.pageIndex + 1} of{" "}
                  {alertsTable.getPageCount() || 1}
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alertsTable.previousPage()}
                    disabled={!alertsTable.getCanPreviousPage()}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alertsTable.nextPage()}
                    disabled={!alertsTable.getCanNextPage()}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>

      <SavedReportViewDialog
        reportId={viewingId}
        onOpenChange={(open) => !open && setViewingId(null)}
      />
      <HiddenReportDownloader
        reportId={downloadingId}
        onDone={() => setDownloadingId(null)}
      />
    </Card>
  );
}
