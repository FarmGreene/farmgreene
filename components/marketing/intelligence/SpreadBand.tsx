import Image from "next/image";
import { ZoneSpread } from "@/components/marketing/shared/ZoneSpread";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * The page's single dark section: one crop, priced across every region, today.
 * `ZoneSpread` renders nothing without real regional data, so this degrades to
 * the photograph and the copy rather than an empty chart frame.
 */
export function SpreadBand() {
  return (
    <section className="relative overflow-hidden bg-loam py-20 md:py-28">
      <div className="absolute inset-0">
        <Image
          src="/images/market-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-loam via-loam/95 to-loam/75" />
      </div>

      <Wrap className="relative">
        <div className="max-w-2xl">
          <Kicker onDark>Region by region</Kicker>
          <Display className="mt-5 text-white">
            One crop. <Warm onDark>Six different prices.</Warm>
          </Display>
          <Lede onDark className="mt-6">
            The gap between the cheapest and dearest region is the part nobody
            tells you about at the farm gate. Here it is, from today&rsquo;s
            approved submissions.
          </Lede>
        </div>

        <div className="mt-14">
          <ZoneSpread onDark accent="sun" />
        </div>
      </Wrap>
    </section>
  );
}
