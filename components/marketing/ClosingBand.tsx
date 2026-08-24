import Image from "next/image";
import { Wrap, Display, Warm, Lede, Action } from "./ui";

/**
 * The closing band, shared across marketing pages so the site ends the same
 * way each time. Closes on a photograph rather than a flat colour block — the
 * last thing you see should be the work.
 */
export function ClosingBand({
  title,
  accent,
  lede,
  image = "/images/hero-farm.png",
  primary = { href: "/signup", label: "Start free" },
  secondary,
}: {
  title: React.ReactNode;
  accent: React.ReactNode;
  lede: string;
  image?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden bg-loam py-24 md:py-32">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-loam/95 via-loam/85 to-loam/95" />
      </div>

      <Wrap className="relative text-center">
        <Display className="mx-auto max-w-3xl text-white">
          {title} <Warm onDark>{accent}</Warm>
        </Display>
        <Lede onDark className="mx-auto mt-6 max-w-xl">
          {lede}
        </Lede>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Action href={primary.href}>{primary.label}</Action>
          {secondary && (
            <Action href={secondary.href} variant="outline" onDark>
              {secondary.label}
            </Action>
          )}
        </div>
      </Wrap>
    </section>
  );
}
