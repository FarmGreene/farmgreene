import { Metadata } from "next";
import PricingHero from "@/components/pricing/PricingHero";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description:
    "Choose the flexible plan that fits your farm. Start for free and upgrade for advanced market intelligence and equipment listing tools.",
};
import PricingCards from "@/components/pricing/PricingCards";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import AIExplainer from "@/components/pricing/AIExplainer";
import TradingViewSection from "@/components/pricing/TradingViewSection";
import WorkspacesSection from "@/components/pricing/WorkspacesSection";
import FAQSection from "@/components/pricing/FAQSection";
import PricingCTA from "@/components/pricing/PricingCTA";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PricingHero />
      <PricingCards />
      <FeatureComparison />
      <AIExplainer />
      <TradingViewSection />
      <WorkspacesSection />
      <FAQSection />
      <PricingCTA />
    </div>
  );
}
