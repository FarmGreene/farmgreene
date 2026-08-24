"use client";

import React, { useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema, Step4Data } from "../createListingSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AmountInput } from "@/components/ui/amount-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  NIGERIAN_STATES,
  getLgasForState,
} from "@/lib/data/nigeria-states-lgas";

interface Step4LocationProps {
  onSubmit: (data: Step4Data) => Promise<void>;
  defaultValues?: Partial<Step4Data>;
  isLoading: boolean;
}

export function Step4Location({
  onSubmit,
  defaultValues,
  isLoading,
}: Step4LocationProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema) as any,
    defaultValues: {
      deliveryAvailable: false,
      availabilityType: "always",
      advanceBookingDays: 1,
      unavailableDates: [],
      ...defaultValues,
    },
  });

  const deliveryAvailable = useWatch({ control, name: "deliveryAvailable" });
  const availabilityType = useWatch({ control, name: "availabilityType" });

  // LGA options depend on the selected state.
  const selectedState = useWatch({ control, name: "state" });
  const lgaOptions = useMemo(
    () => getLgasForState(selectedState),
    [selectedState],
  );

  return (
    <form
      id="step-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h4 className="text-sm font-semibold border-b pb-2">
          Where is it located?
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>
              State <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onValueChange={(v) => {
                    field.onChange(v);
                    // Clear a stale LGA that belongs to the previous state.
                    setValue("lga", "", { shouldValidate: false });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {NIGERIAN_STATES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.state && (
              <p className="text-xs text-red-500">{errors.state.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>
              LGA <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="lga"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                  disabled={!selectedState}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        selectedState ? "Select LGA" : "Select a state first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {lgaOptions.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.lga && (
              <p className="text-xs text-red-500">{errors.lga.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>
            City / Town <span className="text-red-500">*</span>
          </Label>
          <Input placeholder="Nearest major town" {...register("city")} />
          {errors.city && (
            <p className="text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>
            Exact Address{" "}
            <span className="text-xs text-muted-foreground">
              (Only shared after booking is confirmed)
            </span>
          </Label>
          <Input
            placeholder="e.g. 15 Farm Road"
            {...register("exactAddress")}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Landmark</Label>
          <Input
            placeholder="e.g. Behind the central market"
            {...register("landmark")}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h4 className="text-sm font-semibold border-b pb-2">
          Delivery & Logistics
        </h4>
        <div className="p-4 border rounded-xl space-y-4 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm">Offer Delivery?</Label>
              <p className="text-xs text-muted-foreground">
                Can you transport this equipment to the renter?
              </p>
            </div>
            <Controller
              name="deliveryAvailable"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          {deliveryAvailable && (
            <div className="grid grid-cols-2 gap-4 pt-2 border-t">
              <div className="space-y-1.5">
                <Label>Max Delivery Radius (km)</Label>
                <Input
                  type="number"
                  {...register("deliveryRadiusKm", { valueAsNumber: true })}
                />
                {errors.deliveryRadiusKm && (
                  <p className="text-xs text-red-500">
                    {errors.deliveryRadiusKm.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Fee Per Km</Label>
                <Controller
                  name="deliveryFeePerKm"
                  control={control}
                  render={({ field }) => (
                    <AmountInput
                      placeholder="e.g. 500"
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.deliveryFeePerKm}
                      disabled={isLoading}
                    />
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h4 className="text-sm font-semibold border-b pb-2">Availability</h4>

        <div className="space-y-1.5">
          <Label>Advance Notice Required (Days)</Label>
          <Input
            type="number"
            {...register("advanceBookingDays", { valueAsNumber: true })}
          />
          <p className="text-[10px] text-muted-foreground">
            How many days in advance must a renter book?
          </p>
        </div>

        <div className="space-y-2">
          <Label>Schedule Setup</Label>
          <Controller
            name="availabilityType"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always">Always Available</SelectItem>
                  <SelectItem value="custom">
                    Custom (Block specific dates)
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {availabilityType === "custom" && (
          <div className="pt-2">
            <Label>Blocked Dates</Label>
            <p className="text-[10px] text-muted-foreground mb-2">
              Select dates when the equipment is unavailable.
            </p>
            <Card className="p-2 inline-block">
              <Controller
                name="unavailableDates"
                control={control}
                render={({ field }) => (
                  <Calendar
                    mode="multiple"
                    selected={(field.value || []).map(
                      (d: string) => new Date(d),
                    )}
                    onSelect={(dates: Date[] | undefined) => {
                      field.onChange(dates?.map((d) => d.toISOString()));
                    }}
                    disabled={(date: Date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                )}
              />
            </Card>
          </div>
        )}
      </div>
    </form>
  );
}
