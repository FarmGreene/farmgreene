"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { useSavedReport } from "@/lib/hooks/useReports";
import { exportReportToPdf } from "@/lib/utils/export-report-pdf";
import { ReportView } from "./ReportView";

interface SavedReportViewDialogProps {
  reportId: string | null;
  onOpenChange: (open: boolean) => void;
}

export function SavedReportViewDialog({
  reportId,
  onOpenChange,
}: SavedReportViewDialogProps) {
  const { data: report, isLoading } = useSavedReport(reportId ?? undefined, !!reportId);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (!contentRef.current || !report) return;
    setIsExporting(true);
    try {
      await exportReportToPdf(contentRef.current, report.title);
    } catch {
      toast.error("Failed to export PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={!!reportId} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{report?.title ?? "Saved Report"}</DialogTitle>
        </DialogHeader>
        {isLoading || !report ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-col bg-white dark:bg-slate-950">
            <div ref={contentRef} className="flex flex-col bg-white dark:bg-slate-950">
              <ReportView report={report.result} showChart={!!report.result.chart} />
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 p-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleDownload}
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
