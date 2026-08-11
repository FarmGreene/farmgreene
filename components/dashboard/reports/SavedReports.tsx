"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Eye, Trash2, FileText, Filter, Loader2 } from "lucide-react";
import { NotFoundIllustration } from "@/components/ui/illustrations";
import { toast } from "sonner";
import { useSavedReports, useDeleteSavedReport } from "@/lib/hooks/useReports";
import { REPORT_TYPE_OPTIONS, locationLabel } from "@/lib/constants/report";
import { SavedReportViewDialog } from "./SavedReportViewDialog";
import { HiddenReportDownloader } from "./HiddenReportDownloader";
import type { ReportType } from "@/types/report";

export default function SavedReports() {
  const { data: reports = [], isLoading } = useSavedReports();
  const deleteMutation = useDeleteSavedReport();

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<ReportType | "All">("All");
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || report.reportType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Report deleted."),
      onError: () => toast.error("Failed to delete report."),
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search reports..."
            className="pl-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v as ReportType | "All")}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-slate-600 dark:text-slate-300">
                  {typeFilter === "All"
                    ? "All Types"
                    : REPORT_TYPE_OPTIONS.find((t) => t.value === typeFilter)?.label}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              {REPORT_TYPE_OPTIONS.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
            <TableRow>
              <TableHead className="w-[40%] pl-6">Report Title</TableHead>
              <TableHead>Commodity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date Generated</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-96 text-center">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id} className="group">
                  <TableCell className="pl-6 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-slate-900 dark:text-white font-medium">
                          {report.title}
                        </div>
                        <div className="text-xs text-slate-500 md:hidden">
                          {REPORT_TYPE_OPTIONS.find((t) => t.value === report.reportType)?.label}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="font-normal text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    >
                      {report.commodityName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">
                    {locationLabel(report.location)}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-emerald-600"
                        onClick={() => setViewingId(report.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-emerald-600"
                        disabled={downloadingId === report.id}
                        onClick={() => setDownloadingId(report.id)}
                      >
                        {downloadingId === report.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-red-600"
                        onClick={() => handleDelete(report.id, report.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-96 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <NotFoundIllustration className="h-48 w-64" />
                    <div className="text-slate-900 dark:text-white font-medium">
                      No reports found
                    </div>
                    <p className="text-slate-500 text-sm max-w-sm">
                      Try adjusting your search filters or generate a new report
                      to see it here.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <SavedReportViewDialog
        reportId={viewingId}
        onOpenChange={(open) => !open && setViewingId(null)}
      />
      <HiddenReportDownloader
        reportId={downloadingId}
        onDone={() => setDownloadingId(null)}
      />
    </div>
  );
}
