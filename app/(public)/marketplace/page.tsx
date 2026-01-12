import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import EquipmentCategories from "@/components/marketplace/EquipmentCategories";
import FeaturedListings from "@/components/marketplace/FeaturedListings";
import RentalProcess from "@/components/marketplace/RentalProcess";
import MarketplaceTrust from "@/components/marketplace/MarketplaceTrust";
import OwnerNudge from "@/components/marketplace/OwnerNudge";
import IntelligenceConnection from "@/components/marketplace/IntelligenceConnection";
import MarketplaceCTA from "@/components/marketplace/MarketplaceCTA";

export default function MarketplacePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketplaceHero />
      <EquipmentCategories />
      <FeaturedListings />
      <RentalProcess />
      <MarketplaceTrust />
      <OwnerNudge />
      <IntelligenceConnection />
      <MarketplaceCTA />
    </div>
  );
}
