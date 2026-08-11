import type { NigerianRegion } from "@/types/commodity";

export type ReportLocation = NigerianRegion | "NATIONAL";
export type ReportPeriod = "7d" | "30d" | "ytd" | "1y";
export type ReportType =
  | "price-trend"
  | "market-summary"
  | "forecast"
  | "volatility"
  | "regional-comparison";
export type ReportDetailLevel = "summary" | "standard" | "advanced";

export interface GenerateReportParams {
  commodityId: string;
  location: ReportLocation;
  period: ReportPeriod;
  reportType: ReportType;
  detailLevel: ReportDetailLevel;
  includeCharts: boolean;
  includeComparisons: boolean;
  includeAI: boolean;
}

export interface ReportSource {
  title: string;
  url: string;
}

export interface ReportAiSection {
  summary: string;
  insights: string[];
  forecast: string;
  recommendation: "Buy" | "Hold" | "Sell" | "Watch";
  confidence: number;
  sources: ReportSource[];
}

export interface ReportResult {
  title: string;
  subtitle: string;
  metrics: {
    currentPrice: number;
    unit: string;
    trend: "up" | "down" | "flat";
    periodChangePct: number | null;
    high: number;
    low: number;
    volatilityPct: number;
    volatilityLevel: "low" | "medium" | "high";
    regionalDataAvailable: boolean;
  };
  chart: { date: string; price: number }[] | null;
  regional: { region: string; price: number }[] | null;
  ai: ReportAiSection | null;
}

export interface SavedReportSummary {
  id: string;
  title: string;
  subtitle: string;
  commodityId: string;
  commodityName: string;
  reportType: ReportType;
  period: ReportPeriod;
  location: ReportLocation;
  hasAi: boolean;
  createdAt: string;
}

export interface SavedReport extends SavedReportSummary {
  config: GenerateReportParams;
  result: ReportResult;
}
