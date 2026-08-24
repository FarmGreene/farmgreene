"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Inbox } from "lucide-react";
import { RentRequest, RentRequestStatus } from "@/types/marketplace";
import {
  useReceivedRentRequests,
  useAcceptRentRequest,
  useRejectRentRequest,
} from "@/lib/hooks/useRentRequests";
import { RequestCard } from "@/components/marketplace/dashboard/RequestCard";
import { RentRequestDetailSheet } from "@/components/marketplace/dashboard/RentRequestDetailSheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useHasRole } from "@/lib/store/useRoleHooks";

type FilterTab = "all" | RentRequestStatus;

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
  { key: "cancelled", label: "Cancelled" },
  { key: "completed", label: "Completed" },
];

export default function OwnerRentalsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isOwner = useHasRole("OWNER");

  // Owner-only page — bounce anyone else back to the marketplace. Only fires
  // once the auth store has actually resolved a user, so it doesn't redirect
  // during the brief window before auth hydrates.
  useEffect(() => {
    if (user && !isOwner) {
      router.replace("/dashboard/marketplace");
    }
  }, [user, isOwner, router]);

  const { data: requests = [], isLoading } = useReceivedRentRequests();
  const acceptMutation = useAcceptRentRequest();
  const rejectMutation = useRejectRentRequest();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const selected = requests.find((r) => r.id === selectedRequestId) ?? null;

  if (!user || !isOwner) return null;

  const byStatus = useMemo(() => {
    const grouped: Record<FilterTab, RentRequest[]> = {
      all: requests,
      pending: [],
      accepted: [],
      rejected: [],
      cancelled: [],
      completed: [],
    };
    for (const r of requests) grouped[r.status].push(r);
    return grouped;
  }, [requests]);

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Rental Requests</h1>
        <p className="text-sm text-muted-foreground">
          Every request received across your listings — who&apos;s renting,
          when, and what it&apos;s worth.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <EmptyState />
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-slate-100/50 dark:bg-slate-900/50 p-1">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="text-xs font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-xs"
              >
                {tab.label}
                <span className="ml-1.5 text-[10px] text-muted-foreground">
                  {byStatus[tab.key].length}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((tab) => (
            <TabsContent key={tab.key} value={tab.key} className="mt-4">
              {byStatus[tab.key].length === 0 ? (
                <EmptyState label={`No ${tab.key === "all" ? "" : tab.label.toLowerCase() + " "}requests`} />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {byStatus[tab.key].map((req) => (
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
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}

      <RentRequestDetailSheet
        request={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelectedRequestId(null)}
      />
    </div>
  );
}

function EmptyState({ label = "No pending requests at the moment" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed bg-slate-50/50 dark:bg-slate-900/20">
      <div className="h-16 w-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mb-4">
        <Inbox className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-muted-foreground max-w-xs text-center">
        Check back later for new opportunities.
      </p>
    </div>
  );
}
