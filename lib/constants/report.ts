import { REGION_LABELS } from "@/types/commodity";
import type {
  ReportDetailLevel,
  ReportLocation,
  ReportPeriod,
  ReportType,
} from "@/types/report";

export const PERIOD_OPTIONS: { value: ReportPeriod; label: string }[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "ytd", label: "Year to Date" },
  { value: "1y", label: "Last 1 Year" },
];

export const REPORT_TYPE_OPTIONS: { value: ReportType; label: string }[] = [
  { value: "price-trend", label: "Price Trend Analysis" },
  { value: "market-summary", label: "Market Summary" },
  { value: "forecast", label: "Forecast Report" },
  { value: "volatility", label: "Volatility Report" },
  { value: "regional-comparison", label: "Regional Comparison" },
];

export const DETAIL_LEVEL_OPTIONS: { value: ReportDetailLevel; label: string }[] = [
  { value: "summary", label: "Summary" },
  { value: "standard", label: "Standard" },
  { value: "advanced", label: "Advanced" },
];

export const LOCATION_OPTIONS: { value: ReportLocation; label: string }[] = [
  { value: "NATIONAL", label: "Nationwide" },
  ...(Object.entries(REGION_LABELS) as [ReportLocation, string][]).map(
    ([value, label]) => ({ value, label }),
  ),
];

export function periodLabel(value: ReportPeriod): string {
  return PERIOD_OPTIONS.find((p) => p.value === value)?.label ?? value;
}

export function reportTypeLabel(value: ReportType): string {
  return REPORT_TYPE_OPTIONS.find((t) => t.value === value)?.label ?? value;
}

export function locationLabel(value: ReportLocation): string {
  return LOCATION_OPTIONS.find((l) => l.value === value)?.label ?? value;
}
