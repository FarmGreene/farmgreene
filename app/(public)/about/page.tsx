import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Farmgreene's mission to revolutionize Australian agriculture through equipment sharing, transparency, and data-driven insights.",
};
import ProblemSection from "@/components/about/ProblemSection";
import MissionVision from "@/components/about/MissionVision";
import WhoWeServe from "@/components/about/WhoWeServe";
import Differentiators from "@/components/about/Differentiators";
import Approach from "@/components/about/Approach";
import TeamSection from "@/components/about/TeamSection";
import FutureRoadmap from "@/components/about/FutureRoadmap";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AboutHero />
      <ProblemSection />
      <MissionVision />
      <WhoWeServe />
      <Differentiators />
      <Approach />
      <TeamSection />
      <FutureRoadmap />
      <AboutCTA />
    </div>
  );
}
