import AboutHero from "@/components/about/AboutHero";
import ProblemSection from "@/components/about/ProblemSection";
import MissionVision from "@/components/about/MissionVision";
import WhoWeServe from "@/components/about/WhoWeServe";
import Differentiators from "@/components/about/Differentiators";
import Approach from "@/components/about/Approach";
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
      <FutureRoadmap />
      <AboutCTA />
    </div>
  );
}
