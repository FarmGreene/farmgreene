import { Metadata } from "next";
import { AboutHero } from "@/components/marketing/about/AboutHero";
import { TheProblem } from "@/components/marketing/about/TheProblem";
import { HowWeBuildIt } from "@/components/marketing/about/HowWeBuildIt";
import { Team } from "@/components/marketing/about/Team";
import { ClosingBand } from "@/components/marketing/ClosingBand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why Farmgreene exists: closing the price-information gap between the people who grow food and the people who buy it, one recorded market price at a time.",
};

export default function AboutPage() {
  return (
    <div className="bg-field">
      <AboutHero />
      <TheProblem />
      <HowWeBuildIt />
      <Team />
      <ClosingBand
        title="Come and"
        accent="use it"
        lede="It's free while we're in early access, and the feedback shapes what gets built next."
        image="/images/hero-farm.png"
        secondary={{ href: "/contact", label: "Talk to us" }}
      />
    </div>
  );
}
