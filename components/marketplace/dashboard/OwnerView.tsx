"use client";

import React, { useState, useEffect } from "react";
import { EquipmentListing, RentalRequest } from "@/types/marketplace";
import { ListingCard } from "./ListingCard";
import { ListingCardSkeleton } from "./ListingCardSkeleton";
import { CreateListingModal } from "../listing-wizard/CreateListingModal";
import { getMyDrafts, getMyListings } from "@/lib/services/marketplace.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlusCircle,
  Inbox,
  Calendar,
  User,
  CreditCard,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OwnerViewProps {
  listings: EquipmentListing[];
  requests: RentalRequest[];
}

export function OwnerView({ listings, requests }: OwnerViewProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<EquipmentListing[]>([]);
  const [activeListings, setActiveListings] = useState<EquipmentListing[]>(listings);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeId, setResumeId] = useState<string | undefined>();

  useEffect(() => {
    getMyDrafts().then(setDrafts).catch(() => {});
    setIsLoading(true);
    getMyListings().then(data => {
      // Filter out drafts since they are shown separately
      setActiveListings(data.filter(l => l.status !== "draft"));
    }).finally(() => setIsLoading(false));
  }, []);

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

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <ListingCardSkeleton key={i} />
            ))}
          </div>
        ) : activeListings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} variant="owner" />
            ))}
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
            requests.map((req) => <RequestCard key={req.id} request={req} />)
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

        {/* Quick Insights (Adds to Premium Feel) */}
        <Card className="border-none bg-indigo-600 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
            <CreditCard className="h-20 w-20" />
          </div>
          <CardContent className="p-6 space-y-4 relative z-10">
            <h4 className="text-sm font-semibold text-indigo-100 uppercase tracking-wider">
              Utilization Insight
            </h4>
            <p className="text-2xl font-bold">92% Utilization</p>
            <p className="text-xs text-indigo-100/80 leading-relaxed">
              Your equipment is performing 15% better than last month. Consider
              adding more listings to capture demand.
            </p>
            <Button
              size="sm"
              variant="secondary"
              className="w-full bg-white/10 hover:bg-white/20 border-none text-white text-xs"
            >
              View Performance Reports
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function RequestCard({ request }: { request: RentalRequest }) {
  const statusColors = {
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    accepted:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    rejected:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  };

  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow group">
      <CardContent className="p-0">
        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <User className="h-5 w-5 text-slate-500" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-sm tracking-tight">
                  {request.requesterName}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                  <Badge
                    variant="outline"
                    className={`h-4 px-1.5 text-[9px] uppercase font-bold border-none ${statusColors[request.status as keyof typeof statusColors]}`}
                  >
                    {request.status}
                  </Badge>
                  <span>•</span>
                  <span>{request.requestDate}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">
                ₦{request.totalPrice.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground font-medium">
                Potential Earn
              </p>
            </div>
          </div>

          <div className="space-y-2 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <div className="h-2 w-2 rounded-full bg-indigo-500" />
              <span className="truncate">{request.equipmentName}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>
                {request.startDate} — {request.endDate}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-slate-100 dark:border-slate-800">
          <button className="py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors uppercase tracking-wider">
            Reject
          </button>
          <button className="py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors border-l border-slate-100 dark:border-slate-800 uppercase tracking-wider">
            Accept
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
