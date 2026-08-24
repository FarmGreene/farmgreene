import { Metadata } from "next";
import {
  PricingHero,
  WhatsIncluded,
  WhatComesLater,
} from "@/components/marketing/pricing/PricingSections";
import { ClosingBand } from "@/components/marketing/ClosingBand";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Farmgreene is free while we're in early access — every feature, every account, no card required.",
};

export default function PricingPage() {
  return (
    <div className="bg-field">
      <PricingHero />
      <WhatsIncluded />
      <WhatComesLater />
      <ClosingBand
        title="Nothing to"
        accent="decide yet"
        lede="Make an account and use the whole thing. We'll talk about money when there's something worth charging for."
        image="/images/stakeholder-farmer.jpg"
        secondary={{ href: "/intelligence", label: "See the market" }}
      />
    </div>
  );
}
