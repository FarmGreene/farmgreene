"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, Step2Data } from "../createListingSchema";
import { ConditionSelector } from "../shared/ConditionSelector";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Wrench,
  Zap,
  Fuel,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Calendar as CalendarIcon,
  ClipboardList,
  Scale,
  Gauge,
  Info
} from "lucide-react";

interface Step2SpecsProps {
  onSubmit: (data: Step2Data) => Promise<void>;
  defaultValues?: Partial<Step2Data>;
  isLoading: boolean;
}

const MAINTENANCE_OPTIONS = [
  {
    value: "ready" as const,
    label: "Ready to Rent",
    description: "Can be rented immediately",
    icon: ShieldCheck,
    color: "emerald",
    badge: "Available"
  },
  {
    value: "recently_serviced" as const,
    label: "Recently Serviced",
    description: "Serviced & certified recently",
    icon: Sparkles,
    color: "blue",
    badge: "Certified"
  },
  {
    value: "under_maintenance" as const,
    label: "Under Maintenance",
    description: "Currently undergoing care",
    icon: AlertTriangle,
    color: "amber",
    badge: "Unavailable"
  },
];

const maintenanceColors: Record<
  string,
  { idle: string; selected: string; icon: string; badge: string }
> = {
  emerald: {
    idle: "border-slate-200 dark:border-slate-800 hover:border-emerald-300 hover:bg-slate-50/50",
    selected:
      "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20 shadow-sm shadow-emerald-500/5",
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
  },
  blue: {
    idle: "border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:bg-slate-50/50",
    selected:
      "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 ring-2 ring-blue-500/20 shadow-sm shadow-blue-500/5",
    icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/40",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
  },
  amber: {
    idle: "border-slate-200 dark:border-slate-800 hover:border-amber-300 hover:bg-slate-50/50",
    selected:
      "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-500/20 shadow-sm shadow-amber-500/5",
    icon: "bg-amber-100 text-amber-600 dark:bg-amber-900/40",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
  },
};

export function Step2Specs({ onSubmit, defaultValues, isLoading }: Step2SpecsProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema) as any,
    defaultValues,
  });

  return (
    <form id="step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* SECTION 1: Vitality & Status Dashboard */}
      <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 space-y-5">
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Equipment Health & Availability</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Provide details on the current condition and operational availability.</p>
          </div>
        </div>

        {/* Condition Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              Overall Condition <span className="text-red-500">*</span>
            </Label>
            <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-medium">Required</span>
          </div>
          <Controller
            name="condition"
            control={control}
            render={({ field }) => (
              <ConditionSelector
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.condition && (
            <p className="text-xs text-red-500 flex items-center gap-1"><Info className="h-3.5 w-3.5" />{errors.condition.message}</p>
          )}
        </div>

        {/* Maintenance / Availability Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              Current Availability Status <span className="text-red-500">*</span>
            </Label>
            <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-medium">Required</span>
          </div>
          
          <Controller
            name="maintenanceStatus"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {MAINTENANCE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = field.value === opt.value;
                  const colors = maintenanceColors[opt.color];
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => field.onChange(opt.value)}
                      className={cn(
                        "flex flex-col items-start gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left cursor-pointer",
                        isSelected ? colors.selected : colors.idle
                      )}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", colors.icon)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <Badge className={cn("text-[9px] border-none font-semibold px-2 py-0.5", colors.badge)}>
                          {opt.badge}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{opt.label}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-snug">{opt.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.maintenanceStatus && (
            <p className="text-xs text-red-500 flex items-center gap-1"><Info className="h-3.5 w-3.5" />{errors.maintenanceStatus.message}</p>
          )}
        </div>
      </div>

      {/* SECTION 2: Technical DNA & Logs (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left Side: Mechanical Specs Card (7 cols) */}
        <div className="md:col-span-7 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Zap className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Mechanical Specs</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Provide physical and performance benchmarks (optional).</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Horse Power */}
            <div className="space-y-1.5">
              <Label htmlFor="horsePower" className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Gauge className="h-3.5 w-3.5" /> Horse Power (HP)
              </Label>
              <div className="relative flex items-center group">
                <Input
                  id="horsePower"
                  type="number"
                  placeholder="e.g. 75"
                  className="pr-12 pl-3 py-4 rounded-xl border border-slate-200 dark:border-slate-850 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                  {...register("horsePower", { valueAsNumber: true })}
                />
                <span className="absolute right-3 text-[9px] font-bold tracking-wider text-slate-400 select-none bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-750">
                  HP
                </span>
              </div>
              {errors.horsePower && (
                <p className="text-xs text-red-500">{errors.horsePower.message}</p>
              )}
            </div>

            {/* Engine Hours */}
            <div className="space-y-1.5">
              <Label htmlFor="engineHours" className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Wrench className="h-3.5 w-3.5" /> Engine Hours
              </Label>
              <div className="relative flex items-center group">
                <Input
                  id="engineHours"
                  type="number"
                  placeholder="e.g. 1200"
                  className="pr-12 pl-3 py-4 rounded-xl border border-slate-200 dark:border-slate-850 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                  {...register("engineHours", { valueAsNumber: true })}
                />
                <span className="absolute right-3 text-[9px] font-bold tracking-wider text-slate-400 select-none bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-750">
                  HRS
                </span>
              </div>
              {errors.engineHours && (
                <p className="text-xs text-red-500">{errors.engineHours.message}</p>
              )}
            </div>

            {/* Weight */}
            <div className="space-y-1.5">
              <Label htmlFor="weightKg" className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Scale className="h-3.5 w-3.5" /> Weight
              </Label>
              <div className="relative flex items-center group">
                <Input
                  id="weightKg"
                  type="number"
                  placeholder="e.g. 2500"
                  className="pr-12 pl-3 py-4 rounded-xl border border-slate-200 dark:border-slate-850 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
                  {...register("weightKg", { valueAsNumber: true })}
                />
                <span className="absolute right-3 text-[9px] font-bold tracking-wider text-slate-400 select-none bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-750">
                  KG
                </span>
              </div>
              {errors.weightKg && (
                <p className="text-xs text-red-500">{errors.weightKg.message}</p>
              )}
            </div>

            {/* Fuel Type */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Fuel className="h-3.5 w-3.5" /> Fuel Type
              </Label>
              <Controller
                name="fuelType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value || undefined} onValueChange={field.onChange}>
                    <SelectTrigger className="py-4 rounded-xl border border-slate-200 dark:border-slate-850">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
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
          </div>
        </div>

        {/* Right Side: Operational Log & Notes Card (5 cols) */}
        <div className="md:col-span-5 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ClipboardList className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Operation & Logs</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Logbook dates and custom instructions.</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {/* Last Service Date */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5" /> Last Service Date{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="lastServiceDate"
                control={control}
                render={({ field }) => {
                  const selected = field.value
                    ? parseISO(field.value)
                    : undefined;
                  return (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full justify-start gap-2 rounded-xl border border-slate-200 dark:border-slate-850 py-4 font-normal",
                            !field.value && "text-muted-foreground",
                            errors.lastServiceDate &&
                              "border-red-500 focus-visible:ring-red-500",
                          )}
                        >
                          <CalendarIcon className="h-4 w-4 text-slate-400" />
                          {selected ? format(selected, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selected}
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : "",
                            )
                          }
                          disabled={{ after: new Date() }}
                          captionLayout="dropdown"
                          startMonth={new Date(new Date().getFullYear() - 30, 0)}
                          endMonth={new Date()}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
              {errors.lastServiceDate && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  {errors.lastServiceDate.message}
                </p>
              )}
            </div>

            {/* Additional Specs / Notes */}
            <div className="space-y-1.5">
              <Label htmlFor="additionalSpecs" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Custom Specs & Notes
              </Label>
              <Textarea
                id="additionalSpecs"
                rows={3}
                placeholder="Any other mechanical nuances, attachments, or instructions..."
                className="rounded-xl border border-slate-200 dark:border-slate-850 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 text-xs resize-none"
                {...register("additionalSpecs")}
              />
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}

