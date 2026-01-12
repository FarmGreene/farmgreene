import PricingHero from "@/components/pricing/PricingHero";
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
