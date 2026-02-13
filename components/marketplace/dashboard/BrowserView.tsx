"use client";

import React from "react";
import { EquipmentListing } from "@/types/marketplace";
import { ListingCard } from "./ListingCard";
import { FilterPanel } from "./FilterPanel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MapPin, TrendingUp, Tag } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface BrowserViewProps {
  listings: EquipmentListing[];
}

export function BrowserView({ listings }: BrowserViewProps) {
  // Derived data for sections
  const trendingListings = [...listings]
    .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
    .slice(0, 4);
  const nearYouListings = listings.filter(
    (l) => l.location.includes("Osogbo") || l.location.includes("Ilesa"),
  ); // Mock geo-location

  const categories = [
    { name: "Tractors", count: 12, image: "/images/categories/tractors.jpg" },
    {
      name: "Harvesters",
      count: 5,
      image: "/images/categories/harvesters.jpg",
    },
    {
      name: "Processing",
      count: 6,
      image: "/images/categories/processing.jpg",
    },
    {
      name: "Irrigation",
      count: 4,
      image: "/images/categories/irrigation.jpg",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Filters Side Panel - Kept for advanced filtering */}
      <FilterPanel />

      {/* Main Storefront Content */}
      <div className="flex-1 space-y-10 min-w-0">
        {/* Categories Section */}
        <section className="space-y-4">
          <SectionHeader
            title="Top Categories"
            icon={<Tag className="h-5 w-5 text-indigo-500" />}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="group relative h-48 w-full overflow-hidden rounded-xl bg-slate-200 transition-all hover:shadow-lg dark:bg-slate-800"
              >
                {/* Background Image Placeholder / Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-slate-900 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-slate-700 font-bold opacity-20 text-4xl select-none">
                    {cat.name}
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 text-white">
                  <h4 className="text-xl font-bold tracking-tight">
                    {cat.name}
                  </h4>
                  <p className="text-sm font-medium text-white/80">
                    {cat.count} listings found
                  </p>
                </div>

                <button
                  className="absolute inset-0 z-30 ring-inset focus:ring-2 focus:ring-emerald-500 rounded-xl"
                  aria-label={`View ${cat.name} category`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Near You Section */}
        <section className="space-y-4">
          <SectionHeader
            title="Near You"
            action="View All"
            icon={<MapPin className="h-5 w-5 text-emerald-500" />}
          />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {nearYouListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                variant="browser"
              />
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="space-y-4">
          <SectionHeader
            title="Trending Machineries"
            action="View All"
            icon={<TrendingUp className="h-5 w-5 text-amber-500" />}
          />
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-6 snap-x">
            {trendingListings.map((listing) => (
              <div
                key={listing.id}
                className="min-w-[280px] sm:min-w-[320px] snap-center"
              >
                <ListingCard listing={listing} variant="browser" />
              </div>
            ))}
          </div>
        </section>

        {/* Fallback for no results */}
        {listings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-lg border-2 border-dashed dark:bg-slate-900/50">
            <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No equipment found</h3>
            <Button variant="outline" className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  action,
  icon,
}: {
  title: string;
  action?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      {action && (
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
        >
          {action} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
