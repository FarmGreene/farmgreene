"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  createChart,
  AreaSeries,
  ColorType,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  Time,
} from "lightweight-charts";
import {
  useCommodityBySlug,
  useWeeklyPriceHistory,
} from "@/lib/hooks/useCommodities";
import type { CommodityWeeklyAverage } from "@/types/commodity";
import { formatNaira, direction } from "@/components/marketing/shared/Figure";
import { Wrap, Display, Warm, Lede, Kicker, Action } from "@/components/marketing/ui";
import {
  LANDING_COMMODITY_SLUG,
  LANDING_COMMODITY_FALLBACK_SLUG,
  LANDING_CHART_WEEKS,
  MIN_CHART_POINTS,
} from "./landing-config";
import { cn } from "@/lib/utils";

/**
 * A year of one commodity's real price history, drawn with the same charting
 * library the dashboard uses (lightweight-charts) so the landing page and the
 * product don't disagree about what a price chart looks like.
 *
 * Which commodity is env-configurable — see landing-config.ts. Weekly averages
 * back the series rather than daily ones: over a year, daily points are both
 * far more data to ship and noisier to read, and the weekly endpoint exists
 * precisely for this range.
 */

interface ChartPoint {
  time: Time;
  value: number;
}

const toIsoDay = (date: string | Date) =>
  new Date(date).toISOString().slice(0, 10);

function toPoints(rows: CommodityWeeklyAverage[] | undefined): ChartPoint[] {
  return [...(rows ?? [])]
    .sort(
      (a, b) =>
        new Date(a.weekStartDate).getTime() -
        new Date(b.weekStartDate).getTime(),
    )
    .map((w) => ({
      time: toIsoDay(w.weekStartDate) as Time,
      value: Number(w.averagePrice),
    }))
    .filter((p) => Number.isFinite(p.value) && p.value > 0);
}

export function PriceChartSection() {
  const { data: primary } = useCommodityBySlug(LANDING_COMMODITY_SLUG);
  const { data: primaryWeekly, isLoading: primaryLoading } =
    useWeeklyPriceHistory(primary?.id ?? "", LANDING_CHART_WEEKS, !!primary?.id);

  const primaryPoints = useMemo(
    () => toPoints(primaryWeekly?.history),
    [primaryWeekly],
  );

  // Only reach for the fallback once we know the configured commodity can't
  // fill a chart — no point paying for the request otherwise.
  const primaryThin =
    !!primary?.id && !primaryLoading && primaryPoints.length < MIN_CHART_POINTS;

  const { data: fallback } = useCommodityBySlug(
    primaryThin ? LANDING_COMMODITY_FALLBACK_SLUG : "",
  );
  const { data: fallbackWeekly, isLoading: fallbackLoading } =
    useWeeklyPriceHistory(
      fallback?.id ?? "",
      LANDING_CHART_WEEKS,
      primaryThin && !!fallback?.id,
    );

  const fallbackPoints = useMemo(
    () => toPoints(fallbackWeekly?.history),
    [fallbackWeekly],
  );

  const usingFallback = primaryThin;
  const points = usingFallback ? fallbackPoints : primaryPoints;
  const weekly = usingFallback ? fallbackWeekly : primaryWeekly;
  const commodity = usingFallback ? fallback : primary;
  const isLoading = primaryLoading || (primaryThin && fallbackLoading);

  // Every figure below is derived from the series actually drawn.
  const stats = useMemo(() => {
    if (points.length === 0) return null;
    const values = points.map((p) => p.value);
    const first = values[0];
    const last = values[values.length - 1];
    return {
      current: last,
      high: Math.max(...values),
      low: Math.min(...values),
      changePct: first > 0 ? ((last - first) / first) * 100 : null,
    };
  }, [points]);

  const name = weekly?.commodity?.name ?? commodity?.name ?? null;
  const unit = weekly?.commodity?.unit ?? commodity?.unit ?? null;
  const dir = direction(stats?.changePct);

  // Nothing real to show — don't render a frame around an empty chart.
  if (!isLoading && points.length < MIN_CHART_POINTS) return null;

  return (
    <section className="bg-field py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>See it working</Kicker>
          <Display className="mt-5">
            A year of <Warm>real prices</Warm>, right here
          </Display>
          <Lede className="mt-6">
            Not a picture of a chart. This is {name ?? "a live commodity"}
            &rsquo;s actual price history, the same figures your account would
            show you.
          </Lede>
        </div>

        <div className="mt-12 overflow-hidden rounded-[24px] border border-bark/10 bg-white shadow-[0_28px_70px_-38px_rgba(4,35,29,0.35)]">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-bark/10 p-6">
            <div>
              <h3 className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-bark">
                {name ?? "—"}
              </h3>
              <p className="mt-1 font-data text-[11px] uppercase tracking-[0.18em] text-bark-soft">
                Last 12 months{unit ? ` · per ${unit}` : ""}
              </p>
            </div>
            <span className="font-data text-[11px] uppercase tracking-[0.18em] text-leaf">
              Weekly average
            </span>
          </div>

          <div className="grid gap-6 border-b border-bark/10 p-6 sm:grid-cols-4">
            <Stat
              label="Today"
              value={stats ? formatNaira(stats.current) : "—"}
              accent
            />
            <Stat
              label="12-month change"
              value={
                stats?.changePct == null
                  ? "—"
                  : `${stats.changePct > 0 ? "+" : "−"}${Math.abs(
                      stats.changePct,
                    ).toFixed(1)}%`
              }
              tone={dir}
            />
            <Stat label="High" value={stats ? formatNaira(stats.high) : "—"} />
            <Stat label="Low" value={stats ? formatNaira(stats.low) : "—"} />
          </div>

          <div className="p-4 sm:p-6">
            {isLoading ? (
              <div
                className="h-[300px] w-full animate-pulse rounded-xl bg-field-2 sm:h-[360px]"
                aria-hidden="true"
              />
            ) : (
              <PriceChart points={points} unit={unit} />
            )}
          </div>
        </div>

        <div className="mt-10">
          <Action href="/signup">Track your own crops</Action>
        </div>
      </Wrap>
    </section>
  );
}

/**
 * Chart instance is created once and then fed data, matching the pattern in
 * the dashboard's CommodityPriceChart — recreating it per data change leaks
 * canvases and loses the crosshair subscription.
 */
function PriceChart({
  points,
  unit,
}: {
  points: ChartPoint[];
  unit: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const [hover, setHover] = useState<{ date: string; price: number } | null>(
    null,
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#5A6661",
        fontSize: 11,
        fontFamily: "var(--font-plex-mono), monospace",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "rgba(28,38,34,0.07)" },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false, fixLeftEdge: true, fixRightEdge: true },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: "rgba(4,152,120,0.35)", labelBackgroundColor: "#049878" },
        horzLine: { color: "rgba(4,152,120,0.35)", labelBackgroundColor: "#049878" },
      },
      handleScale: false,
      handleScroll: false,
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: "#049878",
      lineWidth: 3,
      topColor: "rgba(4,152,120,0.26)",
      bottomColor: "rgba(4,152,120,0)",
      priceLineVisible: false,
      lastValueVisible: false,
    });

    chart.subscribeCrosshairMove((param) => {
      if (!param.time || !param.seriesData.size) {
        setHover(null);
        return;
      }
      const point = param.seriesData.get(series) as { value?: number } | undefined;
      if (point?.value != null) {
        setHover({ date: String(param.time), price: point.value });
      }
    });

    chartRef.current = chart;
    seriesRef.current = series;

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData(points);
    chartRef.current?.timeScale().fitContent();
  }, [points]);

  const latest = points[points.length - 1];
  const shown = hover ?? (latest ? { date: String(latest.time), price: latest.value } : null);

  return (
    <div className="relative">
      {shown && (
        <div className="pointer-events-none absolute left-2 top-0 z-10">
          <span className="font-data text-[11px] tabular-nums text-bark-soft">
            {new Date(shown.date).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="ml-3 font-data text-[15px] font-semibold tabular-nums text-bark">
            {formatNaira(shown.price)}
            {unit && (
              <span className="ml-1 text-[11px] font-normal text-bark-soft">
                / {unit}
              </span>
            )}
          </span>
        </div>
      )}
      <div ref={containerRef} className="h-[300px] w-full pt-7 sm:h-[360px]" />
    </div>
  );
}

function Stat({
  label,
  value,
  accent = false,
  tone,
}: {
  label: string;
  value: string;
  accent?: boolean;
  tone?: "up" | "down" | "flat";
}) {
  return (
    <div>
      <span className="font-data text-[10px] uppercase tracking-[0.18em] text-bark-soft">
        {label}
      </span>
      <span
        className={cn(
          "mt-1.5 block font-data text-[20px] font-semibold tabular-nums",
          accent
            ? "text-leaf"
            : tone === "up"
              ? "text-leaf"
              : tone === "down"
                ? "text-[#A33B28]"
                : tone === "flat"
                  ? "text-bark-soft"
                  : "text-bark",
        )}
      >
        {value}
      </span>
    </div>
  );
}
