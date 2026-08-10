"use client";

import React, { useMemo, useState } from "react";
import { EquipmentCategory, PublicListing } from "@/types/marketplace";
import { ListingCard } from "./ListingCard";
import { ListingCardSkeleton } from "./ListingCardSkeleton";
import { FilterPanel } from "./FilterPanel";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  TrendingUp,
  Tag,
  Tractor,
  Wheat,
  Sprout,
  Droplets,
  Warehouse,
  Link2,
  Hammer,
  Navigation,
  Loader2,
} from "lucide-react";
import { usePublicListings } from "@/lib/hooks/usePublicListings";
import { haversineDistanceKm, NEAR_YOU_RADIUS_KM, useUserLocation } from "@/lib/marketplace/geolocation";

const CATEGORY_ICONS: Record<EquipmentCategory, React.ReactNode> = {
  "Tractors & Power": <Tractor className="h-6 w-6" />,
  Harvesting: <Wheat className="h-6 w-6" />,
  "Planting & Seeding": <Sprout className="h-6 w-6" />,
  "Irrigation Systems": <Droplets className="h-6 w-6" />,
  "Processing & Storage": <Warehouse className="h-6 w-6" />,
  "Tractor Attachments": <Link2 className="h-6 w-6" />,
  "Hand Tools & Accessories": <Hammer className="h-6 w-6" />,
};

export function BrowserView() {
  const { data: listings = [], isLoading } = usePublicListings(60);
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | null>(null);
  const userLocation = useUserLocation();

  // Real category counts from the fetched batch.
  const categories = useMemo(() => {
    const counts = new Map<EquipmentCategory, number>();
    for (const listing of listings) {
      counts.set(listing.category, (counts.get(listing.category) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [listings]);

  // Real popularity, driven by the view-count the backend now increments
  // on each detail-page fetch.
  const trendingListings = useMemo(
    () =>
      [...listings]
        .filter((l) => (l.stats?.views ?? 0) > 0)
        .sort((a, b) => (b.stats?.views ?? 0) - (a.stats?.views ?? 0))
        .slice(0, 4),
    [listings],
  );

  // Real distance from the user's actual browser-reported location to each
  // listing's captured GPS coordinates (decimal columns come back as
  // strings from the backend — coerce before doing math).
  const nearYouListings = useMemo(() => {
    if (!userLocation.coords) return [];
    return listings
      .map((listing) => {
        if (listing.latitude == null || listing.longitude == null) return null;
        const distanceKm = haversineDistanceKm(
          userLocation.coords!.lat,
          userLocation.coords!.lng,
          Number(listing.latitude),
          Number(listing.longitude),
        );
        return { listing, distanceKm };
      })
      .filter((entry): entry is { listing: PublicListing; distanceKm: number } => entry !== null)
      .filter((entry) => entry.distanceKm <= NEAR_YOU_RADIUS_KM)
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 6);
  }, [listings, userLocation.coords]);

  const filteredListings = useMemo(
    () => (selectedCategory ? listings.filter((l) => l.category === selectedCategory) : listings),
    [listings, selectedCategory],
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <FilterPanel
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex-1 space-y-10 min-w-0">
        {/* Categories Section */}
        {categories.length > 0 && (
          <section className="space-y-4">
            <SectionHeader title="Top Categories" icon={<Tag className="h-5 w-5 text-indigo-500" />} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {categories.slice(0, 4).map((cat) => {
                const active = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(active ? null : cat.name)}
                    className={`group relative h-40 w-full overflow-hidden rounded-xl p-5 flex flex-col justify-between text-left transition-all hover:shadow-lg ${
                      active
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl w-fit ${
                        active ? "bg-white/20" : "bg-white dark:bg-slate-900"
                      }`}
                    >
                      {CATEGORY_ICONS[cat.name]}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold tracking-tight">{cat.name}</h4>
                      <p className={`text-sm font-medium ${active ? "text-white/80" : "text-muted-foreground"}`}>
                        {cat.count} listing{cat.count === 1 ? "" : "s"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Near You Section */}
        <section className="space-y-4">
          <SectionHeader title="Near You" icon={<MapPin className="h-5 w-5 text-emerald-500" />} />
          {userLocation.status === "granted" ? (
            nearYouListings.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {nearYouListings.map(({ listing }) => (
                  <ListingCard key={listing.id} listing={listing} variant="browser" />
                ))}
              </div>
            ) : (
              <EmptyPanel message={`No listings within ${NEAR_YOU_RADIUS_KM}km of you yet.`} />
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-slate-50 rounded-lg border-2 border-dashed dark:bg-slate-900/50">
              <Navigation className="h-6 w-6 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-3 max-w-xs">
                {userLocation.status === "denied"
                  ? "Location access was denied — enable it in your browser settings to see equipment near you."
                  : userLocation.status === "unsupported"
                    ? "Your browser doesn't support location services."
                    : "Share your location to see equipment listed near you."}
              </p>
              {userLocation.status !== "denied" && userLocation.status !== "unsupported" && (
                <Button size="sm" variant="outline" onClick={userLocation.request} disabled={userLocation.status === "loading"}>
                  {userLocation.status === "loading" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Navigation className="mr-2 h-4 w-4" />
                  )}
                  Use my location
                </Button>
              )}
            </div>
          )}
        </section>

        {/* Trending Section */}
        {trendingListings.length > 0 && (
          <section className="space-y-4">
            <SectionHeader title="Trending Machineries" icon={<TrendingUp className="h-5 w-5 text-amber-500" />} />
            <div className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-6 snap-x">
              {trendingListings.map((listing) => (
                <div key={listing.id} className="min-w-[280px] sm:min-w-[320px] snap-center">
                  <ListingCard listing={listing} variant="browser" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Equipment Section */}
        <section className="space-y-4">
          <SectionHeader
            title={selectedCategory ? `${selectedCategory} (${filteredListings.length})` : `All Equipment (${filteredListings.length})`}
            icon={<Search className="h-5 w-5 text-slate-500" />}
          />
          {isLoading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} variant="browser" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-lg border-2 border-dashed dark:bg-slate-900/50">
              <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No equipment found</h3>
              {selectedCategory && (
                <Button variant="outline" className="mt-4" onClick={() => setSelectedCategory(null)}>
                  Clear Filter
                </Button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function EmptyPanel({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-10 text-center bg-slate-50 rounded-lg border-2 border-dashed dark:bg-slate-900/50">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function SectionHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
    </div>
  );
}
