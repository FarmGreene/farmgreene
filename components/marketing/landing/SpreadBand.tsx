import Image from "next/image";
import { ZoneSpread } from "@/components/marketing/shared/ZoneSpread";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * The page's single dark section, and the one place the argument is made with
 * data rather than words: the same crop, priced across every region, today.
 *
 * `ZoneSpread` renders nothing when there's no real regional breakdown to show,
 * so this band degrades to the photograph and the copy rather than an empty
 * chart frame.
 */
export function SpreadBand() {
  return (
    <section className="relative overflow-hidden bg-loam py-20 md:py-28">
      <div className="absolute inset-0">
        <Image
          src="/images/field-challenge.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-loam via-loam/95 to-loam/70" />
      </div>

      <Wrap className="relative">
        <div className="max-w-2xl">
          <Kicker onDark>The gap</Kicker>
          <Display className="mt-5 text-white">
            One crop. <Warm onDark>Six different prices.</Warm>
          </Display>
          <Lede onDark className="mt-6">
            Sell at the farm gate without knowing what it fetches two regions
            over, and the difference goes into somebody&rsquo;s pocket.
            Usually not yours. Here&rsquo;s today&rsquo;s gap, from real
            submissions.
          </Lede>
        </div>

        <div className="mt-14">
          <ZoneSpread onDark accent="sun" />
        </div>
      </Wrap>
    </section>
  );
}
