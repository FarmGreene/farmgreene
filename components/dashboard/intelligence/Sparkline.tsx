"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "flat";

interface SparklineProps {
  /** Chronological price points (oldest → newest). */
  data: number[];
  trend?: Trend;
  width?: number;
  height?: number;
  className?: string;
}

const STROKE: Record<Trend, string> = {
  up: "#059669", // emerald-600
  down: "#e11d48", // rose-600
  flat: "#94a3b8", // slate-400
};

/**
 * Tiny dependency-free SVG trend line for commodity cards. Renders a filled
 * area + stroke from a series of price points. Falls back to a dashed baseline
 * when there isn't enough history, so a card never looks broken/empty.
 */
export default function Sparkline({
  data,
  trend = "flat",
  width = 120,
  height = 40,
  className,
}: SparklineProps) {
  const gradientId = useId();
  const points = (data ?? []).filter(
    (n) => typeof n === "number" && Number.isFinite(n),
  );
  const stroke = STROKE[trend];

  if (points.length < 2) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={cn("w-full", className)}
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="#e2e8f0"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const pad = 3;
  const usableH = height - pad * 2;
  const stepX = width / (points.length - 1);

  const coords = points.map((p, i) => {
    const x = i * stepX;
    const y = pad + usableH - ((p - min) / range) * usableH;
    return [x, y] as const;
  });

  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("w-full overflow-visible", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.16" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} stroke="none" />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
