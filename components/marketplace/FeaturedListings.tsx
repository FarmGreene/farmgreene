"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EquipmentListing } from "@/types/marketplace";
import { getPublicListings } from "@/lib/services/marketplace.service";
import { ListingCard } from "@/components/marketplace/dashboard/ListingCard";
import { ListingCardSkeleton } from "@/components/marketplace/dashboard/ListingCardSkeleton";

export default function FeaturedListings() {
  const [listings, setListings] = useState<EquipmentListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicListings(4)
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load featured listings:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="listings" className="py-20 bg-slate-50 dark:bg-slate-900/20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-2">
              Featured Equipment
            </h2>
            <p className="text-muted-foreground">
              Recently listed equipment from verified owners nearby.
            </p>
          </div>
          <Link href="/dashboard" className="hidden sm:block">
            <Button variant="outline">View All Listings</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? [1, 2, 3, 4].map((i) => <ListingCardSkeleton key={i} />)
            : listings.length > 0 ? (
                listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    variant="browser"
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No active listings available right now. Check back later!
                </div>
              )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full">
              View All Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
