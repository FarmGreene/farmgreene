"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AssignmentContextBanner } from "@/components/dashboard/agent/AssignmentContextBanner";
import { UpdatePriceForm } from "@/components/dashboard/agent/UpdatePriceForm";
import { useAssignment } from "@/lib/hooks/useAssignments";
import { AlertTriangle } from "lucide-react";

// ─── Form skeleton ────────────────────────────────────────────────────────────

function FormSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  );
}

// ─── Inner page (needs suspense boundary for useSearchParams) ─────────────────

function UpdatePricesInner({
  commodityId,
}: {
  commodityId: string;
}) {
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get("assignmentId") ?? "";
  const market = searchParams.get("market") ?? "";

  const {
    data: assignment,
    isLoading: assignmentLoading,
    isError: assignmentError,
  } = useAssignment(assignmentId);

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full pb-10 pt-4 px-0 md:px-4 space-y-6">
      {/* Page title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold tracking-tight">
          Submit Price Report
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Enter the current market price you observed today.
        </p>
      </motion.div>

      {/* Assignment context banner */}
      <AssignmentContextBanner
        assignment={assignmentError ? null : assignment}
        isLoading={!!assignmentId && assignmentLoading}
        market={market}
      />

      {/* Error loading assignment (non-blocking) */}
      {assignmentError && assignmentId && (
        <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg px-4 py-3">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            Could not load assignment details. You can still submit a price
            below.
          </span>
        </div>
      )}

      {/* Form card */}
      <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
        {/* Accent top border */}
        <div className="h-1 bg-linear-to-r from-primary to-primary/30" />

        <CardHeader className="pb-0 px-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base">Price Entry</h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
              {new Date().toLocaleDateString("en-NG", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-6">
          {!commodityId ? (
            // No commodityId — can't submit
            <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
              <AlertTriangle className="w-10 h-10 text-amber-500 opacity-70" />
              <div>
                <p className="font-semibold">Missing commodity context</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                  Please navigate here from your assignments list to submit a
                  price.
                </p>
              </div>
            </div>
          ) : assignmentLoading ? (
            <FormSkeleton />
          ) : (
            <UpdatePriceForm
              commodityId={commodityId}
              defaultMarket={market}
              assignment={assignmentError ? null : assignment}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function UpdatePricesPage({
  params,
}: {
  params: Promise<{ commodityId: string }>;
}) {
  const { commodityId } = React.use(params);

  return (
    <Suspense
      fallback={
        <div className="flex-1 max-w-2xl mx-auto w-full pb-10 pt-4 space-y-6">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-[420px] w-full rounded-2xl" />
        </div>
      }
    >
      <UpdatePricesInner commodityId={commodityId} />
    </Suspense>
  );
}
