"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  XCircle,
  ImageIcon,
} from "lucide-react";
import { RentRequest } from "@/types/marketplace";
import { formatNaira } from "@/lib/marketplace/pricing";

const statusMeta: Record<
  string,
  { label: string; className: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Awaiting response",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    icon: <Clock className="h-3 w-3" />,
  },
  accepted: {
    label: "Accepted",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  rejected: {
    label: "Declined",
    className:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    icon: <XCircle className="h-3 w-3" />,
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    icon: <XCircle className="h-3 w-3" />,
  },
  completed: {
    label: "Completed",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
};

export function RenterRequestCard({
  request,
  onCancel,
}: {
  request: RentRequest;
  onCancel: (id: string) => Promise<void>;
}) {
  const meta = statusMeta[request.status] ?? statusMeta.pending;
  const isPending = request.status === "pending";
  const isAccepted = request.status === "accepted";
  const ownerName =
    [request.ownerContact?.firstName, request.ownerContact?.lastName]
      .filter(Boolean)
      .join(" ") || "the owner";
  const location = [request.listing?.lga, request.listing?.state]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Thumbnail */}
          <Link
            href={`/marketplace/${request.listingId}`}
            className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
          >
            {request.listing?.primaryPhotoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={request.listing.primaryPhotoUrl}
                alt={request.listing?.name ?? "Equipment"}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="h-6 w-6 text-slate-400" />
            )}
          </Link>

          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/marketplace/${request.listingId}`}
                className="font-bold text-sm tracking-tight truncate hover:text-emerald-600 transition-colors"
              >
                {request.listing?.name ?? "Equipment"}
              </Link>
              <Badge
                className={`shrink-0 h-5 px-2 text-[9px] uppercase font-bold border-none inline-flex items-center gap-1 ${meta.className}`}
              >
                {meta.icon}
                {meta.label}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>
                {request.startDate} — {request.endDate} ({request.rentalDays}d)
              </span>
            </div>
            {location && (
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <MapPin className="h-3 w-3 text-emerald-500" />
                <span className="truncate">{location}</span>
              </div>
            )}

            <div className="flex items-baseline gap-1 pt-0.5">
              <span className="text-sm font-black text-slate-900 dark:text-white">
                {formatNaira(Number(request.estimatedTotal))}
              </span>
              <span className="text-[10px] text-muted-foreground">
                est. total
                {request.depositAmount > 0
                  ? ` · incl. ${formatNaira(Number(request.depositAmount))} deposit`
                  : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Accepted → owner contact + next steps */}
        {isAccepted && (
          <div className="mx-4 mb-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 p-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Accepted — arrange handover
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Reach out to {ownerName} to confirm pickup or delivery and settle
              payment directly. Farmgreene doesn&apos;t process the payment for
              this rental.
            </p>

            <div className="space-y-1.5">
              {request.ownerContact?.phone && (
                <a
                  href={`tel:${request.ownerContact.phone}`}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-emerald-600"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-600" />
                  {request.ownerContact.phone}
                </a>
              )}
              {request.ownerContact?.email && (
                <a
                  href={`mailto:${request.ownerContact.email}`}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-emerald-600 break-all"
                >
                  <Mail className="h-3.5 w-3.5 text-emerald-600" />
                  {request.ownerContact.email}
                </a>
              )}
              {request.exactAddress && (
                <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{request.exactAddress}</span>
                </div>
              )}
            </div>

            {request.ownerResponseNote && (
              <p className="text-xs italic text-slate-500 dark:text-slate-400 border-t border-emerald-200/50 dark:border-emerald-900/40 pt-2">
                “{request.ownerResponseNote}”
              </p>
            )}
          </div>
        )}

        {/* Rejected → reason */}
        {request.status === "rejected" && request.ownerResponseNote && (
          <div className="mx-4 mb-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 p-3">
            <p className="text-xs text-rose-700 dark:text-rose-400">
              <span className="font-bold">Reason:</span>{" "}
              {request.ownerResponseNote}
            </p>
          </div>
        )}

        {/* Pending → cancel */}
        {isPending && (
          <div className="border-t border-slate-100 dark:border-slate-800">
            <ConfirmDialog
              title="Cancel this request?"
              description="The owner will no longer see this request. You can always send a new one later."
              confirmLabel="Cancel request"
              destructive
              onConfirm={() => onCancel(request.id)}
              trigger={
                <button className="w-full py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors uppercase tracking-wider">
                  Cancel request
                </button>
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
