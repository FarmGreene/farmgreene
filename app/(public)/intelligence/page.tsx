import { Metadata } from "next";
import { IntelligenceHero } from "@/components/marketing/intelligence/IntelligenceHero";
import { Coverage } from "@/components/marketing/intelligence/Coverage";
import { PriceChartSection } from "@/components/marketing/landing/PriceChartSection";
import { SpreadBand } from "@/components/marketing/intelligence/SpreadBand";
import {
  AnalysisSection,
  AlertsSection,
} from "@/components/marketing/intelligence/AnalysisAndAlerts";
import { NewsSection } from "@/components/marketing/intelligence/NewsSection";
import { ClosingBand } from "@/components/marketing/ClosingBand";

export const metadata: Metadata = {
  title: "Market Intelligence",
  description:
    "Daily commodity prices with regional breakdowns and a year of history, alerts when your target is hit, and written market analysis with its sources attached.",
};

export default function IntelligencePage() {
  return (
    <div className="bg-field">
      <IntelligenceHero />
      <Coverage />
      <PriceChartSection />
      <SpreadBand />
      <AnalysisSection />
      <AlertsSection />
      <NewsSection />
      <ClosingBand
        title="Put a price"
        accent="on it"
        lede="Make an account, build a watchlist, and set your first alert in a couple of minutes."
        image="/images/stakeholder-farmer.jpg"
        secondary={{ href: "/marketplace", label: "See the marketplace" }}
      />
    </div>
  );
}
