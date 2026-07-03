"use client";

import { useState, type ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Sprout } from "lucide-react";
import { apiClient } from "@/lib/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SEGMENTS = [
  { value: "FARMER", label: "Farmer" },
  { value: "EQUIPMENT_OWNER", label: "Equipment owner" },
  { value: "MARKET_AGENT", label: "Market agent" },
  { value: "PRICE_WATCHER", label: "Just interested in prices" },
] as const;

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  segment: z.string().min(1, "Please tell us who you're joining as"),
  // Honeypot — must stay empty.
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface WaitlistDialogProps {
  /** Custom trigger. Defaults to a branded "Join the waitlist" button. */
  trigger?: ReactNode;
  /** Where the signup came from (stored for analytics). */
  source?: string;
}

export default function WaitlistDialog({
  trigger,
  source = "hero",
}: WaitlistDialogProps) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", segment: "", website: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      await apiClient.post("/waitlist/join", {
        email: values.email,
        segment: values.segment,
        website: values.website,
        source,
      });
      setDone(true);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string | string[] } } })
          ?.response?.data?.message;
      const text = Array.isArray(message) ? message[0] : message;
      toast.error(text || "Something went wrong. Please try again.");
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // Reset after the close animation so the form doesn't flash.
      setTimeout(() => {
        setDone(false);
        reset();
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            size="lg"
            className="rounded-full px-8 h-12 bg-brand-600 hover:bg-brand-700 text-white text-base font-semibold shadow-lg shadow-brand-600/20"
          >
            Join the waitlist
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {done ? (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100">
              <CheckCircle2 className="h-7 w-7 text-brand-600" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                You&apos;re on the list.
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                We&apos;ll email you the moment we open access.
              </p>
            </div>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-full mt-2">
                Done
              </Button>
            </DialogClose>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 mb-1">
                <Sprout className="h-5 w-5 text-brand-600" />
              </div>
              <DialogTitle className="text-xl font-bold tracking-tight">
                Rent the equipment you need. Sell at the price you deserve.
              </DialogTitle>
              <DialogDescription>
                Farmgreene is launching soon. Join the waitlist for
                founding-member access to on-demand equipment rental and
                real-time market prices.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 pt-2"
              noValidate
            >
              {/* Honeypot — visually hidden, off-screen, skipped by tab/AT. */}
              <div
                aria-hidden="true"
                className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="segment">I&apos;m joining as</Label>
                <Controller
                  control={control}
                  name="segment"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="segment" aria-invalid={!!errors.segment}>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {SEGMENTS.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.segment && (
                  <p className="text-xs text-red-500">
                    {errors.segment.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-600/20"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Join the waitlist"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
