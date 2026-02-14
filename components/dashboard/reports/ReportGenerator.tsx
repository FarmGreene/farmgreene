"use client";

import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Sparkles,
  RefreshCw,
  Download,
  Save,
  TrendingUp,
  AlertTriangle,
  MoveRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Selects
const COMMODITIES = ["Maize", "Soybeans", "Wheat", "Cocoa", "Cashew", "Rice"];
const LOCATIONS = [
  "Nationwide",
  "North Central Region",
  "South West Region",
  "Lagos Markets",
  "Kano Dawanau",
];
const PERIODS = ["Last 7 Days", "Last 30 Days", "Year to Date", "Last 1 Year"];
const REPORT_TYPES = [
  "Price Trend Analysis",
  "Market Summary",
  "Forecast Report",
  "Volatility Report",
  "Regional Comparison",
];
const DETAIL_LEVELS = ["Summary", "Standard", "Advanced"];

export default function ReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<null | any>(null);

  // Form State
  const [config, setConfig] = useState({
    commodity: "",
    location: "",
    period: "Last 30 Days",
    type: "Market Summary",
    detail: "Standard",
    includeCharts: true,
    includeComparisons: false,
    includeAI: true,
  });

  const handleGenerate = () => {
    if (!config.commodity || !config.location) return;

    setIsGenerating(true);
    setGeneratedReport(null);

    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratedReport({
        title: `${config.commodity} ${config.type}`,
        subtitle: `Analysis for ${config.location} • ${config.period}`,
        score: 7.8,
        trend: "up",
        summary: `Market intelligence indicates a bullish trend for ${config.commodity} in the ${config.location}. Supply constraints from recent logistics challenges are driving prices upward, while demand remains steady.`,
        insights: [
          `Wholesale prices have increased by 12% over the selected period.`,
          `Major aggregators are holding stock in anticipation of further hikes.`,
          `Cross-border trade volume has dropped slightly due to currency fluctuations.`,
        ],
        forecast: `Expect continued price firmness over the next 14 days. Recommend holding inventory if storage costs are managed below 2%.`,
      });
      setIsGenerating(false);
    }, 2500);
  };

  const isFormValid = config.commodity && config.location;

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
                  value={config.commodity}
                  onValueChange={(v) => setConfig({ ...config, commodity: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {COMMODITIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Select
                  value={config.location}
                  onValueChange={(v) => setConfig({ ...config, location: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
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
                onValueChange={(v) => setConfig({ ...config, period: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PERIODS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select
                value={config.type}
                onValueChange={(v) => setConfig({ ...config, type: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Detail Level</Label>
              <Select
                value={config.detail}
                onValueChange={(v) => setConfig({ ...config, detail: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DETAIL_LEVELS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
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
                  label="Price Trend Charts"
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
                  Scanning {config.period} of data for {config.commodity} in{" "}
                  {config.location}
                </p>
              </div>
            </div>
          )}

          {generatedReport && !isGenerating && (
            <div className="flex-1 flex flex-col">
              {/* Report Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-emerald-50/30 dark:bg-emerald-950/10">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge
                      variant="outline"
                      className="mb-2 border-emerald-200 text-emerald-700 bg-emerald-50"
                    >
                      AI Generated
                    </Badge>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {generatedReport.title}
                    </h2>
                    <p className="text-slate-500 mt-1">
                      {generatedReport.subtitle}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Save className="h-4 w-4" /> Save
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>
              </div>

              {/* Report Body */}
              <div className="p-6 space-y-8 flex-1 overflow-y-auto">
                {/* Insight Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <InsightCard
                    icon={<TrendingUp className="h-4 w-4 text-emerald-600" />}
                    label="Price Trend"
                    value="Bullish"
                    sub="+12.4%"
                    trend="up"
                  />
                  <InsightCard
                    icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
                    label="Volatility"
                    value="Medium"
                    sub="Stable outlook"
                    trend="neutral"
                  />
                  <InsightCard
                    icon={<Sparkles className="h-4 w-4 text-purple-600" />}
                    label="Forecast"
                    value="Buy"
                    sub="High Confidence"
                    trend="up"
                  />
                </div>

                {/* Executive Summary */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Executive Summary
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {generatedReport.summary}
                  </p>
                </div>

                {/* Key Insights */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Key Intelligence
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-5 border border-slate-100 dark:border-slate-800">
                    <ul className="space-y-3">
                      {generatedReport.insights.map(
                        (insight: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex gap-3 text-sm text-slate-700 dark:text-slate-300"
                          >
                            <MoveRight className="h-5 w-5 text-emerald-500 shrink-0" />
                            {insight}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                {/* Forecast Section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    AI Forecast
                  </h3>
                  <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 text-sm text-emerald-900 dark:text-emerald-100">
                    <p className="font-medium">
                      Recommendation: {generatedReport.forecast}
                    </p>
                  </div>
                </div>

                {/* Placeholder Chart */}
                {config.includeCharts && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Price Movement
                    </h3>
                    <div className="h-48 w-full bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 text-xs">
                      [ Interactive Price Chart Visualization ]
                    </div>
                  </div>
                )}
              </div>

              <CardFooter className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50/30 dark:bg-slate-900/30">
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

function InsightCard({
  icon,
  label,
  value,
  sub,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  trend: "up" | "down" | "neutral";
}) {
  const trendColor =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
        ? "text-rose-600"
        : "text-amber-600";

  return (
    <div className="p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-medium uppercase tracking-wider">
        {icon}
        {label}
      </div>
      <div className="text-lg font-bold text-slate-900 dark:text-white">
        {value}
      </div>
      <div className={cn("text-xs font-medium", trendColor)}>{sub}</div>
    </div>
  );
}
