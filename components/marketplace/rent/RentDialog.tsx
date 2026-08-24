"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { Loader2, CalendarDays, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PublicListing } from "@/types/marketplace";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { createRentRequest } from "@/lib/services/rent-request.service";
import { computeRentEstimate, formatNaira } from "@/lib/marketplace/pricing";
import { cn } from "@/lib/utils";

interface RentDialogProps {
  listing: PublicListing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function toIso(d: Date): string {
  // Local calendar date → YYYY-MM-DD (avoid timezone shifting the day).
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

export function RentDialog({ listing, open, onOpenChange }: RentDialogProps) {
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>();
  const [operator, setOperator] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canOfferOperator =
    !!listing.includesOperator || !!listing.operatorChargePerDay;

  // Earliest bookable date, honouring advance-booking notice.
  const minDate = useMemo(() => {
    const d = startOfDay(new Date());
    d.setDate(d.getDate() + (listing.advanceBookingDays || 0));
    return d;
  }, [listing.advanceBookingDays]);

  const unavailable = useMemo(
    () =>
      (listing.unavailableDates || [])
        .map((iso) => {
          const d = new Date(`${iso}T00:00:00`);
          return Number.isNaN(d.getTime()) ? null : d;
        })
        .filter((d): d is Date => d !== null),
    [listing.unavailableDates],
  );

  const estimate = useMemo(() => {
    if (!range?.from || !range?.to) return null;
    return computeRentEstimate(listing, {
      startDate: toIso(range.from),
      endDate: toIso(range.to),
      operator,
      delivery,
    });
  }, [range, operator, delivery, listing]);

  const minDays = listing.minRentalDays || 1;
  const maxDays = listing.maxRentalDays;
  const durationError =
    estimate &&
    (estimate.rentalDays < minDays ||
      (maxDays ? estimate.rentalDays > maxDays : false))
      ? maxDays
        ? `Rental must be between ${minDays} and ${maxDays} days.`
        : `Minimum rental is ${minDays} day(s).`
      : null;

  const canSubmit = !!range?.from && !!range?.to && !durationError && !submitting;

  const handleSubmit = async () => {
    if (!range?.from || !range?.to) return;
    setSubmitting(true);
    try {
      await createRentRequest({
        listingId: listing.id,
        startDate: toIso(range.from),
        endDate: toIso(range.to),
        operatorRequested: operator,
        deliveryRequested: delivery,
        message: message.trim() || undefined,
      });
      toast.success("Request sent!", {
        description:
          "The owner has been notified. You'll hear back once they respond.",
      });
      onOpenChange(false);
      setRange(undefined);
      setMessage("");
      router.push("/dashboard/rentals");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Could not send your request. Please try again.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !submitting && onOpenChange(v)}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Request to rent
          </DialogTitle>
          <DialogDescription>
            Pick your dates and send a request — no payment now. The owner
            reviews and responds.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Dates */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" /> Rental dates
            </Label>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-2 flex justify-center">
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={1}
                disabled={[{ before: minDate }, ...unavailable]}
              />
            </div>
            {durationError && (
              <p className="text-xs text-red-500 font-medium">{durationError}</p>
            )}
          </div>

          {/* Options */}
          {(canOfferOperator || listing.deliveryAvailable) && (
            <div className="space-y-3">
              {canOfferOperator && (
                <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">Include operator</p>
                    {listing.operatorChargePerDay ? (
                      <p className="text-xs text-muted-foreground">
                        +{formatNaira(Number(listing.operatorChargePerDay))}/day
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Operator available
                      </p>
                    )}
                  </div>
                  <Switch checked={operator} onCheckedChange={setOperator} />
                </div>
              )}
              {listing.deliveryAvailable && (
                <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">Request delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Owner confirms the delivery fee on acceptance
                    </p>
                  </div>
                  <Switch checked={delivery} onCheckedChange={setDelivery} />
                </div>
              )}
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label
              htmlFor="rent-message"
              className="text-xs font-bold uppercase tracking-wider text-slate-500"
            >
              Message to owner (optional)
            </Label>
            <Textarea
              id="rent-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the owner how you plan to use the equipment…"
              maxLength={1000}
              rows={3}
            />
          </div>

          {/* Estimate */}
          {estimate && !durationError && (
            <div className="rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Estimate · {estimate.rentalDays} day(s)
              </p>
              <EstimateRow
                label={`${formatNaira(estimate.unitPrice)} / ${estimate.ratePeriod}`}
                value={formatNaira(estimate.subtotal)}
              />
              {estimate.operatorCharge > 0 && (
                <EstimateRow
                  label="Operator"
                  value={formatNaira(estimate.operatorCharge)}
                />
              )}
              {estimate.depositAmount > 0 && (
                <EstimateRow
                  label="Refundable deposit"
                  value={formatNaira(estimate.depositAmount)}
                />
              )}
              <div className="flex items-center justify-between border-t border-emerald-200/60 dark:border-emerald-900/40 pt-2 mt-1">
                <span className="text-sm font-bold">Estimated total</span>
                <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                  {formatNaira(estimate.estimatedTotal)}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground flex items-start gap-1.5 leading-snug">
                <Info className="h-3 w-3 mt-0.5 shrink-0" />
                An estimate — the owner confirms final pricing (incl. any
                delivery fee) when they accept.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EstimateRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
