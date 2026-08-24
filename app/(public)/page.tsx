import { Metadata } from "next";
import { Hero } from "@/components/marketing/landing/Hero";
import { WhoItsFor } from "@/components/marketing/landing/WhoItsFor";
import { PriceChartSection } from "@/components/marketing/landing/PriceChartSection";
import { WhatYouGet } from "@/components/marketing/landing/WhatYouGet";
import { SpreadBand } from "@/components/marketing/landing/SpreadBand";
import { NearYou } from "@/components/marketing/landing/NearYou";
import { HowItWorks } from "@/components/marketing/landing/HowItWorks";
import { ClosingBand } from "@/components/marketing/ClosingBand";

export const metadata: Metadata = {
  title: "Farmgreene | Agricultural Equipment Rental & Market Intelligence",
  description:
    "Know what your harvest is worth before you sell it. Daily commodity prices recorded in real markets and broken down by region, plus farm equipment to rent from owners near you.",
};

/**
 * Section order alternates ground tones so the dark bands (SpreadBand,
 * ClosingBand) stay spaced rather than stacking. The live price chart sits
 * early and deliberately: proof arrives before the explaining starts.
 *
 * There was an "Inside the app" section here showing product screens. It was
 * removed because the three images it used are stock renders of a farm-
 * operations dashboard that does not exist — soil moisture, crop-health NDVI,
 * yield estimates, earnings in US dollars — presented as screenshots of this
 * product. Restore the section once there are real captures to put in it.
 */
export default function LandingPage() {
  return (
    <div className="bg-field">
      <Hero />
      <WhoItsFor />
      <PriceChartSection />
      <WhatYouGet />
      <SpreadBand />
      <NearYou />
      <HowItWorks />
      <ClosingBand
        title="Start with"
        accent="today's prices"
        lede="Make an account and the prices, the alerts and the marketplace are yours. No card, no trial running down."
        secondary={{ href: "/intelligence", label: "See today's prices" }}
      />
    </div>
  );
}
