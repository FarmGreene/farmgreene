"use client";

import React from "react";
import { EquipmentListing } from "@/types/marketplace";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Eye,
  Heart,
  MapPin,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: EquipmentListing;
  variant: "owner" | "browser";
}

export function ListingCard({ listing, variant }: ListingCardProps) {
  const isOwner = variant === "owner";

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow duration-200">
      {/* Image Placeholder */}
      <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
        <span className="text-sm font-medium">Image: {listing.name}</span>
        <div className="absolute top-2 right-2">
          <Badge
            variant={
              listing.status === "available"
                ? "default"
                : listing.status === "rented"
                  ? "secondary"
                  : "destructive"
            }
            className={cn(
              listing.status === "available" &&
                "bg-green-500 hover:bg-green-600",
              listing.status === "rented" &&
                "bg-amber-500 hover:bg-amber-600 text-white",
            )}
          >
            {listing.status}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              {listing.category}
            </p>
            <h3
              className="font-semibold text-lg line-clamp-1"
              title={listing.name}
            >
              {listing.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {listing.location}
        </div>

        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-lg font-bold text-green-700 dark:text-green-500">
            ₦{listing.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">
            /{listing.period}
          </span>
        </div>

        {isOwner && listing.stats && (
          <div className="flex gap-3 text-xs text-muted-foreground pt-2 border-t mt-3">
            <span className="flex items-center">
              <Eye className="h-3 w-3 mr-1" /> {listing.stats.views} views
            </span>
            <span className="flex items-center">
              <Heart className="h-3 w-3 mr-1" /> {listing.stats.saves} saves
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {isOwner ? (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              {listing.status === "maintenance" ? (
                <PlayCircle className="h-4 w-4" />
              ) : (
                <PauseCircle className="h-4 w-4" />
              )}
            </Button>
          </>
        ) : (
          <div className="flex w-full gap-2">
            <Button className="flex-1" size="sm">
              Rent Now
            </Button>
            <Button variant="outline" size="icon" className="shrink-0">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
