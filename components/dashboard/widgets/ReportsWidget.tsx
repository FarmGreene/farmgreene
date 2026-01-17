"use client";

import React, { useState } from "react";
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
  RefreshCw,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Types ---

type ReportStatus = "Ready" | "Processing" | "Failed";
type ReportType = "AI Generated" | "Scheduled" | "Manual";

interface Report {
  id: string;
  name: string;
  type: ReportType;
  commodities: string[];
  timeRange: string;
  generated: string;
  status: ReportStatus;
}

interface Alert {
  id: string;
  name: string;
  commodity: string;
  condition: string;
  status: "Active" | "Triggered" | "Paused";
  lastTriggered: string;
}

// --- Mock Data ---

const MOCK_REPORTS: Report[] = [
  {
    id: "1",
    name: "Weekly Maize Price Outlook",
    type: "AI Generated",
    commodities: ["Maize", "Sorghum"],
    timeRange: "Last 7 days",
    generated: "2h ago",
    status: "Ready",
  },
  {
    id: "2",
    name: "Q4 2025 Regional Tubers Analysis",
    type: "Manual",
    commodities: ["Yam", "Cassava", "Potato"],
    timeRange: "Oct - Dec 2025",
    generated: "Yesterday",
    status: "Ready",
  },
  {
    id: "3",
    name: "Fertilizer Cost Impact Study",
    type: "AI Generated",
    commodities: ["All Grains"],
    timeRange: "Current Month",
    generated: "2m ago",
    status: "Processing",
  },
  {
    id: "4",
    name: "Cocoa Export Trends",
    type: "Scheduled",
    commodities: ["Cocoa"],
    timeRange: "Year to Date",
    generated: "Jan 10",
    status: "Ready",
  },
  {
    id: "5",
    name: "Rice Supply Chain Disruption",
    type: "AI Generated",
    commodities: ["Rice"],
    timeRange: "Last 30 days",
    generated: "Jan 08",
    status: "Failed",
  },
  {
    id: "6",
    name: "Weather Impact on Crop Yields",
    type: "Scheduled",
    commodities: ["Maize", "Wheat"],
    timeRange: "Last Quarter",
    generated: "Jan 05",
    status: "Ready",
  },
];

const MOCK_ALERTS: Alert[] = [
  {
    id: "1",
    name: "Maize Price Surge",
    commodity: "Maize (White)",
    condition: "Price > ₦35,000/100kg",
    status: "Triggered",
    lastTriggered: "10m ago",
  },
  {
    id: "2",
    name: "Low Stock Warning: Rice",
    commodity: "Rice (Local)",
    condition: "Inv < 50 bags",
    status: "Active",
    lastTriggered: "2d ago",
  },
  {
    id: "3",
    name: "Cocoa Dip",
    commodity: "Cocoa Beans",
    condition: "Price drops 5%",
    status: "Paused",
    lastTriggered: "N/A",
  },
];

// --- Columns Definitions ---

const reportColumns: ColumnDef<Report>[] = [
  {
    accessorKey: "name",
    header: "Report Name",
    cell: ({ row }) => (
      <div className="font-medium text-foreground cursor-pointer hover:underline decoration-green-500/30 underline-offset-4">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      let variant: "default" | "secondary" | "outline" = "outline";
      if (type === "AI Generated") variant = "default";
      if (type === "Scheduled") variant = "secondary";

      return (
        <Badge
          variant={variant}
          className="text-[10px] whitespace-nowrap font-normal"
        >
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "commodities",
    header: "Commodities",
    cell: ({ row }) => {
      const items = row.original.commodities;
      const display = items.slice(0, 2).join(", ");
      const remaining = items.length - 2;
      return (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          {display}
          {remaining > 0 && (
            <Badge variant="secondary" className="px-1 py-0 h-4 text-[9px]">
              +{remaining}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "timeRange",
    header: "Time Range",
    cell: ({ row }) => <div className="text-xs">{row.original.timeRange}</div>,
  },
  {
    accessorKey: "generated",
    header: "Generated",
    cell: ({ row }) => (
      <div className="text-xs text-muted-foreground whitespace-nowrap">
        {row.original.generated}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === "Processing") {
        return (
          <div className="flex items-center gap-1.5 text-xs text-yellow-600 dark:text-yellow-400">
            <RefreshCw className="h-3 w-3 animate-spin" />
            Processing
          </div>
        );
      }
      if (status === "Failed") {
        return (
          <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 cursor-pointer hover:underline">
            <AlertTriangle className="h-3 w-3" />
            Failed (Retry)
          </div>
        );
      }
      return (
        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
          <div className="h-1.5 w-1.5 rounded-full bg-current" />
          Ready
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const disabled = row.original.status === "Processing";
      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-green-600"
            disabled={disabled}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            disabled={disabled}
          >
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                disabled={disabled}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Share report</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Delete report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const alertColumns: ColumnDef<Alert>[] = [
  {
    accessorKey: "name",
    header: "Alert Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "commodity",
    header: "Commodity",
    cell: ({ row }) => (
      <div className="text-xs text-muted-foreground">
        {row.original.commodity}
      </div>
    ),
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-mono text-[10px]">
        {row.original.condition}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let dotColor = "bg-gray-400";
      if (status === "Triggered") dotColor = "bg-red-500 animate-pulse";
      if (status === "Active") dotColor = "bg-green-500";

      return (
        <div className="flex items-center gap-2 text-xs">
          <span className={`h-2 w-2 rounded-full ${dotColor}`} />
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "lastTriggered",
    header: "Last Triggered",
    cell: ({ row }) => (
      <div className="text-xs text-muted-foreground">
        {row.original.lastTriggered}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="sm" className="h-8 text-xs">
        Edit
      </Button>
    ),
  },
];

// --- Main Component ---

export default function ReportsWidget() {
  const [activeTab, setActiveTab] = useState<"reports" | "alerts">("reports");

  // Table Setup
  const [reportData] = useState(() => MOCK_REPORTS);
  const [alertData] = useState(() => MOCK_ALERTS);

  const reportsTable = useReactTable({
    data: reportData,
    columns: reportColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const alertsTable = useReactTable({
    data: alertData,
    columns: alertColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4 border-none shadow-md bg-white dark:bg-slate-900 flex flex-col h-full overflow-hidden">
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
          <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
            <Settings className="h-4 w-4" />
            Manage Alerts
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <Tabs
          defaultValue="reports"
          className="w-full flex flex-col h-full"
          onValueChange={(v) => setActiveTab(v as any)}
        >
          <div className="px-6 pb-2">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="reports" className="gap-2">
                <FileText className="h-4 w-4" /> Reports
              </TabsTrigger>
              <TabsTrigger value="alerts" className="gap-2">
                <Bell className="h-4 w-4" /> Alerts
                {MOCK_ALERTS.some((a) => a.status === "Triggered") && (
                  <span className="h-2 w-2 rounded-full bg-red-500" />
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
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead
                              key={header.id}
                              className="text-xs uppercase tracking-wider font-semibold"
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {reportsTable.getRowModel().rows?.length ? (
                      reportsTable.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-3">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={reportColumns.length}
                          className="h-24 text-center"
                        >
                          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <FileText className="h-8 w-8 opacity-20" />
                            <p>No reports generated yet.</p>
                            <Button
                              variant="link"
                              size="sm"
                              className="text-green-600"
                            >
                              Generate your first report
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
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead
                              key={header.id}
                              className="text-xs uppercase tracking-wider font-semibold"
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {alertsTable.getRowModel().rows?.length ? (
                      alertsTable.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-3">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={alertColumns.length}
                          className="h-24 text-center"
                        >
                          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <Bell className="h-8 w-8 opacity-20" />
                            <p>No active alerts.</p>
                            <Button
                              variant="link"
                              size="sm"
                              className="text-green-600"
                            >
                              Create Alert
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
    </Card>
  );
}
