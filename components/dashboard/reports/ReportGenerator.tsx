"use client";

import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Sparkles, RefreshCw, Download, Save, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCommodities } from "@/lib/hooks/useCommodities";
import { useGenerateReport, useSaveReport } from "@/lib/hooks/useReports";
import { exportReportToPdf } from "@/lib/utils/export-report-pdf";
import {
  PERIOD_OPTIONS,
  REPORT_TYPE_OPTIONS,
  DETAIL_LEVEL_OPTIONS,
  LOCATION_OPTIONS,
} from "@/lib/constants/report";
import { ReportView } from "./ReportView";
import type {
  GenerateReportParams,
  ReportDetailLevel,
  ReportLocation,
  ReportPeriod,
  ReportType,
} from "@/types/report";

export default function ReportGenerator() {
  const { data: commodityIndex } = useCommodities({ limit: 100, isActive: true });
  const generateMutation = useGenerateReport();
  const saveMutation = useSaveReport();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [config, setConfig] = useState({
    commodityId: "",
    commodityName: "",
    location: "NATIONAL" as ReportLocation,
    period: "30d" as ReportPeriod,
    reportType: "market-summary" as ReportType,
    detailLevel: "standard" as ReportDetailLevel,
    includeCharts: true,
    includeComparisons: false,
    includeAI: true,
  });

  const generatedReport = generateMutation.data ?? null;
  const isGenerating = generateMutation.isPending;

  const handleGenerate = () => {
    if (!config.commodityId) return;

    const params: GenerateReportParams = {
      commodityId: config.commodityId,
      location: config.location,
      period: config.period,
      reportType: config.reportType,
      detailLevel: config.detailLevel,
      includeCharts: config.includeCharts,
      includeComparisons: config.includeComparisons,
      includeAI: config.includeAI,
    };

    setIsSaved(false);
    generateMutation.mutate(params, {
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to generate report.",
        );
      },
    });
  };

  const handleSave = () => {
    if (!generatedReport) return;
    const params: GenerateReportParams = {
      commodityId: config.commodityId,
      location: config.location,
      period: config.period,
      reportType: config.reportType,
      detailLevel: config.detailLevel,
      includeCharts: config.includeCharts,
      includeComparisons: config.includeComparisons,
      includeAI: config.includeAI,
    };
    saveMutation.mutate(
      { config: params, commodityName: config.commodityName, result: generatedReport },
      {
        onSuccess: () => {
          setIsSaved(true);
          toast.success("Report saved.");
        },
        onError: () => toast.error("Failed to save report."),
      },
    );
  };

  const handleDownload = async () => {
    if (!reportRef.current || !generatedReport) return;
    setIsExporting(true);
    try {
      await exportReportToPdf(reportRef.current, generatedReport.title);
    } catch {
      toast.error("Failed to export PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  const isFormValid = !!config.commodityId;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT PANEL: CONFIGURATION */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              Create New Report
            </CardTitle>
            <CardDescription>
              Configure parameters to generate AI-powered market intelligence.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Commodity & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Commodity</Label>
                <Select
                  value={config.commodityId}
                  onValueChange={(v) => {
                    const commodity = commodityIndex?.data.find((c) => c.id === v);
                    setConfig({
                      ...config,
                      commodityId: v,
                      commodityName: commodity?.name ?? "",
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {commodityIndex?.data.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Select
                  value={config.location}
                  onValueChange={(v) =>
                    setConfig({ ...config, location: v as ReportLocation })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATION_OPTIONS.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time Range & Report Type */}
            <div className="space-y-2">
              <Label>Time Range</Label>
              <Select
                value={config.period}
                onValueChange={(v) => setConfig({ ...config, period: v as ReportPeriod })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PERIOD_OPTIONS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select
                value={config.reportType}
                onValueChange={(v) => setConfig({ ...config, reportType: v as ReportType })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPE_OPTIONS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Detail Level</Label>
              <Select
                value={config.detailLevel}
                onValueChange={(v) =>
                  setConfig({ ...config, detailLevel: v as ReportDetailLevel })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DETAIL_LEVEL_OPTIONS.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Toggles */}
            <div className="space-y-3">
              <Label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                Include in Report
              </Label>
              <div className="space-y-3">
                <ToggleRow
                  label="Price Trend Chart"
                  checked={config.includeCharts}
                  onChange={(checked) =>
                    setConfig({ ...config, includeCharts: checked })
                  }
                />
                <ToggleRow
                  label="Regional Comparisons"
                  checked={config.includeComparisons}
                  onChange={(checked) =>
                    setConfig({ ...config, includeComparisons: checked })
                  }
                />
                <ToggleRow
                  label="AI Analysis & Recommendations"
                  checked={config.includeAI}
                  onChange={(checked) =>
                    setConfig({ ...config, includeAI: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md transition-all"
              size="lg"
              disabled={!isFormValid || isGenerating}
              onClick={handleGenerate}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Signals...
                </>
              ) : (
                "Generate Intelligence Report"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* RIGHT PANEL: LIVE PREVIEW */}
      <div className="lg:col-span-7">
        <Card className="min-h-[600px] border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
          {!generatedReport && !isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2">
                <Sparkles className="h-8 w-8 text-slate-300" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                  Ready to Generate
                </h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">
                  Configure your parameters on the left and click Generate to
                  see AI-powered market insights here.
                </p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-6 bg-white dark:bg-slate-950 z-10">
              <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white animate-pulse">
                  Analyzing Market Signals...
                </h3>
                <p className="text-sm text-slate-500">
                  Scanning {PERIOD_OPTIONS.find((p) => p.value === config.period)?.label} of
                  data for {config.commodityName}
                </p>
              </div>
            </div>
          )}

          {generatedReport && !isGenerating && (
            <div ref={reportRef} className="flex-1 flex flex-col bg-white dark:bg-slate-950">
              <ReportView report={generatedReport} showChart={config.includeCharts} />

              <CardFooter className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50/30 dark:bg-slate-900/30 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleSave}
                  disabled={saveMutation.isPending || isSaved}
                >
                  {isSaved ? (
                    <Check className="h-4 w-4" />
                  ) : saveMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isSaved ? "Saved" : "Save"}
                </Button>
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-slate-500 hover:text-slate-900"
                  onClick={handleGenerate}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-2" /> Regenerate Analysis
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// Helper Components

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (c: boolean) => void;
}) {
  return (
    <div
      className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-colors"
      onClick={() => onChange(!checked)}
    >
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {label}
      </span>
      <div
        className={cn(
          "w-9 h-5 rounded-full transition-colors relative",
          checked ? "bg-emerald-600" : "bg-slate-200 dark:bg-slate-700",
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </div>
    </div>
  );
}
