"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Inbox, PackageSearch } from "lucide-react";
import { RentRequest, RentRequestStatus } from "@/types/marketplace";
import {
  getMyRentRequests,
  cancelRentRequest,
} from "@/lib/services/rent-request.service";
import { RenterRequestCard } from "@/components/marketplace/dashboard/RenterRequestCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Actionable first: accepted, then pending, then closed states.
const STATUS_ORDER: Record<RentRequestStatus, number> = {
  accepted: 0,
  pending: 1,
  completed: 2,
  rejected: 3,
  cancelled: 4,
};

export default function RentalsPage() {
  const [requests, setRequests] = useState<RentRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    getMyRentRequests()
      .then(setRequests)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const sorted = useMemo(
    () =>
      [...requests].sort((a, b) => {
        const s = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
        if (s !== 0) return s;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }),
    [requests],
  );

  const counts = useMemo(
    () => ({
      total: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      accepted: requests.filter((r) => r.status === "accepted").length,
    }),
    [requests],
  );

  const handleCancel = async (id: string) => {
    await cancelRentRequest(id);
    toast.success("Request cancelled");
    fetchRequests();
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">My Rentals</h1>
        <p className="text-sm text-muted-foreground">
          Track your rental requests and get the owner&apos;s details once
          they&apos;re accepted.
        </p>
      </div>

      {!loading && requests.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <CountTile label="Total" value={counts.total} />
          <CountTile label="Awaiting response" value={counts.pending} />
          <CountTile label="Accepted" value={counts.accepted} accent />
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed bg-slate-50/50 dark:bg-slate-900/20">
          <div className="h-16 w-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mb-4">
            <Inbox className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold">No rental requests yet</h3>
          <p className="text-muted-foreground mb-6 max-w-xs text-center">
            Browse the marketplace and send a request to rent equipment near
            you.
          </p>
          <Link href="/marketplace">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <PackageSearch className="mr-2 h-4 w-4" />
              Explore marketplace
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {sorted.map((req) => (
            <RenterRequestCard
              key={req.id}
              request={req}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CountTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 px-4 py-3"
          : "rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3"
      }
    >
      <p className="text-xl font-black tracking-tight">{value}</p>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </p>
    </div>
  );
}
