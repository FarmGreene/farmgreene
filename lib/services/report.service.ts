import { apiClient } from "@/lib/api/axios";
import type {
  GenerateReportParams,
  ReportResult,
  SavedReport,
  SavedReportSummary,
} from "@/types/report";

/** POST /reports/generate */
export async function generateReport(
  params: GenerateReportParams,
): Promise<ReportResult> {
  const { data } = await apiClient.post("/reports/generate", params);
  return data;
}

/** POST /reports/save */
export async function saveReport(
  config: GenerateReportParams,
  commodityName: string,
  result: ReportResult,
): Promise<SavedReport> {
  const { data } = await apiClient.post("/reports/save", {
    config,
    commodityName,
    result,
  });
  return data;
}

/** GET /reports/saved */
export async function getSavedReports(): Promise<SavedReportSummary[]> {
  const { data } = await apiClient.get("/reports/saved");
  return data;
}

/** GET /reports/saved/:id */
export async function getSavedReport(id: string): Promise<SavedReport> {
  const { data } = await apiClient.get(`/reports/saved/${id}`);
  return data;
}

/** DELETE /reports/saved/:id */
export async function deleteSavedReport(id: string): Promise<void> {
  await apiClient.delete(`/reports/saved/${id}`);
}
