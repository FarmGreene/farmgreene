"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EquipmentListing, ListingStatus } from "@/types/marketplace";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Edit,
  Heart,
  MapPin,
  ImageIcon,
  Calendar,
  Settings2,
  Zap,
  Gauge,
  Archive,
  ArchiveRestore,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: EquipmentListing;
  variant: "owner" | "browser";
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
}

export function ListingCard({
  listing,
  variant,
  onArchive,
  onUnarchive,
}: ListingCardProps) {
  const isOwner = variant === "owner";
  const isArchived = !!listing.archivedAt;
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const detailHref = `/marketplace/${listing.id}`;

  // Browser cards navigate to the public detail page (where the rent flow lives).
  const goToDetail = () => {
    if (!isOwner) router.push(detailHref);
  };

  const getStatusConfig = (status: ListingStatus) => {
    switch (status) {
      case "active":
        return {
          label: "Active",
          dotColor: "bg-emerald-500",
          className: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
        };
      case "pending_review":
        return {
          label: "In Review",
          dotColor: "bg-amber-500",
          className: "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
        };
      case "draft":
        return {
          label: "Draft",
          dotColor: "bg-slate-400",
          className: "bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-800/30",
        };
      case "paused":
        return {
          label: "Paused",
          dotColor: "bg-blue-500",
          className: "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
        };
      case "rejected":
        return {
          label: "Rejected",
          dotColor: "bg-red-500",
          className: "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900/30",
        };
      default:
        return {
          label: status,
          dotColor: "bg-slate-400",
          className: "bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-800/30",
        };
    }
  };

  const statusConfig = isArchived
    ? {
        label: "Archived",
        dotColor: "bg-slate-400",
        className:
          "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700",
      }
    : getStatusConfig(listing.status);

  // Compute location
  const locationText = [listing.lga, listing.state].filter(Boolean).join(", ") || "Location not specified";

  // Compute display price based on primaryPeriod or fallback
  const getDisplayPrice = () => {
    if (listing.price) return { amount: listing.price, period: listing.period || "day" };
    if (listing.primaryPeriod === "month" && listing.pricePerMonth) return { amount: listing.pricePerMonth, period: "month" };
    if (listing.primaryPeriod === "week" && listing.pricePerWeek) return { amount: listing.pricePerWeek, period: "week" };
    if (listing.pricePerDay) return { amount: listing.pricePerDay, period: "day" };
    return { amount: 0, period: "day" };
  };

  const { amount, period } = getDisplayPrice();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div
      onClick={goToDetail}
      className={cn(
        "group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800/80 rounded-[22px] overflow-hidden hover:shadow-[0_16px_36px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.3)] hover:border-emerald-500/20 dark:hover:border-emerald-500/25 hover:-translate-y-1 transition-all duration-300",
        isArchived && "opacity-60 grayscale hover:opacity-100",
        !isOwner && "cursor-pointer",
      )}
    >
      {/* Short wide aspect ratio image container */}
      <div className="relative aspect-[1.5] w-full overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        {listing.primaryPhotoUrl || listing.imageUrl ? (
          <Image
            src={listing.primaryPhotoUrl || listing.imageUrl || ""}
            alt={listing.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-400 dark:text-slate-600">
            <ImageIcon className="h-8 w-8 mb-1.5 stroke-[1.25] opacity-60" />
            <span className="text-[9px] font-bold tracking-wider uppercase opacity-75">No Image Provided</span>
          </div>
        )}

        {/* Floating status dot on top-left */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className={cn("px-2 py-0.5 font-extrabold tracking-wider text-[8px] uppercase border rounded-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 shadow-sm flex items-center gap-1 border-slate-100 dark:border-slate-800", statusConfig.className)}>
            <span className={cn("h-1 w-1 rounded-full", statusConfig.dotColor)} />
            {statusConfig.label}
          </Badge>
        </div>

        {/* Floating category badge on bottom-left */}
        <div className="absolute bottom-3 left-3 z-10">
          <Badge className="bg-black/60 dark:bg-black/75 text-white font-extrabold text-[8px] tracking-widest uppercase px-2.5 py-0.5 rounded-full border-none backdrop-blur-md shadow-sm">
            {listing.category}
          </Badge>
        </div>

        {/* Floating circular favorite heart on top-right - Only for browser */}
        {!isOwner && (
          <button
            onClick={handleSave}
            aria-label={isSaved ? "Remove from saved" : "Save listing"}
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 dark:bg-slate-900/95 shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800 hover:scale-108 active:scale-95 transition-all duration-200"
          >
            <Heart
              className={cn(
                "h-3.5 w-3.5 transition-all duration-200",
                isSaved ? "text-rose-500 fill-rose-500 scale-110" : "text-slate-500 dark:text-slate-400 hover:text-rose-500"
              )}
            />
          </button>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Brand and Title layout */}
          <div className="space-y-0.5">
            <span className="text-[9px] tracking-widest font-extrabold text-emerald-600 dark:text-emerald-400 uppercase leading-none block">
              {listing.brand || "EQUIPMENT"}
            </span>
            <h3 className="font-extrabold text-[15px] sm:text-base text-slate-800 dark:text-white line-clamp-1 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
              {listing.name}
            </h3>
          </div>

          {/* Rejection reason — owner only */}
          {isOwner &&
            listing.status === "rejected" &&
            listing.rejectionReason && (
              <p
                className="text-[10px] leading-snug text-red-600 dark:text-red-400 bg-red-50/60 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-md px-2 py-1"
                title={listing.rejectionReason}
              >
                <span className="font-bold">Rejected:</span>{" "}
                {listing.rejectionReason}
              </p>
            )}

          {/* Consolidated Specification Capsules (Single row, compact!) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {listing.yearManufactured && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-850 px-2 py-0.5 rounded-md uppercase tracking-wide bg-slate-50/50 dark:bg-slate-800/10">
                <Calendar className="h-2.5 w-2.5 text-slate-400" />
                {listing.yearManufactured}
              </span>
            )}
            
            {listing.condition && (
              <span className={cn(
                "inline-flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide border",
                listing.condition === "excellent" 
                  ? "bg-emerald-50/40 border-emerald-100 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-950/10 dark:border-emerald-900/30"
                  : listing.condition === "good"
                  ? "bg-blue-50/40 border-blue-100 text-blue-700 dark:text-blue-400 dark:bg-blue-950/10 dark:border-blue-900/30"
                  : "bg-amber-50/40 border-amber-100 text-amber-700 dark:text-amber-400 dark:bg-amber-950/10 dark:border-amber-900/30"
              )}>
                <Settings2 className="h-2.5 w-2.5 opacity-80" />
                {listing.condition}
              </span>
            )}

            {listing.horsePower && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-850 px-2 py-0.5 rounded-md uppercase tracking-wide bg-slate-50/50 dark:bg-slate-800/10">
                <Zap className="h-2.5 w-2.5 text-amber-500" />
                {listing.horsePower} HP
              </span>
            )}

            {!listing.horsePower && listing.engineHours !== undefined && listing.engineHours !== null && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-850 px-2 py-0.5 rounded-md uppercase tracking-wide bg-slate-50/50 dark:bg-slate-800/10">
                <Gauge className="h-2.5 w-2.5 text-blue-500" />
                {listing.engineHours} Hrs
              </span>
            )}
          </div>

          {/* Compact Location line */}
          <div className="flex items-center text-[11px] text-slate-400 dark:text-slate-500">
            <MapPin className="h-3 w-3 mr-1 text-emerald-500 shrink-0" />
            <span className="line-clamp-1 font-medium">{locationText}</span>
          </div>
        </div>

        {/* Unified Price & Call to Action Row (Shares a single line!) */}
        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
          {/* Price Block (Left) */}
          <div className="flex flex-col justify-center">
            <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-0.5">
              Price
            </span>
            <div className="flex items-baseline leading-none">
              <span className="text-base sm:text-[18px] font-black text-slate-900 dark:text-white tracking-tight">
                ₦{Number(amount).toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold ml-0.5">
                /{period}
              </span>
            </div>
            {listing.depositRequired && listing.depositAmount && (
              <span className="text-[8px] text-slate-400 dark:text-slate-500 font-medium leading-none mt-1">
                Dep: ₦{Number(listing.depositAmount).toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons Block (Right) */}
          <div className="flex items-center">
            {isOwner ? (
              isArchived ? (
                <ConfirmDialog
                  title="Restore this listing?"
                  description="It will become visible in your inventory again with its previous status."
                  confirmLabel="Restore"
                  onConfirm={() => onUnarchive?.(listing.id)}
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 border-slate-200 dark:border-slate-700 hover:border-emerald-350 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all"
                    >
                      <ArchiveRestore className="h-3 w-3 mr-1 text-emerald-600" />
                      Restore
                    </Button>
                  }
                />
              ) : (
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3 border-slate-200 dark:border-slate-700 hover:border-slate-350 dark:hover:border-slate-650 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all"
                  >
                    <Edit className="h-3 w-3 mr-1 text-slate-500" />
                    Edit
                  </Button>
                  <ConfirmDialog
                    title="Archive this listing?"
                    description="It will be hidden from your inventory and from the public marketplace. You can restore it anytime from the Archived filter."
                    confirmLabel="Archive"
                    destructive
                    onConfirm={() => onArchive?.(listing.id)}
                    trigger={
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-slate-200 dark:border-slate-700 rounded-xl transition-all text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        aria-label="Archive listing"
                        title="Archive (hide) listing"
                      >
                        <Archive className="h-4.5 w-4.5" />
                      </Button>
                    }
                  />
                </div>
              )
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(detailHref);
                }}
                className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl shadow-sm shadow-emerald-500/10 hover:shadow-md hover:shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center"
              >
                Rent Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
