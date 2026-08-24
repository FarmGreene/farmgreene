import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  generateReport,
  saveReport,
  getSavedReports,
  getSavedReport,
  deleteSavedReport,
} from "@/lib/services/report.service";
import type { GenerateReportParams, ReportResult } from "@/types/report";

/** Generates a report on demand — not cached, every call is a fresh POST. */
export function useGenerateReport() {
  return useMutation({
    mutationFn: (params: GenerateReportParams) => generateReport(params),
  });
}

export const savedReportKeys = {
  all: ["saved-reports"] as const,
  list: () => [...savedReportKeys.all, "list"] as const,
  detail: (id: string) => [...savedReportKeys.all, "detail", id] as const,
};

export function useSavedReports() {
  return useQuery({
    queryKey: savedReportKeys.list(),
    queryFn: getSavedReports,
    staleTime: 60 * 1000,
  });
}

export function useSavedReport(id: string | undefined, enabled = true) {
  return useQuery({
    queryKey: savedReportKeys.detail(id ?? ""),
    queryFn: () => getSavedReport(id!),
    enabled: !!id && enabled,
  });
}

export function useSaveReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      config,
      commodityName,
      result,
    }: {
      config: GenerateReportParams;
      commodityName: string;
      result: ReportResult;
    }) => saveReport(config, commodityName, result),
    onSuccess: () => qc.invalidateQueries({ queryKey: savedReportKeys.list() }),
  });
}

export function useDeleteSavedReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSavedReport(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: savedReportKeys.list() }),
  });
}
