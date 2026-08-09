"use client";

import React, { useState, useEffect } from "react";
import {
  EquipmentListing,
  ListingStatus,
  OwnerUtilization,
  RentRequest,
} from "@/types/marketplace";
import { ListingCard } from "./ListingCard";
import { ListingCardSkeleton } from "./ListingCardSkeleton";
import { CreateListingModal } from "../listing-wizard/CreateListingModal";
import {
  archiveListing,
  getMyDrafts,
  getMyListings,
  unarchiveListing,
} from "@/lib/services/marketplace.service";
import {
  getReceivedRentRequests,
  acceptRentRequest,
  rejectRentRequest,
  getOwnerUtilization,
} from "@/lib/services/rent-request.service";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  PlusCircle,
  Inbox,
  Calendar,
  User,
  CreditCard,
  ChevronRight,
  AlertCircle,
  Loader2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface OwnerViewProps {
  listings?: EquipmentListing[];
}

// Owner inventory filter tabs. Maps a tab to the query the backend expects.
type InventoryFilter =
  | "all"
  | "active"
  | "pending_review"
  | "rejected"
  | "archived";

const FILTERS: { key: InventoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Approved" },
  { key: "pending_review", label: "In Review" },
  { key: "rejected", label: "Rejected" },
  { key: "archived", label: "Archived" },
];

export function OwnerView({ listings = [] }: OwnerViewProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<EquipmentListing[]>([]);
  const [activeListings, setActiveListings] = useState<EquipmentListing[]>(listings);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeId, setResumeId] = useState<string | undefined>();
  const [filter, setFilter] = useState<InventoryFilter>("all");
  const [requests, setRequests] = useState<RentRequest[]>([]);
  const [utilization, setUtilization] = useState<OwnerUtilization | null>(null);

  const fetchRequests = () => {
    getReceivedRentRequests()
      .then(setRequests)
      .catch(() => {});
  };

  const fetchUtilization = () => {
    getOwnerUtilization()
      .then(setUtilization)
      .catch(() => {});
  };

  useEffect(() => {
    fetchRequests();
    fetchUtilization();
  }, []);

  const fetchListings = (current: InventoryFilter) => {
    setIsLoading(true);
    const params =
      current === "all"
        ? undefined
        : current === "archived"
          ? { archived: true }
          : { status: current as ListingStatus };
    getMyListings(params)
      .then(setActiveListings)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getMyDrafts().then(setDrafts).catch(() => {});
  }, []);

  useEffect(() => {
    fetchListings(filter);
  }, [filter]);

  const handleArchive = async (id: string) => {
    await archiveListing(id);
    fetchListings(filter);
  };

  const handleUnarchive = async (id: string) => {
    await unarchiveListing(id);
    fetchListings(filter);
  };

  const handleCreateNew = () => {
    setResumeId(undefined);
    setIsCreateModalOpen(true);
  };

  const handleResume = (id: string) => {
    setResumeId(id);
    setIsCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    getMyDrafts().then(setDrafts).catch(() => {});
    // A just-submitted listing leaves drafts and enters the inventory.
    fetchListings(filter);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <CreateListingModal
        isOpen={isCreateModalOpen}
        onClose={handleModalClose}
        resumeListingId={resumeId}
        onSuccess={() => {}}
      />

      {/* Listings Section (Main Area) */}
      <section className="xl:col-span-8 space-y-6">
        {drafts.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm font-semibold text-amber-900">Resume your listing</p>
                <p className="text-xs text-amber-700">You have {drafts.length} draft{drafts.length > 1 ? 's' : ''} saved.</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-amber-200" onClick={() => handleResume(drafts[0].id)}>
              Resume
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">
              Your Inventory
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage and track your equipment performance.
            </p>
          </div>
          <Button onClick={handleCreateNew} className="bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Listing
          </Button>
        </div>

        {/* Status filter tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "px-3.5 h-8 rounded-full text-xs font-semibold border transition-all",
                filter === f.key
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                  : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-300 hover:text-emerald-700",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <ListingCardSkeleton key={i} />
            ))}
          </div>
        ) : activeListings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                variant="owner"
                onArchive={handleArchive}
                onUnarchive={handleUnarchive}
              />
            ))}
          </div>
        ) : filter !== "all" ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed bg-slate-50/50 dark:bg-slate-900/20">
            <div className="h-16 w-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mb-4">
              <Inbox className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold">Nothing here</h3>
            <p className="text-muted-foreground max-w-xs text-center">
              No{" "}
              {FILTERS.find((f) => f.key === filter)?.label.toLowerCase()}{" "}
              listings right now.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed bg-slate-50/50 dark:bg-slate-900/20">
            <div className="h-16 w-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mb-4">
              <PlusCircle className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold">Ready to start earning?</h3>
            <p className="text-muted-foreground mb-6 max-w-xs text-center">
              Turn your idle machinery into steady income by listing them on the
              marketplace.
            </p>
            <Button
              variant="outline"
              className="border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
              onClick={handleCreateNew}
            >
              Create First Listing
            </Button>
          </div>
        )}
      </section>

      {/* Requests Section (Sidebar) */}
      <section className="xl:col-span-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight">
              Rental Requests
            </h2>
            <Badge
              variant="secondary"
              className="rounded-full px-2 h-5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            >
              {requests.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-emerald-600"
          >
            View All <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                onAccept={async (note) => {
                  await acceptRentRequest(req.id, note);
                  toast.success("Request accepted");
                  fetchRequests();
                  fetchUtilization();
                }}
                onReject={async (note) => {
                  await rejectRentRequest(req.id, note);
                  toast.success("Request declined");
                  fetchRequests();
                }}
              />
            ))
          ) : (
            <Card className="bg-slate-50 border-dashed dark:bg-slate-900/50 overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Inbox className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  No pending requests at the moment.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Check back later for new opportunities.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Utilization insight — real fleet occupancy this month */}
        <UtilizationCard data={utilization} />
      </section>
    </div>
  );
}

/** Real fleet occupancy for the current month (booked ÷ available days). */
function UtilizationCard({ data }: { data: OwnerUtilization | null }) {
  if (!data) {
    return (
      <Card className="border-none bg-indigo-600 text-white shadow-lg overflow-hidden relative">
        <CardContent className="p-6 space-y-4 relative z-10">
          <div className="h-3 w-32 bg-white/20 rounded animate-pulse" />
          <div className="h-8 w-40 bg-white/20 rounded animate-pulse" />
          <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  const {
    occupancyRate,
    changePoints,
    bookedDays,
    availableDays,
    activeListings,
  } = data;
  const up = changePoints > 0;
  const flat = changePoints === 0;

  return (
    <Card className="border-none bg-indigo-600 text-white shadow-lg overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
        <CreditCard className="h-20 w-20" />
      </div>
      <CardContent className="p-6 space-y-4 relative z-10">
        <h4 className="text-sm font-semibold text-indigo-100 uppercase tracking-wider">
          Utilization Insight
        </h4>

        {activeListings === 0 ? (
          <>
            <p className="text-2xl font-bold">No active listings</p>
            <p className="text-xs text-indigo-100/80 leading-relaxed">
              Publish equipment to start tracking how much of your fleet is
              booked each month.
            </p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">{occupancyRate}% Utilization</p>
            <div className="flex items-center gap-1.5 text-xs text-indigo-100">
              {!flat &&
                (up ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                ))}
              <span>
                {flat
                  ? "Flat vs last month"
                  : `${up ? "Up" : "Down"} ${Math.abs(changePoints)} pts vs last month`}
              </span>
            </div>
            <p className="text-xs text-indigo-100/80 leading-relaxed">
              {bookedDays} of {availableDays} available equipment-days booked
              this month
              {occupancyRate < 50
                ? " — accepting more requests lifts this."
                : "."}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function RequestCard({
  request,
  onAccept,
  onReject,
}: {
  request: RentRequest;
  onAccept: (note?: string) => Promise<void>;
  onReject: (note?: string) => Promise<void>;
}) {
  const statusColors: Record<string, string> = {
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    accepted:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    rejected:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    cancelled:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    completed:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };

  const renterName =
    [request.renter?.firstName, request.renter?.lastName]
      .filter(Boolean)
      .join(" ") || "Renter";
  const requestedOn = new Date(request.createdAt).toLocaleDateString();
  const isPending = request.status === "pending";

  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow group">
      <CardContent className="p-0">
        <div className="p-4 space-y-4">
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
                    className={`h-4 px-1.5 text-[9px] uppercase font-bold border-none ${statusColors[request.status] ?? ""}`}
                  >
                    {request.status}
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
        </div>

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

/** Reject dialog with an optional reason note shared with the renter. */
function RejectRequestDialog({
  onReject,
}: {
  onReject: (note?: string) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const handleReject = async () => {
    setBusy(true);
    try {
      await onReject(note.trim() || undefined);
      setOpen(false);
      setNote("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !busy && setOpen(v)}>
      <DialogTrigger asChild>
        <button className="py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors uppercase tracking-wider">
          Reject
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Decline this request?</DialogTitle>
          <DialogDescription>
            The renter will be notified. You can add a short reason (optional).
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Reason (optional) — e.g. already booked for those dates"
          rows={3}
          maxLength={1000}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={busy}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={busy}
          >
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
