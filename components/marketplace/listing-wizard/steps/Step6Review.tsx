"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step6Schema, Step6Data } from "../createListingSchema";
import { EquipmentListing } from "@/types/marketplace";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ReviewSection } from "../shared/ReviewSection";

interface Step6ReviewProps {
  listing: EquipmentListing;
  onSubmit: (data: Step6Data) => Promise<void>;
  isLoading: boolean;
}

export function Step6Review({ listing, onSubmit, isLoading }: Step6ReviewProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step6Data>({
    resolver: zodResolver(step6Schema),
    defaultValues: {
      agreeToTerms: false,
      agreeToAccuracyDeclaration: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");
  const agreeToAccuracy = watch("agreeToAccuracyDeclaration");

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold">Review Your Listing</h3>
        <p className="text-sm text-muted-foreground">
          Please review the details below before submitting for approval.
        </p>
      </div>

      <div className="space-y-4">
        <ReviewSection title="Equipment Basics">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-muted-foreground">Name:</div>
            <div className="font-medium">{listing.name}</div>
            <div className="text-muted-foreground">Category:</div>
            <div className="font-medium">{listing.category} / {listing.subcategory}</div>
            <div className="text-muted-foreground">Brand/Model:</div>
            <div className="font-medium">{listing.brand} {listing.model} ({listing.yearManufactured})</div>
          </div>
        </ReviewSection>

        <ReviewSection title="Pricing & Terms">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-muted-foreground">Base Price:</div>
            <div className="font-bold text-emerald-600">₦{listing.pricePerDay?.toLocaleString()}/day</div>
            <div className="text-muted-foreground">Deposit:</div>
            <div className="font-medium">{listing.depositRequired ? `₦${listing.depositAmount?.toLocaleString()}` : "None"}</div>
            <div className="text-muted-foreground">Cancellation:</div>
            <div className="font-medium capitalize">{listing.cancellationPolicy}</div>
          </div>
        </ReviewSection>

        <ReviewSection title="Location">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-muted-foreground">Location:</div>
            <div className="font-medium">{listing.city}, {listing.lga}, {listing.state}</div>
            <div className="text-muted-foreground">Delivery:</div>
            <div className="font-medium">{listing.deliveryAvailable ? `Yes (Up to ${listing.deliveryRadiusKm}km)` : "No"}</div>
          </div>
        </ReviewSection>
      </div>

      <form id="step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4 border-t">
        <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
          <Checkbox
            id="agreeToTerms"
            checked={agreeToTerms}
            onCheckedChange={(c) => setValue("agreeToTerms", c === true, { shouldValidate: true })}
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="agreeToTerms" className="text-sm font-medium">
              I agree to the Farmgreene Marketplace Terms & Conditions
            </Label>
            {errors.agreeToTerms && <p className="text-xs text-red-500">{errors.agreeToTerms.message}</p>}
          </div>
        </div>

        <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
          <Checkbox
            id="agreeToAccuracyDeclaration"
            checked={agreeToAccuracy}
            onCheckedChange={(c) => setValue("agreeToAccuracyDeclaration", c === true, { shouldValidate: true })}
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="agreeToAccuracyDeclaration" className="text-sm font-medium">
              I declare that all provided information and documents are accurate and I am the rightful owner.
            </Label>
            {errors.agreeToAccuracyDeclaration && (
              <p className="text-xs text-red-500">{errors.agreeToAccuracyDeclaration.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
