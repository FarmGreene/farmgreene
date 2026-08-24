"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EquipmentCategory, EquipmentListing } from "@/types/marketplace";
import { editListingSchema, EditListingData } from "./editListingSchema";
import { submitListingEdit } from "@/lib/services/marketplace.service";
import { Loader2, ShieldCheck } from "lucide-react";

const CATEGORIES: EquipmentCategory[] = [
  "Tractors & Power",
  "Harvesting",
  "Planting & Seeding",
  "Irrigation Systems",
  "Processing & Storage",
  "Tractor Attachments",
  "Hand Tools & Accessories",
];

function toDefaultValues(listing: EquipmentListing): EditListingData {
  return {
    name: listing.name,
    category: listing.category,
    subcategory: listing.subcategory ?? "",
    brand: listing.brand ?? "",
    model: listing.model ?? "",
    yearManufactured: listing.yearManufactured ?? new Date().getFullYear(),
    description: listing.description ?? "",
    condition: listing.condition ?? "good",
    maintenanceStatus: listing.maintenanceStatus ?? "ready",
    engineHours: listing.engineHours,
    horsePower: listing.horsePower,
    fuelType: listing.fuelType ?? undefined,
    weightKg: listing.weightKg,
    additionalSpecs: listing.additionalSpecs ?? "",
    lastServiceDate: listing.lastServiceDate ?? "",
    pricePerDay: listing.pricePerDay ?? 0,
    pricePerWeek: listing.pricePerWeek,
    pricePerMonth: listing.pricePerMonth,
    primaryPeriod: listing.primaryPeriod ?? "day",
    minRentalDays: listing.minRentalDays ?? 1,
    maxRentalDays: listing.maxRentalDays,
    depositRequired: listing.depositRequired ?? false,
    depositAmount: listing.depositAmount,
    includesOperator: listing.includesOperator ?? false,
    operatorChargePerDay: listing.operatorChargePerDay,
    cancellationPolicy: listing.cancellationPolicy ?? "moderate",
    additionalRules: listing.additionalRules ?? "",
    state: listing.state ?? "",
    lga: listing.lga ?? "",
    city: listing.city ?? "",
    exactAddress: listing.exactAddress ?? "",
    landmark: listing.landmark ?? "",
    deliveryAvailable: listing.deliveryAvailable ?? false,
    deliveryRadiusKm: listing.deliveryRadiusKm,
    deliveryFeePerKm: listing.deliveryFeePerKm,
    availabilityType: listing.availabilityType ?? "always",
    advanceBookingDays: listing.advanceBookingDays ?? 1,
  };
}

interface EditListingSheetProps {
  listing: EquipmentListing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

export function EditListingSheet({ listing, open, onOpenChange, onSaved }: EditListingSheetProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditListingData>({
    resolver: zodResolver(editListingSchema) as any,
  });

  useEffect(() => {
    if (listing) reset(toDefaultValues(listing));
  }, [listing, reset]);

  const depositRequired = watch("depositRequired");
  const deliveryAvailable = watch("deliveryAvailable");
  const isActive = listing?.status === "active";

  const onSubmit = async (data: EditListingData) => {
    if (!listing) return;
    try {
      await submitListingEdit(listing.id, data);
      toast.success(
        isActive
          ? "Edit submitted — it will go live once an admin approves it."
          : "Listing updated.",
      );
      onSaved();
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save changes");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Listing</SheetTitle>
        </SheetHeader>

        {listing && (
          <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-6 space-y-6">
            {isActive && (
              <div className="flex items-start gap-2.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-3.5">
                <ShieldCheck className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  This listing is live. Your changes will be staged and reviewed by
                  an admin — the current version stays visible to renters until
                  the edit is approved.
                </p>
              </div>
            )}

            {/* Basics */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Basics</h4>
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input {...register("name")} />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Subcategory</Label>
                  <Input {...register("subcategory")} />
                  {errors.subcategory && <p className="text-xs text-red-500">{errors.subcategory.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>Brand</Label>
                  <Input {...register("brand")} />
                  {errors.brand && <p className="text-xs text-red-500">{errors.brand.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Model</Label>
                  <Input {...register("model")} />
                </div>
                <div className="space-y-1.5">
                  <Label>Year</Label>
                  <Input type="number" {...register("yearManufactured", { valueAsNumber: true })} />
                  {errors.yearManufactured && <p className="text-xs text-red-500">{errors.yearManufactured.message}</p>}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea rows={4} {...register("description")} />
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
              </div>
            </div>

            <Separator />

            {/* Specs */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Specifications</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Condition</Label>
                  <Controller
                    name="condition"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Maintenance Status</Label>
                  <Controller
                    name="maintenanceStatus"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ready">Ready to Rent</SelectItem>
                          <SelectItem value="recently_serviced">Recently Serviced</SelectItem>
                          <SelectItem value="under_maintenance">Under Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Horse Power</Label>
                  <Input type="number" {...register("horsePower", { valueAsNumber: true })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Engine Hours</Label>
                  <Input type="number" {...register("engineHours", { valueAsNumber: true })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Weight (kg)</Label>
                  <Input type="number" {...register("weightKg", { valueAsNumber: true })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Fuel Type</Label>
                  <Controller
                    name="fuelType"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value ?? undefined} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="manual">Manual / None</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Last Service Date</Label>
                  <Input type="date" {...register("lastServiceDate")} />
                  {errors.lastServiceDate && <p className="text-xs text-red-500">{errors.lastServiceDate.message}</p>}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Additional Specs</Label>
                <Textarea rows={2} {...register("additionalSpecs")} />
              </div>
            </div>

            <Separator />

            {/* Pricing */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Pricing</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>Price / Day</Label>
                  <Input type="number" {...register("pricePerDay", { valueAsNumber: true })} />
                  {errors.pricePerDay && <p className="text-xs text-red-500">{errors.pricePerDay.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Price / Week</Label>
                  <Input type="number" {...register("pricePerWeek", { valueAsNumber: true })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Price / Month</Label>
                  <Input type="number" {...register("pricePerMonth", { valueAsNumber: true })} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>Headline Period</Label>
                  <Controller
                    name="primaryPeriod"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Day</SelectItem>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Min Rental Days</Label>
                  <Input type="number" {...register("minRentalDays", { valueAsNumber: true })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Max Rental Days</Label>
                  <Input type="number" {...register("maxRentalDays", { valueAsNumber: true })} />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <Label>Security Deposit Required</Label>
                <Controller
                  name="depositRequired"
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
              {depositRequired && (
                <div className="space-y-1.5">
                  <Label>Deposit Amount</Label>
                  <Input type="number" {...register("depositAmount", { valueAsNumber: true })} />
                  {errors.depositAmount && <p className="text-xs text-red-500">{errors.depositAmount.message}</p>}
                </div>
              )}
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <Label>Operator Included</Label>
                <Controller
                  name="includesOperator"
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Cancellation Policy</Label>
                <Controller
                  name="cancellationPolicy"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flexible">Flexible</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="strict">Strict</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Additional Rules</Label>
                <Textarea rows={2} {...register("additionalRules")} />
              </div>
            </div>

            <Separator />

            {/* Location */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Location & Availability</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>State</Label>
                  <Input {...register("state")} />
                  {errors.state && <p className="text-xs text-red-500">{errors.state.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>LGA</Label>
                  <Input {...register("lga")} />
                  {errors.lga && <p className="text-xs text-red-500">{errors.lga.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>City</Label>
                  <Input {...register("city")} />
                  {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Landmark</Label>
                <Input {...register("landmark")} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <Label>Delivery Available</Label>
                <Controller
                  name="deliveryAvailable"
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
              {deliveryAvailable && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Delivery Radius (km)</Label>
                    <Input type="number" {...register("deliveryRadiusKm", { valueAsNumber: true })} />
                    {errors.deliveryRadiusKm && <p className="text-xs text-red-500">{errors.deliveryRadiusKm.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Fee / km</Label>
                    <Input type="number" {...register("deliveryFeePerKm", { valueAsNumber: true })} />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Availability</Label>
                  <Controller
                    name="availabilityType"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="always">Always Available</SelectItem>
                          <SelectItem value="custom">Custom Schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Advance Booking (days)</Label>
                  <Input type="number" {...register("advanceBookingDays", { valueAsNumber: true })} />
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isActive ? "Submit for Review" : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
