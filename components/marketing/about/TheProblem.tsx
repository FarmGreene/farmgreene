import Image from "next/image";
import { ZoneSpread } from "@/components/marketing/shared/ZoneSpread";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * The problem is demonstrated rather than asserted: the live regional spread
 * beneath this copy is the evidence for the claim above it. `ZoneSpread`
 * renders nothing without real regional data, so on a quiet day the argument
 * stands on the photograph and the text alone.
 */
export function TheProblem() {
  return (
    <section className="relative overflow-hidden bg-loam py-20 md:py-28">
      <div className="absolute inset-0">
        <Image
          src="/images/field-challenge.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-loam via-loam/95 to-loam/75" />
      </div>

      <Wrap className="relative">
        <div className="max-w-2xl">
          <Kicker onDark>The problem</Kicker>
          <Display className="mt-5 text-white">
            The same crop, <Warm onDark>two very different prices</Warm>
          </Display>
          <Lede onDark className="mt-6">
            A farmer selling at the farm gate and a trader buying two regions
            away are often working from completely different ideas of what
            something is worth. That gap isn&rsquo;t an inefficiency to anybody
            — it&rsquo;s somebody&rsquo;s margin, and it usually isn&rsquo;t the
            farmer&rsquo;s.
          </Lede>
        </div>

        <div className="mt-14">
          <ZoneSpread onDark accent="sun" />
        </div>
      </Wrap>
    </section>
  );
}
