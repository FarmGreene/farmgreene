import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  MoveRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { REGION_LABELS } from "@/types/commodity";
import type { ReportResult } from "@/types/report";

export function ReportView({
  report,
  showChart,
}: {
  report: ReportResult;
  showChart: boolean;
}) {
  const { metrics, ai, chart, regional } = report;

  return (
    <>
      {/* Report Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-emerald-50/30 dark:bg-emerald-950/10">
        <div className="flex justify-between items-start">
          <div>
            <Badge
              variant="outline"
              className="mb-2 border-emerald-200 text-emerald-700 bg-emerald-50"
            >
              {ai ? "AI Generated" : "Data Report"}
            </Badge>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {report.title}
            </h2>
            <p className="text-slate-500 mt-1">{report.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Report Body */}
      <div className="p-6 space-y-8 flex-1 overflow-y-auto">
        {/* Insight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InsightCard
            icon={<TrendIcon trend={metrics.trend} />}
            label="Price Trend"
            value={metrics.trend === "up" ? "Bullish" : metrics.trend === "down" ? "Bearish" : "Flat"}
            sub={
              metrics.periodChangePct != null
                ? `${metrics.periodChangePct >= 0 ? "+" : ""}${metrics.periodChangePct.toFixed(1)}%`
                : "No change data"
            }
            trend={metrics.trend === "flat" ? "neutral" : metrics.trend}
          />
          <InsightCard
            icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
            label="Volatility"
            value={
              metrics.volatilityLevel.charAt(0).toUpperCase() +
              metrics.volatilityLevel.slice(1)
            }
            sub={`${metrics.volatilityPct.toFixed(1)}% CoV`}
            trend="neutral"
          />
          <InsightCard
            icon={<Sparkles className="h-4 w-4 text-purple-600" />}
            label="Recommendation"
            value={ai?.recommendation ?? "—"}
            sub={ai ? `${ai.confidence}/10 confidence` : "Not generated"}
            trend={
              ai?.recommendation === "Buy" ? "up" : ai?.recommendation === "Sell" ? "down" : "neutral"
            }
          />
        </div>

        {!metrics.regionalDataAvailable && (
          <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-md px-3 py-2">
            No regional data available for the selected region — showing nationwide figures instead.
          </p>
        )}

        {/* Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Executive Summary
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {ai?.summary ??
              `No AI analysis available — showing computed price data for ${report.title.split(" ")[0]} over the selected period. Current price: ₦${metrics.currentPrice.toLocaleString()} per ${metrics.unit}.`}
          </p>
        </div>

        {/* Key Insights */}
        {ai && ai.insights.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Key Intelligence
            </h3>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-5 border border-slate-100 dark:border-slate-800">
              <ul className="space-y-3">
                {ai.insights.map((insight, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <MoveRight className="h-5 w-5 text-emerald-500 shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Forecast Section */}
        {ai && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              AI Forecast
            </h3>
            <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 text-sm text-emerald-900 dark:text-emerald-100">
              <p className="font-medium">{ai.forecast}</p>
            </div>
            {ai.sources.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {ai.sources.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-emerald-600 underline underline-offset-2"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Price Chart */}
        {showChart && chart && chart.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Price Movement
            </h3>
            <div className="h-56 w-full bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chart}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} width={60} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#059669"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Regional Comparison */}
        {regional && regional.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Regional Comparison
            </h3>
            <div className="rounded-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {regional
                    .slice()
                    .sort((a, b) => b.price - a.price)
                    .map((r) => (
                      <tr
                        key={r.region}
                        className="border-b last:border-b-0 border-slate-100 dark:border-slate-800"
                      >
                        <td className="px-4 py-2 text-slate-600 dark:text-slate-400">
                          {REGION_LABELS[r.region as keyof typeof REGION_LABELS] ?? r.region}
                        </td>
                        <td className="px-4 py-2 text-right font-medium text-slate-900 dark:text-white">
                          ₦{r.price.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-600" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-rose-600" />;
  return <Minus className="h-4 w-4 text-slate-400" />;
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
