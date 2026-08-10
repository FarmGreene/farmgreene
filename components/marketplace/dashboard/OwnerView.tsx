"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  EquipmentListing,
  ListingStatus,
  RentRequest,
  RentRequestStatus,
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
  useReceivedRentRequests,
  useOwnerUtilization,
  useAcceptRentRequest,
  useRejectRentRequest,
} from "@/lib/hooks/useRentRequests";
import { RequestCard } from "./RequestCard";
import { RentRequestDetailSheet } from "./RentRequestDetailSheet";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlusCircle,
  Inbox,
  CreditCard,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { OwnerUtilization } from "@/types/marketplace";

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

// Sidebar shows the most relevant few; the full queue lives on the dedicated page.
const SIDEBAR_REQUESTS_SHOWN = 4;
const STATUS_ORDER: Record<RentRequestStatus, number> = {
  pending: 0,
  accepted: 1,
  completed: 2,
  rejected: 3,
  cancelled: 4,
};

export function OwnerView({ listings = [] }: OwnerViewProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<EquipmentListing[]>([]);
  const [activeListings, setActiveListings] = useState<EquipmentListing[]>(listings);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeId, setResumeId] = useState<string | undefined>();
  const [filter, setFilter] = useState<InventoryFilter>("all");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const { data: requests = [] } = useReceivedRentRequests();
  const { data: utilization } = useOwnerUtilization();
  const acceptMutation = useAcceptRentRequest();
  const rejectMutation = useRejectRentRequest();

  const sidebarRequests = useMemo(
    () =>
      [...requests]
        .sort((a, b) => {
          const s = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
          if (s !== 0) return s;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
        .slice(0, SIDEBAR_REQUESTS_SHOWN),
    [requests],
  );

  const selectedRequest = requests.find((r) => r.id === selectedRequestId) ?? null;

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
            asChild
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-emerald-600"
          >
            <Link href="/dashboard/marketplace/rentals">
              View All <ChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          {sidebarRequests.length > 0 ? (
            sidebarRequests.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                onOpen={(r) => setSelectedRequestId(r.id)}
                onAccept={async (note) => {
                  await acceptMutation.mutateAsync({ id: req.id, note });
                  toast.success("Request accepted");
                }}
                onReject={async (note) => {
                  await rejectMutation.mutateAsync({ id: req.id, note });
                  toast.success("Request declined");
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
        <UtilizationCard data={utilization ?? null} />
      </section>

      <RentRequestDetailSheet
        request={selectedRequest}
        open={!!selectedRequest}
        onOpenChange={(open) => !open && setSelectedRequestId(null)}
      />
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

