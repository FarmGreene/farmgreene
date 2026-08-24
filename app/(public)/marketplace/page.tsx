import { Metadata } from "next";
import { MarketplaceHero } from "@/components/marketing/marketplace/MarketplaceHero";
import { Available } from "@/components/marketing/marketplace/Available";
import { BeforeYouCommit } from "@/components/marketing/marketplace/BeforeYouCommit";
import { HowRentingWorks } from "@/components/marketing/marketplace/HowRentingWorks";
import { ForOwners } from "@/components/marketing/marketplace/ForOwners";
import { ClosingBand } from "@/components/marketing/ClosingBand";

export const metadata: Metadata = {
  title: "Equipment Marketplace",
  description:
    "Rent tractors, harvesters and farm equipment from owners near you for the days you need them — or list your own idle machinery and let it earn.",
};

export default function MarketplacePage() {
  return (
    <div className="bg-field">
      <MarketplaceHero />
      <Available />
      <BeforeYouCommit />
      <HowRentingWorks />
      <ForOwners />
      <ClosingBand
        title="Find one, or"
        accent="list yours"
        lede="Make an account to send a rental request, or to put your first machine in front of the people who need it."
        image="/images/about-hero.png"
        secondary={{ href: "/intelligence", label: "See today's prices" }}
      />
    </div>
  );
}
