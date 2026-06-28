"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileSpreadsheet,
  FileText,
  FileBarChart,
  Clock,
} from "lucide-react";

// Mock Data
const EXPORT_HISTORY = [
  {
    id: "1",
    name: "Maize_Price_Trend_Q1_2026.pdf",
    type: "PDF",
    date: "Feb 13, 2026 10:45 AM",
    size: "2.4 MB",
    status: "Completed",
  },
  {
    id: "2",
    name: "Market_Summary_Nationwide_FebW2.csv",
    type: "CSV",
    date: "Feb 13, 2026 09:30 AM",
    size: "450 KB",
    status: "Completed",
  },
  {
    id: "3",
    name: "Commodity_Volatility_Report.pdf",
    type: "PDF",
    date: "Feb 12, 2026 04:15 PM",
    size: "1.8 MB",
    status: "Completed",
  },
  {
    id: "4",
    name: "Raw_Market_Data_Jan_2026.csv",
    type: "CSV",
    date: "Feb 10, 2026 11:00 AM",
    size: "12.5 MB",
    status: "Expired",
  },
  {
    id: "5",
    name: "Lagos_Region_Analysis.pdf",
    type: "PDF",
    date: "Feb 08, 2026 02:20 PM",
    size: "3.1 MB",
    status: "Completed",
  },
  {
    id: "6",
    name: "Forecast_Model_Outputs_v2.json",
    type: "JSON",
    date: "Feb 05, 2026 08:00 AM",
    size: "8.2 MB",
    status: "Completed",
  },
];

export default function ExportHistory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Download History
          </h3>
          <p className="text-sm text-slate-500">
            Access your previously exported files. Links expire after 30 days.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
            <TableRow>
              <TableHead className="w-[45%] pl-6">File Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Export Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EXPORT_HISTORY.map((file) => (
              <TableRow key={file.id} className="group">
                <TableCell className="pl-6 font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                      {file.type === "PDF" ? (
                        <FileText className="h-4 w-4 text-red-500" />
                      ) : file.type === "CSV" ? (
                        <FileSpreadsheet className="h-4 w-4 text-[#049878]" />
                      ) : (
                        <FileBarChart className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <span className="text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
                      {file.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal text-xs">
                    {file.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 text-xs sm:text-sm">
                  {file.date}
                </TableCell>
                <TableCell className="text-slate-500 text-xs sm:text-sm">
                  {file.size}
                </TableCell>
                <TableCell>
                  {file.status === "Completed" ? (
                    <Badge
                      variant="outline"
                      className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400"
                    >
                      {file.status}
                    </Badge>
                  ) : file.status === "Expired" ? (
                    <Badge
                      variant="outline"
                      className="text-slate-500 border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800"
                    >
                      {file.status}
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-amber-600 border-amber-200 bg-amber-50"
                    >
                      {file.status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={file.status !== "Completed"}
                  >
                    <Download className="h-4 w-4 text-slate-500 hover:text-emerald-600 transition-colors" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
