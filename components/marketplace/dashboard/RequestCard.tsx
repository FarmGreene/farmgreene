"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Calendar, User } from "lucide-react";
import { RentRequest } from "@/types/marketplace";
import { RENT_REQUEST_STATUS_META } from "@/lib/marketplace/rent-request-meta";
import { RejectRequestDialog } from "./RejectRequestDialog";

export function RequestCard({
  request,
  onAccept,
  onReject,
  onOpen,
}: {
  request: RentRequest;
  onAccept: (note?: string) => Promise<void>;
  onReject: (note?: string) => Promise<void>;
  onOpen: (request: RentRequest) => void;
}) {
  const meta = RENT_REQUEST_STATUS_META[request.status];
  const renterName =
    [request.renter?.firstName, request.renter?.lastName]
      .filter(Boolean)
      .join(" ") || "Renter";
  const requestedOn = new Date(request.createdAt).toLocaleDateString();
  const isPending = request.status === "pending";

  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow group">
      <CardContent className="p-0">
        <button
          type="button"
          onClick={() => onOpen(request)}
          className="w-full text-left p-4 space-y-4 cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 overflow-hidden">
                {request.renter?.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={request.renter.avatarUrl}
                    alt={renterName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-slate-500" />
                )}
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-sm tracking-tight">{renterName}</p>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                  <Badge
                    variant="outline"
                    className={`h-4 px-1.5 text-[9px] uppercase font-bold border-none ${meta.badgeClassName}`}
                  >
                    {meta.label}
                  </Badge>
                  <span>•</span>
                  <span>{requestedOn}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">
                ₦{Number(request.estimatedTotal).toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground font-medium">
                Est. Earn
              </p>
            </div>
          </div>

          <div className="space-y-2 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <div className="h-2 w-2 rounded-full bg-indigo-500" />
              <span className="truncate">
                {request.listing?.name ?? "Equipment"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>
                {request.startDate} — {request.endDate} ({request.rentalDays}d)
              </span>
            </div>
            {request.message && (
              <p className="text-[11px] text-slate-600 dark:text-slate-300 italic leading-snug">
                “{request.message}”
              </p>
            )}
          </div>
        </button>

        {isPending && (
          <div className="grid grid-cols-2 border-t border-slate-100 dark:border-slate-800">
            <RejectRequestDialog onReject={onReject} />
            <ConfirmDialog
              title="Accept this request?"
              description="The renter will be notified and your contact details shared with them so you can coordinate handover."
              confirmLabel="Accept"
              onConfirm={() => onAccept()}
              trigger={
                <button className="py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors border-l border-slate-100 dark:border-slate-800 uppercase tracking-wider">
                  Accept
                </button>
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
