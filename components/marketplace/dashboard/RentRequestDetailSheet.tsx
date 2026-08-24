"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  ImageIcon,
  CheckCircle2,
  Circle,
  XCircle,
} from "lucide-react";
import { RentRequest } from "@/types/marketplace";
import { RENT_REQUEST_STATUS_META } from "@/lib/marketplace/rent-request-meta";
import { getReturnCountdown } from "@/lib/marketplace/return-countdown";
import { formatNaira } from "@/lib/marketplace/pricing";
import { useAcceptRentRequest, useRejectRentRequest } from "@/lib/hooks/useRentRequests";
import { RejectRequestDialog } from "./RejectRequestDialog";
import { toast } from "sonner";

const countdownToneClass: Record<string, string> = {
  upcoming: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "due-soon": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  overdue: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  closed: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

const STEPS = ["Requested", "Accepted", "Completed"] as const;

export function RentRequestDetailSheet({
  request,
  open,
  onOpenChange,
}: {
  request: RentRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const acceptMutation = useAcceptRentRequest();
  const rejectMutation = useRejectRentRequest();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        {request && (
          <>
            <SheetHeader>
              <SheetTitle>Rental Request</SheetTitle>
            </SheetHeader>

            <div className="px-4 pb-6 space-y-6">
              {/* Renter identity */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 overflow-hidden">
                  {request.renter?.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={request.renter.avatarUrl}
                      alt="Renter"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-slate-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-base tracking-tight">
                    {[request.renter?.firstName, request.renter?.lastName]
                      .filter(Boolean)
                      .join(" ") || "Renter"}
                  </p>
                  <Badge
                    className={`h-5 px-2 text-[9px] uppercase font-bold border-none ${RENT_REQUEST_STATUS_META[request.status].badgeClassName}`}
                  >
                    {RENT_REQUEST_STATUS_META[request.status].label}
                  </Badge>
                </div>
              </div>

              {request.status === "accepted" && (
                <div className="space-y-1.5">
                  {request.renter?.phone && (
                    <a
                      href={`tel:${request.renter.phone}`}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-emerald-600"
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-600" />
                      {request.renter.phone}
                    </a>
                  )}
                  {request.renter?.email && (
                    <a
                      href={`mailto:${request.renter.email}`}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-emerald-600 break-all"
                    >
                      <Mail className="h-3.5 w-3.5 text-emerald-600" />
                      {request.renter.email}
                    </a>
                  )}
                </div>
              )}

              <Separator />

              {/* Equipment summary */}
              <Link
                href={`/marketplace/${request.listingId}`}
                className="flex gap-3 group"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {request.listing?.primaryPhotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={request.listing.primaryPhotoUrl}
                      alt={request.listing?.name ?? "Equipment"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-slate-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm tracking-tight group-hover:text-emerald-600 transition-colors truncate">
                    {request.listing?.name ?? "Equipment"}
                  </p>
                  {(request.listing?.lga || request.listing?.state) && (
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                      <MapPin className="h-3 w-3 text-emerald-500" />
                      <span className="truncate">
                        {[request.listing?.lga, request.listing?.state]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Dates + return countdown */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>
                    {request.startDate} — {request.endDate} ({request.rentalDays}d)
                  </span>
                </div>
                {(() => {
                  const countdown = getReturnCountdown(request.endDate, request.status);
                  return countdown.label !== "—" ? (
                    <Badge
                      className={`h-5 px-2 text-[10px] font-bold border-none ${countdownToneClass[countdown.tone]}`}
                    >
                      {countdown.label}
                    </Badge>
                  ) : null;
                })()}
              </div>

              {/* Status stepper */}
              <StatusStepper status={request.status} />

              <Separator />

              {/* Pricing breakdown */}
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Pricing
                </h4>
                <PriceRow label={`Rate (${request.ratePeriod})`} value={formatNaira(Number(request.unitPrice))} />
                <PriceRow label="Subtotal" value={formatNaira(Number(request.subtotal))} />
                {request.operatorRequested && (
                  <PriceRow label="Operator" value={formatNaira(Number(request.operatorCharge))} />
                )}
                {request.deliveryRequested && (
                  <PriceRow label="Delivery" value={formatNaira(Number(request.deliveryFee))} />
                )}
                {Number(request.depositAmount) > 0 && (
                  <PriceRow label="Deposit" value={formatNaira(Number(request.depositAmount))} />
                )}
                <PriceRow
                  label="Estimated Total"
                  value={formatNaira(Number(request.estimatedTotal))}
                  strong
                />
              </div>

              {request.message && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                    Renter's Message
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    “{request.message}”
                  </p>
                </div>
              )}

              {request.ownerResponseNote && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                    Your Response
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    “{request.ownerResponseNote}”
                  </p>
                </div>
              )}
            </div>

            {request.status === "pending" && (
              <div className="grid grid-cols-2 border-t border-slate-100 dark:border-slate-800">
                <RejectRequestDialog
                  onReject={async (note) => {
                    await rejectMutation.mutateAsync({ id: request.id, note });
                    toast.success("Request declined");
                  }}
                />
                <ConfirmDialog
                  title="Accept this request?"
                  description="The renter will be notified and your contact details shared with them so you can coordinate handover."
                  confirmLabel="Accept"
                  onConfirm={async () => {
                    await acceptMutation.mutateAsync({ id: request.id });
                    toast.success("Request accepted");
                  }}
                  trigger={
                    <button className="py-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors border-l border-slate-100 dark:border-slate-800 uppercase tracking-wider">
                      Accept
                    </button>
                  }
                />
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function PriceRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-xs ${strong ? "font-bold text-slate-900 dark:text-white" : "text-muted-foreground"}`}>
        {label}
      </span>
      <span className={`text-xs ${strong ? "font-black text-emerald-600 dark:text-emerald-400" : "font-semibold"}`}>
        {value}
      </span>
    </div>
  );
}

function StatusStepper({ status }: { status: RentRequest["status"] }) {
  if (status === "rejected" || status === "cancelled") {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
        <XCircle className="h-4 w-4" />
        {status === "rejected" ? "Request declined" : "Request cancelled"}
      </div>
    );
  }

  const currentIndex = status === "pending" ? 0 : status === "accepted" ? 1 : 2;

  return (
    <div className="flex items-center gap-1.5">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-1.5 flex-1">
          <div className="flex flex-col items-center gap-1 flex-1">
            {i <= currentIndex ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Circle className="h-4 w-4 text-slate-300 dark:text-slate-700" />
            )}
            <span
              className={`text-[9px] uppercase font-bold tracking-wider ${
                i <= currentIndex
                  ? "text-slate-700 dark:text-slate-200"
                  : "text-slate-300 dark:text-slate-700"
              }`}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 flex-1 -mt-4 ${
                i < currentIndex ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
