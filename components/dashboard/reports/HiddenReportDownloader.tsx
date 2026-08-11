"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSavedReport } from "@/lib/hooks/useReports";
import { exportReportToPdf } from "@/lib/utils/export-report-pdf";
import { ReportView } from "./ReportView";

/** Renders the selected saved report off-screen, captures it to PDF, then clears itself. */
export function HiddenReportDownloader({
  reportId,
  onDone,
}: {
  reportId: string | null;
  onDone: () => void;
}) {
  const { data: report } = useSavedReport(reportId ?? undefined, !!reportId);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reportId || !report || !ref.current) return;
    let cancelled = false;
    (async () => {
      try {
        await exportReportToPdf(ref.current!, report.title);
      } catch {
        if (!cancelled) toast.error("Failed to export PDF.");
      } finally {
        if (!cancelled) onDone();
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportId, report]);

  if (!reportId || !report) return null;

  return (
    <div
      ref={ref}
      className="fixed top-0 -left-[9999px] w-[800px] flex flex-col bg-white dark:bg-slate-950"
      aria-hidden
    >
      <ReportView report={report.result} showChart={!!report.result.chart} />
    </div>
  );
}
