"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2, ArrowRight, Send, Info } from "lucide-react";
import { useSubmitPrice } from "@/lib/hooks/useCommodities";
import { useRouter } from "next/navigation";
import type { Assignment } from "@/lib/services/assignment.service";
import {
  NigerianRegion,
  REGION_LABELS,
  NigerianState,
  STATE_LABELS,
  STATE_REGION_MAP,
} from "@/types/commodity";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─── Schema ───────────────────────────────────────────────────────────────────

const priceSchema = z.object({
  price: z
    .string()
    .min(1, "Price is required.")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: "Price must be a positive number.",
    }),
  region: z.nativeEnum(NigerianRegion, {
    message: "Please select a region.",
  }),
  state: z.nativeEnum(NigerianState, {
    message: "Please select a state.",
  }),
  market: z.string().optional(),
  date: z.string().min(1, "Date is required."),
});

type PriceFormValues = z.infer<typeof priceSchema>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help inline ml-1" />
        </TooltipTrigger>
        <TooltipContent className="max-w-[220px] text-xs">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SuccessState({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center gap-6 py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
      </motion.div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Price Submitted!</h3>
        <p className="text-muted-foreground max-w-xs">
          Your price report has been submitted and is pending review by admins.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="gap-2" onClick={onBack}>
          Back to Assignments
        </Button>
        <Button className="gap-2" onClick={() => window.location.reload()}>
          Submit Another
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

interface UpdatePriceFormProps {
  commodityId: string;
  /** Pre-filled from assignment or URL params */
  defaultMarket?: string;
  /** Pre-filled from assignment */
  assignment?: Assignment | null;
}

export function UpdatePriceForm({
  commodityId,
  defaultMarket,
  assignment,
}: UpdatePriceFormProps) {
  const router = useRouter();
  const { mutateAsync, isPending, isSuccess, error, reset } =
    useSubmitPrice(commodityId);

  // Derive defaults from assignment
  const defaultRegion =
    (assignment?.region as NigerianRegion | undefined) ?? undefined;
  const defaultState = assignment?.state ?? "";

  const form = useForm<PriceFormValues>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      price: "",
      region: defaultRegion,
      state: (defaultState as NigerianState) || undefined,
      market: defaultMarket ?? assignment?.marketName ?? "",
      date: todayISO(),
    },
  });

  // Automatically update region when state changes
  const selectedState = form.watch("state");
  useEffect(() => {
    if (selectedState && STATE_REGION_MAP[selectedState]) {
      form.setValue("region", STATE_REGION_MAP[selectedState], {
        shouldValidate: true,
      });
    }
  }, [selectedState, form]);

  // Re-populate when assignment loads asynchronously
  useEffect(() => {
    if (assignment) {
      if (assignment.region) {
        form.setValue("region", assignment.region as NigerianRegion, {
          shouldValidate: false,
        });
      }
      if (assignment.state) {
        form.setValue("state", assignment.state as NigerianState, {
          shouldValidate: true,
        });
      }
      if (assignment.marketName && !form.getValues("market")) {
        form.setValue("market", assignment.marketName, {
          shouldValidate: false,
        });
      }
    }
  }, [assignment, form]);

  async function onSubmit(values: PriceFormValues) {
    await mutateAsync({
      price: Number(values.price),
      region: values.region,
      state: values.state,
      market: values.market || undefined,
      date: values.date,
    });
  }

  const serverError = error
    ? ((error as any)?.response?.data?.message ??
      "Submission failed. Please try again.")
    : null;

  if (isSuccess) {
    return <SuccessState onBack={() => router.push("/agent/assignments")} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Server error banner */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive font-medium"
              >
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Row 1: Price + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Price{" "}
                    <FieldHint>
                      Enter the current market price per unit observed today.
                    </FieldHint>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm select-none">
                        ₦
                      </span>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className={cn(
                          "pl-7 text-base font-semibold h-11 focus:ring-2 focus:ring-primary/30",
                          assignment?.commodity?.unit && "pr-20",
                        )}
                      />
                      {assignment?.commodity?.unit && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-xs select-none pointer-events-none truncate max-w-[60px]">
                          / {assignment.commodity.unit}
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Date Observed{" "}
                    <FieldHint>
                      The date on which you collected this price.
                    </FieldHint>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      max={todayISO()}
                      className="h-11"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Region + State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Region */}
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Region</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select region…" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(NigerianRegion).map((r) => (
                        <SelectItem key={r} value={r}>
                          {REGION_LABELS[r]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* State */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    State{" "}
                    <FieldHint>
                      The Nigerian state where the price was observed.
                    </FieldHint>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select state…" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(NigerianState).map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATE_LABELS[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 3: Market (optional, full width) */}
          <FormField
            control={form.control}
            name="market"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Market{" "}
                  <span className="text-xs text-muted-foreground font-normal ml-1">
                    (optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Kano Central Market"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Divider */}
          <div className="border-t border-border/60" />

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full gap-2 relative overflow-hidden group h-12 font-semibold text-base"
            disabled={isPending}
          >
            <span
              className={cn(
                "flex items-center gap-2 transition-all duration-200",
                isPending && "opacity-0",
              )}
            >
              <Send className="w-4 h-4" />
              Submit Price Report
            </span>
            {isPending && (
              <span className="absolute inset-0 flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting…
              </span>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
