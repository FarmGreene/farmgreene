import { Metadata } from "next";
import MarketHero from "@/components/market/MarketHero";

export const metadata: Metadata = {
  title: "Market Intelligence",
  description:
    "Access real-time agricultural market data, crop pricing trends, and AI-driven insights to maximize your farm's profitability.",
};
import MarketProblem from "@/components/market/MarketProblem";
import DataCoverage from "@/components/market/DataCoverage";
import AIAnalysis from "@/components/market/AIAnalysis";
import ChartsAnalysis from "@/components/market/ChartsAnalysis";
import MarketNews from "@/components/market/MarketNews";
import CollaborationSection from "@/components/market/CollaborationSection";
import PlanTieIn from "@/components/market/PlanTieIn";
import MarketCTA from "@/components/market/MarketCTA";

export default function MarketPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketHero />
      <MarketProblem />
      <DataCoverage />
      <AIAnalysis />
      <ChartsAnalysis />
      <MarketNews />
      <CollaborationSection />
      <PlanTieIn />
      <MarketCTA />
    </div>
  );
}
