import { Metadata } from "next";
import Hero from "@/components/landing/hero";

export const metadata: Metadata = {
  title: "Farmgreene | Agricultural Equipment Rental & Market Intelligence",
  description:
    "Join the leading agricultural network. Rent equipment, share resources, and access real-time market pricing for better farming decisions.",
};
import UserSegmentation from "@/components/landing/UserSegmentation";
import ValueProposition from "@/components/landing/ValueProposition";
import KeyFeatures from "@/components/landing/KeyFeatures";
import HowItWorks from "@/components/landing/HowItWorks";
import MarketTeaser from "@/components/landing/MarketTeaser";
import TrustSection from "@/components/landing/TrustSection";
import CTASection from "@/components/landing/CTASection";
import { Logo } from "@/components/layout/Logo";

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
