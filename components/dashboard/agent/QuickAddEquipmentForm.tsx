"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  Loader2,
  MapPin,
  CheckCircle2,
  Send,
  User2,
  Tractor,
  ArrowRight,
} from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategorySelector } from "@/components/marketplace/listing-wizard/shared/CategorySelector";
import { ConditionSelector } from "@/components/marketplace/listing-wizard/shared/ConditionSelector";
import { PhotoUploadZone } from "@/components/marketplace/listing-wizard/shared/PhotoUploadZone";
import { NigerianState, STATE_LABELS } from "@/types/commodity";
import {
  agentListingSchema,
  AgentListingFormValues,
} from "./agentListingSchema";
import {
  createAgentListing,
  uploadAgentListingPhoto,
  submitAgentListing,
} from "@/lib/services/agent-marketplace.service";
import { captureLocation } from "@/lib/utils/geolocation";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNumber(value: string) {
  if (!value) return "";
  const parts = value.replace(/,/g, "").split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="h-7 w-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
        <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h3 className="font-semibold text-sm">{children}</h3>
    </div>
  );
}

// ─── Success state ──────────────────────────────────────────────────────────────

function SuccessState({ onAddAnother }: { onAddAnother: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-6 py-16 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Equipment submitted!</h3>
        <p className="text-muted-foreground max-w-xs">
          It&apos;s now pending admin review and flagged as agent-verified.
        </p>
      </div>
      <Button className="gap-2" onClick={onAddAnother}>
        Onboard Another <ArrowRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}

// ─── Main form ──────────────────────────────────────────────────────────────────

export function QuickAddEquipmentForm() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<AgentListingFormValues>({
    resolver: zodResolver(agentListingSchema),
    defaultValues: {
      ownerName: "",
      ownerPhone: "",
      name: "",
      pricePerDay: "",
      state: "",
      lga: "",
      city: "",
      landmark: "",
      includesOperator: false,
      deliveryAvailable: false,
    },
  });

  const latitude = form.watch("latitude");
  const longitude = form.watch("longitude");

  async function handleCaptureLocation() {
    setIsCapturing(true);
    try {
      const coords = await captureLocation();
      form.setValue("latitude", coords.latitude);
      form.setValue("longitude", coords.longitude);
      toast.success(`Location captured (±${Math.round(coords.accuracy)}m)`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsCapturing(false);
    }
  }

  function handlePhotoSelected(file: File) {
    // Defer the actual upload until the listing exists — store locally for now.
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    return Promise.resolve();
  }

  function handlePhotoRemove() {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
  }

  function resetForm() {
    form.reset();
    handlePhotoRemove();
    setIsSuccess(false);
  }

  async function onSubmit(values: AgentListingFormValues) {
    if (!photoFile) {
      toast.error("Add at least one photo of the equipment.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create the draft (owner is found-or-created server-side by phone).
      const listing = await createAgentListing({
        owner: {
          fullName: values.ownerName,
          phone: values.ownerPhone,
          state: values.state || undefined,
          lga: values.lga || undefined,
        },
        name: values.name,
        category: values.category,
        condition: values.condition,
        pricePerDay: Number(values.pricePerDay.replace(/,/g, "")),
        state: values.state || undefined,
        lga: values.lga || undefined,
        city: values.city || undefined,
        landmark: values.landmark || undefined,
        latitude: values.latitude,
        longitude: values.longitude,
        includesOperator: values.includesOperator,
        deliveryAvailable: values.deliveryAvailable,
      });

      // 2. Upload the primary photo.
      await uploadAgentListingPhoto(listing.id, photoFile, true);

      // 3. Submit for review (sets agentVerified + pending_review).
      await submitAgentListing(listing.id);

      setIsSuccess(true);
    } catch (e) {
      const message =
        (e as any)?.response?.data?.message ??
        "Could not submit equipment. Please try again.";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return <SuccessState onAddAnother={resetForm} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* ── Owner ─────────────────────────────────────────────── */}
        <section>
          <SectionLabel icon={User2}>Owner details</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Full name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Musa Ibrahim"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ownerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Phone number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      inputMode="tel"
                      placeholder="e.g. 0803 000 0000"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* ── Equipment ─────────────────────────────────────────── */}
        <section>
          <SectionLabel icon={Tractor}>Equipment</SectionLabel>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    What is it? (name)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Massey Ferguson 375 Tractor"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Category</FormLabel>
                  <FormControl>
                    <CategorySelector
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Condition{" "}
                    <span className="text-xs text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <ConditionSelector
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* ── Price ─────────────────────────────────────────────── */}
        <section>
          <SectionLabel icon={Send}>Daily rate</SectionLabel>
          <FormField
            control={form.control}
            name="pricePerDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Price per day</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">
                      ₦
                    </span>
                    <Input
                      {...field}
                      value={formatNumber(field.value)}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^[0-9,.]*$/.test(val)) {
                          field.onChange(val.replace(/,/g, ""));
                        }
                      }}
                      type="text"
                      inputMode="decimal"
                      placeholder="0"
                      className="pl-7 h-11 font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                      / day
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="includesOperator"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-medium text-sm">
                    Includes operator
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryAvailable"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-medium text-sm">
                    Delivery offered
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* ── Location ──────────────────────────────────────────── */}
        <section>
          <SectionLabel icon={MapPin}>Location</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">State</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
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
            <FormField
              control={form.control}
              name="lga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    LGA{" "}
                    <span className="text-xs text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Saki West" className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    City / Town{" "}
                    <span className="text-xs text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Saki" className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="landmark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Landmark{" "}
                    <span className="text-xs text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Near central mosque"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* GPS capture */}
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-dashed p-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCaptureLocation}
              disabled={isCapturing}
              className="gap-2 shrink-0"
            >
              {isCapturing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              {latitude != null ? "Recapture GPS" : "Capture GPS"}
            </Button>
            <p className="text-xs text-muted-foreground">
              {latitude != null && longitude != null ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Captured: {latitude.toFixed(5)}, {longitude.toFixed(5)}
                </span>
              ) : (
                "Stand at the equipment and tag its exact location."
              )}
            </p>
          </div>
        </section>

        {/* ── Photo ─────────────────────────────────────────────── */}
        <section>
          <SectionLabel icon={CheckCircle2}>Photo</SectionLabel>
          <PhotoUploadZone
            label="Add a photo of the equipment"
            sublabel="Tap to take or choose a photo (max 5MB)"
            onUpload={handlePhotoSelected}
            onRemove={handlePhotoRemove}
            currentUrl={photoPreview}
          />
        </section>

        {/* ── Submit ────────────────────────────────────────────── */}
        <Button
          type="submit"
          size="lg"
          className="w-full gap-2 h-12 font-semibold text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Submit Equipment
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
