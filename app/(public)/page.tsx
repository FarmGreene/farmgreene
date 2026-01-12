import Hero from "@/components/landing/hero";
import UserSegmentation from "@/components/landing/UserSegmentation";
import ValueProposition from "@/components/landing/ValueProposition";
import KeyFeatures from "@/components/landing/KeyFeatures";
import HowItWorks from "@/components/landing/HowItWorks";
import MarketTeaser from "@/components/landing/MarketTeaser";
import TrustSection from "@/components/landing/TrustSection";
import CTASection from "@/components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <UserSegmentation />
      <ValueProposition />
      <KeyFeatures />
      <HowItWorks />
      <MarketTeaser />
      <TrustSection />
      <CTASection />
    </div>
  );
}
