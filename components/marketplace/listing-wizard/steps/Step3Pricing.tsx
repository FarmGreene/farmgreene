"use client";

import React from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step3Schema,
  Step3Data,
  DEPOSIT_MAX_DAILY_RATE_MULTIPLIER,
} from "../createListingSchema";
import { EarningsEstimator } from "../shared/EarningsEstimator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AmountInput } from "@/components/ui/amount-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step3PricingProps {
  onSubmit: (data: Step3Data) => Promise<void>;
  defaultValues?: Partial<Step3Data>;
  isLoading: boolean;
}

export function Step3Pricing({
  onSubmit,
  defaultValues,
  isLoading,
}: Step3PricingProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema) as any,
    defaultValues: {
      primaryPeriod: "day",
      minRentalDays: 1,
      depositRequired: false,
      includesOperator: false,
      cancellationPolicy: "moderate",
      ...defaultValues,
    },
  });

  const pricePerDay = useWatch({ control, name: "pricePerDay" });
  const depositRequired = useWatch({ control, name: "depositRequired" });
  const includesOperator = useWatch({ control, name: "includesOperator" });
  const primaryPeriod = useWatch({ control, name: "primaryPeriod" });

  // Deposit is capped at a week's worth of the daily rate. Kept in sync with the
  // same rule enforced in step3Schema.
  const depositCap =
    pricePerDay > 0 ? pricePerDay * DEPOSIT_MAX_DAILY_RATE_MULTIPLIER : null;

  return (
    <form
      id="step-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Base Pricing */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold border-b pb-2">
              Base Pricing
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pricePerDay">
                  Daily Rate <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="pricePerDay"
                  control={control}
                  render={({ field }) => (
                    <AmountInput
                      id="pricePerDay"
                      placeholder="e.g. 50,000"
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.pricePerDay}
                      disabled={isLoading}
                    />
                  )}
                />
                {errors.pricePerDay && (
                  <p className="text-xs text-red-500">
                    {errors.pricePerDay.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pricePerWeek">
                  Weekly Rate{" "}
                  <span className="text-xs text-muted-foreground">(opt)</span>
                </Label>
                <Controller
                  name="pricePerWeek"
                  control={control}
                  render={({ field }) => (
                    <AmountInput
                      id="pricePerWeek"
                      placeholder="e.g. 300,000"
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.pricePerWeek}
                      disabled={isLoading}
                    />
                  )}
                />
                {errors.pricePerWeek && (
                  <p className="text-xs text-red-500">
                    {errors.pricePerWeek.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pricePerMonth">
                  Monthly Rate{" "}
                  <span className="text-xs text-muted-foreground">(opt)</span>
                </Label>
                <Controller
                  name="pricePerMonth"
                  control={control}
                  render={({ field }) => (
                    <AmountInput
                      id="pricePerMonth"
                      placeholder="e.g. 1,000,000"
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.pricePerMonth}
                      disabled={isLoading}
                    />
                  )}
                />
                {errors.pricePerMonth && (
                  <p className="text-xs text-red-500">
                    {errors.pricePerMonth.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Headline Price Period</Label>
              <Controller
                name="primaryPeriod"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Daily</SelectItem>
                      <SelectItem value="week">Weekly</SelectItem>
                      <SelectItem value="month">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-xs text-muted-foreground">
                This is the price that will be shown on the search results card.
              </p>
            </div>
          </div>

          {/* Rental Terms */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold border-b pb-2">
              Rental Rules
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="minRentalDays">
                  Min Days <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="minRentalDays"
                  type="number"
                  {...register("minRentalDays", { valueAsNumber: true })}
                />
                {errors.minRentalDays && (
                  <p className="text-xs text-red-500">
                    {errors.minRentalDays.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="maxRentalDays">
                  Max Days{" "}
                  <span className="text-xs text-muted-foreground">(opt)</span>
                </Label>
                <Input
                  id="maxRentalDays"
                  type="number"
                  {...register("maxRentalDays", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* Deposit */}
            <div className="p-4 border rounded-xl space-y-4 bg-slate-50/50 dark:bg-slate-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Require Security Deposit?</Label>
                  <p className="text-xs text-muted-foreground">
                    Renter pays this upfront, refunded if returned safely.
                  </p>
                </div>
                <Controller
                  name="depositRequired"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              {depositRequired && (
                <div className="pt-2">
                  <Label htmlFor="depositAmount" className="mb-2">
                    Deposit Amount <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="depositAmount"
                    control={control}
                    render={({ field }) => (
                      <AmountInput
                        id="depositAmount"
                        placeholder="e.g. 200,000"
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.depositAmount}
                        disabled={isLoading}
                      />
                    )}
                  />
                  {errors.depositAmount ? (
                    <p className="text-xs text-red-500">
                      {errors.depositAmount.message}
                    </p>
                  ) : depositCap !== null ? (
                    <p className="text-xs text-muted-foreground">
                      Max allowed: ₦{depositCap.toLocaleString()} (
                      {DEPOSIT_MAX_DAILY_RATE_MULTIPLIER}× daily rate)
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Set the daily rate to see the max allowed deposit.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Operator */}
            <div className="p-4 border rounded-xl space-y-4 bg-slate-50/50 dark:bg-slate-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Includes an Operator?</Label>
                  <p className="text-xs text-muted-foreground">
                    Does the price include someone to operate the machinery?
                  </p>
                </div>
                <Controller
                  name="includesOperator"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              {includesOperator && (
                <div className="pt-2">
                  <Label htmlFor="operatorChargePerDay">
                    Extra charge for operator per day?{" "}
                    <span className="text-xs text-muted-foreground">
                      (Leave 0 if included in base price)
                    </span>
                  </Label>
                  <Controller
                    name="operatorChargePerDay"
                    control={control}
                    render={({ field }) => (
                      <AmountInput
                        id="operatorChargePerDay"
                        placeholder="e.g. 5,000"
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.operatorChargePerDay}
                        disabled={isLoading}
                      />
                    )}
                  />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>
                Cancellation Policy <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="cancellationPolicy"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flexible">
                        Flexible (Full refund up to 24h before)
                      </SelectItem>
                      <SelectItem value="moderate">
                        Moderate (50% refund up to 48h before)
                      </SelectItem>
                      <SelectItem value="strict">
                        Strict (No refunds after confirmation)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="additionalRules">
                Additional Rules{" "}
                <span className="text-xs text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="additionalRules"
                placeholder="e.g. Renter must provide their own diesel..."
                {...register("additionalRules")}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Estimator */}
        <div className="md:col-span-1">
          <div className="sticky top-6">
            <EarningsEstimator pricePerDay={pricePerDay} />
          </div>
        </div>
      </div>
    </form>
  );
}
