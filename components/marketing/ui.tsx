import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Landing-page building blocks for the "Market Morning" direction.
 *
 * Warm daylight ground, brand green (#049878) as the anchor, maize gold used
 * sparingly. Kept separate from components/marketing/shared/ so the landing can
 * carry this register without the other pages changing until it's signed off.
 */

export function Wrap({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Display heading. The `italic` span is the page's warmest device — Fraunces
 * italic on the phrase that matters, borrowed from editorial rather than from
 * software marketing.
 */
export function Display({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      className={cn(
        "font-display font-semibold tracking-[-0.032em] text-bark",
        // Set tight (0.98) at both sizes — display type this large reads as
        // gappy at normal leading. Kept per-branch so the two can diverge if
        // the h1 ever needs to set tighter than the h2.
        Tag === "h1"
          ? "text-[clamp(2.6rem,6vw,4.75rem)] leading-[1.05]"
          : "text-[clamp(2rem,3.8vw,3.1rem)] leading-[0.98]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** The accent phrase inside a Display heading. */
export function Warm({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <em
      className={cn(
        "font-display italic font-normal",
        onDark ? "text-sun" : "text-leaf",
      )}
    >
      {children}
    </em>
  );
}

export function Lede({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-[17px] leading-[1.65]",
        onDark ? "text-white/65" : "text-bark-soft",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Small rounded label. Gold dot ties it to the accent without shouting. */
export function Tag({
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
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium",
        onDark
          ? "border-white/15 bg-white/[0.06] text-white/80"
          : "border-leaf/20 bg-leaf-tint text-leaf-deep",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-sun" />
      {children}
    </span>
  );
}

/**
 * Primary action. The arrow sits in its own chip — a small piece of craft
 * borrowed from the reference that makes the button feel considered.
 */
export function Action({
  href,
  children,
  variant = "solid",
  onDark = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  onDark?: boolean;
  className?: string;
}) {
  const solid = variant === "solid";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-[15px] font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2",
        onDark
          ? "focus-visible:ring-offset-loam"
          : "focus-visible:ring-offset-field",
        solid
          ? "bg-leaf text-white hover:bg-leaf-dark"
          : onDark
            ? "border border-white/20 text-white hover:bg-white/[0.07]"
            : "border border-bark/15 text-bark hover:bg-bark/[0.04]",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
          solid
            ? "bg-white text-leaf"
            : onDark
              ? "bg-white/12 text-white"
              : "bg-leaf text-white",
        )}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M3 11 L11 3 M5 3 h6 v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

/** Section label sitting above a heading. */
export function Kicker({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-data text-[11px] uppercase tracking-[0.2em]",
        onDark ? "text-sun" : "text-leaf",
      )}
    >
      {children}
    </span>
  );
}
