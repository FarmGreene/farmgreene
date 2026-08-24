"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ShieldCheck,
  Calendar,
  Zap,
  Gauge,
  Fuel,
  Weight,
  Wrench,
  Truck,
  ChevronLeft,
  User as UserIcon,
} from "lucide-react";
import { PublicListing, RentalPeriod } from "@/types/marketplace";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ListingGallery } from "./ListingGallery";
import { RentDialog } from "@/components/marketplace/rent/RentDialog";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { formatNaira } from "@/lib/marketplace/pricing";
import { cn } from "@/lib/utils";

const PERIOD_LABEL: Record<RentalPeriod, string> = {
  day: "day",
  week: "week",
  month: "month",
};

const CANCELLATION_COPY: Record<string, string> = {
  flexible: "Flexible — free cancellation up to 24h before start.",
  moderate: "Moderate — free cancellation up to 3 days before start.",
  strict: "Strict — cancellation may incur a charge.",
};

export function ListingDetail({ listing }: { listing: PublicListing }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [rentOpen, setRentOpen] = useState(false);

  const locationText =
    [listing.lga, listing.state].filter(Boolean).join(", ") ||
    "Location not specified";

  const priceTiers: { period: RentalPeriod; amount?: number }[] = [
    { period: "day", amount: listing.pricePerDay },
    { period: "week", amount: listing.pricePerWeek },
    { period: "month", amount: listing.pricePerMonth },
  ].filter((t) => t.amount && Number(t.amount) > 0) as {
    period: RentalPeriod;
    amount: number;
  }[];

  const headline =
    priceTiers.find((t) => t.period === listing.primaryPeriod) ||
    priceTiers[0];

  const specs: { icon: React.ReactNode; label: string; value: string }[] = [];
  if (listing.yearManufactured)
    specs.push({
      icon: <Calendar className="h-4 w-4" />,
      label: "Year",
      value: String(listing.yearManufactured),
    });
  if (listing.horsePower)
    specs.push({
      icon: <Zap className="h-4 w-4" />,
      label: "Power",
      value: `${listing.horsePower} HP`,
    });
  if (listing.engineHours !== undefined && listing.engineHours !== null)
    specs.push({
      icon: <Gauge className="h-4 w-4" />,
      label: "Engine hours",
      value: `${listing.engineHours} hrs`,
    });
  if (listing.fuelType)
    specs.push({
      icon: <Fuel className="h-4 w-4" />,
      label: "Fuel",
      value: listing.fuelType,
    });
  if (listing.weightKg)
    specs.push({
      icon: <Weight className="h-4 w-4" />,
      label: "Weight",
      value: `${listing.weightKg} kg`,
    });
  if (listing.maintenanceStatus)
    specs.push({
      icon: <Wrench className="h-4 w-4" />,
      label: "Maintenance",
      value: listing.maintenanceStatus.replace(/_/g, " "),
    });

  const handleRentClick = () => {
    if (!isAuthenticated) {
      router.push(`/login?next=/marketplace/${listing.id}`);
      return;
    }
    setRentOpen(true);
  };

  return (
    <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 py-8 lg:py-12">
      <Link
        href="/marketplace"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors mb-6"
      >
        <ChevronLeft className="h-4 w-4" /> Back to marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: gallery + info */}
        <div className="lg:col-span-7 space-y-8">
          <ListingGallery
            name={listing.name}
            primaryPhotoUrl={listing.primaryPhotoUrl}
            galleryPhotos={listing.galleryPhotos}
          />

          {/* Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-emerald-600 text-white border-none text-[10px] font-extrabold uppercase tracking-widest">
                {listing.category}
              </Badge>
              {listing.condition && (
                <Badge
                  variant="outline"
                  className="text-[10px] font-bold uppercase tracking-wider capitalize"
                >
                  {listing.condition} condition
                </Badge>
              )}
              {listing.owner?.isVerified && (
                <Badge className="bg-blue-50 text-blue-700 border-blue-100 text-[10px] font-bold uppercase tracking-wider dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30">
                  <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                </Badge>
              )}
            </div>
            {listing.brand && (
              <span className="text-xs tracking-widest font-extrabold text-emerald-600 dark:text-emerald-400 uppercase block">
                {listing.brand}
                {listing.model ? ` · ${listing.model}` : ""}
              </span>
            )}
            <h1 className="font-heading text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {listing.name}
            </h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1.5 text-emerald-500" />
              {locationText}
            </div>
          </div>

          {/* Specs */}
          {specs.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-4"
                >
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    {s.icon}
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {s.label}
                    </span>
                  </div>
                  <p className="text-sm font-bold capitalize text-slate-800 dark:text-slate-100">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          {listing.description && (
            <section className="space-y-2">
              <h2 className="font-heading text-lg font-bold">Description</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                {listing.description}
              </p>
            </section>
          )}

          {listing.additionalSpecs && (
            <section className="space-y-2">
              <h2 className="font-heading text-lg font-bold">
                Additional specifications
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                {listing.additionalSpecs}
              </p>
            </section>
          )}

          {/* Delivery */}
          {listing.deliveryAvailable && (
            <section className="rounded-2xl border border-slate-100 dark:border-slate-800 p-5 flex items-start gap-3">
              <Truck className="h-5 w-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="text-sm font-bold">Delivery available</p>
                <p className="text-xs text-muted-foreground">
                  {listing.deliveryRadiusKm
                    ? `Within ${listing.deliveryRadiusKm} km`
                    : "In the listing area"}
                  {listing.deliveryFeePerKm
                    ? ` · ${formatNaira(Number(listing.deliveryFeePerKm))}/km`
                    : ""}
                  . Final fee confirmed by the owner.
                </p>
              </div>
            </section>
          )}

          {/* Rules & cancellation */}
          {(listing.cancellationPolicy || listing.additionalRules) && (
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold">Rental terms</h2>
              {listing.cancellationPolicy && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-semibold capitalize">
                    {listing.cancellationPolicy} cancellation:
                  </span>{" "}
                  {CANCELLATION_COPY[listing.cancellationPolicy] ?? ""}
                </p>
              )}
              {listing.additionalRules && (
                <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">
                  {listing.additionalRules}
                </p>
              )}
            </section>
          )}

          {/* Owner mini-card */}
          <section className="rounded-2xl border border-slate-100 dark:border-slate-800 p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
              {listing.owner?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={listing.owner.avatarUrl}
                  alt={listing.owner.firstName ?? "Owner"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserIcon className="h-6 w-6 text-slate-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold flex items-center gap-1.5">
                {listing.owner?.firstName || "Equipment owner"}
                {listing.owner?.isVerified && (
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                Contact details shared once your request is accepted.
              </p>
            </div>
          </section>
        </div>

        {/* Right: sticky pricing */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 rounded-[24px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.06)] space-y-5">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                From
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {headline ? formatNaira(Number(headline.amount)) : "—"}
                </span>
                {headline && (
                  <span className="text-sm text-muted-foreground font-semibold">
                    /{PERIOD_LABEL[headline.period]}
                  </span>
                )}
              </div>
            </div>

            {priceTiers.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {priceTiers.map((t) => (
                  <div
                    key={t.period}
                    className="flex-1 min-w-[90px] rounded-xl border border-slate-100 dark:border-slate-800 px-3 py-2 text-center"
                  >
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {formatNaira(Number(t.amount))}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      per {PERIOD_LABEL[t.period]}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <Separator />

            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Min rental</span>
                <span className="font-semibold">
                  {listing.minRentalDays || 1} day(s)
                </span>
              </li>
              {listing.maxRentalDays && (
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Max rental</span>
                  <span className="font-semibold">
                    {listing.maxRentalDays} day(s)
                  </span>
                </li>
              )}
              {listing.depositRequired && listing.depositAmount && (
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Refundable deposit
                  </span>
                  <span className="font-semibold">
                    {formatNaira(Number(listing.depositAmount))}
                  </span>
                </li>
              )}
              {(listing.includesOperator || listing.operatorChargePerDay) && (
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Operator</span>
                  <span className="font-semibold">
                    {listing.operatorChargePerDay
                      ? `+${formatNaira(Number(listing.operatorChargePerDay))}/day`
                      : "Available"}
                  </span>
                </li>
              )}
            </ul>

            <Button
              onClick={handleRentClick}
              className={cn(
                "w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-sm shadow-emerald-500/20 active:scale-[0.98] transition-all",
              )}
            >
              Rent Now
            </Button>
            <p className="text-[11px] text-center text-muted-foreground">
              No payment now — send a request and the owner responds.
            </p>
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <RentDialog
          listing={listing}
          open={rentOpen}
          onOpenChange={setRentOpen}
        />
      )}
    </div>
  );
}
