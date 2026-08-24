import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Layout and action primitives for the marketing site. Keeping container width,
 * section rhythm, and CTA styling in one file is what holds the vertical
 * spacing consistent across eight pages — the usual failure mode is each page
 * inventing its own padding scale.
 */

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * `tone` sets the ground. `deep` is the bush-green data band used to frame the
 * board and the regional spread; `chalk` and `chalk-deep` alternate on light.
 */
export function Section({
  children,
  tone = "chalk",
  className,
  id,
}: {
  children: React.ReactNode;
  tone?: "chalk" | "chalk-deep" | "deep";
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        tone === "chalk" && "bg-chalk text-ink",
        tone === "chalk-deep" && "bg-chalk-deep text-ink",
        tone === "deep" && "bg-bush-900 text-white py-24 md:py-32",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

const ctaBase =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 h-12 text-[15px] font-semibold transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-harmattan-500";

export function CTA({
  href,
  children,
  variant = "primary",
  onDark = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        ctaBase,
        onDark
          ? "focus-visible:ring-offset-bush-900"
          : "focus-visible:ring-offset-chalk",
        variant === "primary" &&
          "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
        variant === "secondary" &&
          (onDark
            ? "border border-bush-700 text-white hover:bg-white/[0.06]"
            : "border border-ink/15 text-ink hover:bg-ink/[0.04]"),
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Inline text link with the gold underline treatment. */
export function TextLink({
  href,
  children,
  onDark = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-[15px] font-semibold",
        "underline decoration-1 underline-offset-[6px] transition-colors",
        onDark
          ? "text-harmattan-400 decoration-harmattan-400/35 hover:decoration-harmattan-400"
          : "text-harmattan-600 decoration-harmattan-600/35 hover:decoration-harmattan-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harmattan-500 focus-visible:rounded-sm",
        className,
      )}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

/** Large display heading used by page heroes. */
export function DisplayHeading({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "font-display font-semibold tracking-[-0.035em] leading-[0.98]",
        "text-[clamp(2.5rem,5.5vw,4.5rem)]",
        onDark ? "text-white" : "text-ink",
        className,
      )}
    >
      {children}
    </h1>
  );
}
