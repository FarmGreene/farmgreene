import { cn } from "@/lib/utils";

/**
 * Every number on the marketing site renders through here, so figures stay
 * typographically identical site-wide: IBM Plex Mono, tabular so digits don't
 * jitter between values, and one shared rule for up/down/flat colour.
 */

/** ₦82,400 — no decimals; commodity prices are whole naira in practice. */
export function formatNaira(value: number): string {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
}

/** Compact form for tight spaces: ₦82.4k, ₦1.2m */
export function formatNairaCompact(value: number): string {
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `₦${(value / 1_000).toFixed(1)}k`;
  return `₦${Math.round(value)}`;
}

export function Price({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <span className={cn("font-data tabular-nums tracking-tight", className)}>
      {formatNaira(value)}
    </span>
  );
}

/**
 * Direction is decided here, once: anything inside ±0.05% is flat rather than
 * a misleading hairline arrow.
 */
export function direction(change: number | null | undefined) {
  if (typeof change !== "number" || Number.isNaN(change)) return "flat" as const;
  if (change > 0.05) return "up" as const;
  if (change < -0.05) return "down" as const;
  return "flat" as const;
}

export function ChangeChip({
  change,
  onDark = false,
  className,
}: {
  change: number | null | undefined;
  onDark?: boolean;
  className?: string;
}) {
  const dir = direction(change);

  const tone =
    dir === "up"
      ? onDark
        ? "text-rise-bright"
        : "text-rise"
      : dir === "down"
        ? onDark
          ? "text-fall-bright"
          : "text-fall"
        : onDark
          ? "text-white/40"
          : "text-ink-muted";

  return (
    <span
      className={cn(
        "font-data tabular-nums text-[12px] font-medium inline-flex items-center gap-1",
        tone,
        className,
      )}
    >
      <Arrow dir={dir} />
      {dir === "flat" || typeof change !== "number"
        ? "0.0%"
        : `${change > 0 ? "+" : "−"}${Math.abs(change).toFixed(1)}%`}
    </span>
  );
}

function Arrow({ dir }: { dir: "up" | "down" | "flat" }) {
  if (dir === "flat") {
    return (
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
        <rect x="0" y="3.4" width="8" height="1.2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      aria-hidden="true"
      className={dir === "down" ? "rotate-180" : undefined}
    >
      <path d="M4 0 L8 7 L0 7 Z" fill="currentColor" />
    </svg>
  );
}

/** Small uppercase mono label used for eyebrows and column headers. */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-data text-[11px] uppercase tracking-[0.18em]",
        onDark ? "text-harmattan-400" : "text-harmattan-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
