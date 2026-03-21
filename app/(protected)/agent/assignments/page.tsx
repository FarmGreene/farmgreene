"use client";
import React, { useState, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  CalendarCheck,
  Search,
  RefreshCcw,
  ArrowRight,
  Inbox,
  Loader2,
  SlidersHorizontal,
  MapPin,
  CalendarX,
} from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { AgentAssignmentCard } from "@/components/dashboard/agent/AgentAssignmentCard";
import DataTable from "@/components/data-table";
import Pagination from "@/components/pagination/pagination";
import { useAssignments, useAssignmentMetrics } from "@/lib/hooks/useAssignments";
import type { Assignment } from "@/lib/services/assignment.service";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

// ─── Summary Cards ────────────────────────────────────────────────────────────

interface SummaryCardProps {
  label: string;
  count: number;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}

function SummaryCard({
  label,
  count,
  icon: Icon,
  colorClass,
  bgClass,
}: SummaryCardProps) {
  return (
    <div
      className={cn(
        "flex-1 min-w-[130px] text-left rounded-xl p-4 border transition-all duration-200 bg-card border-border/60",
      )}
    >
      <div className={cn("p-2 rounded-lg w-fit mb-3", bgClass)}>
        <Icon className={cn("w-4 h-4", colorClass)} />
      </div>
      <p className="text-2xl font-bold tabular-nums">{count}</p>
      <p className="text-xs text-muted-foreground font-medium mt-0.5">
        {label}
      </p>
    </div>
  );
}

// ── Status Badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Assignment["status"] }) {
  const cfg = {
    PENDING: {
      label: "Due",
      cls: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
      Icon: Clock,
    },
    SUBMITTED: {
      label: "Completed",
      cls: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400",
      Icon: CheckCircle2,
    },
    MISSED: {
      label: "Missed",
      cls: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400",
      Icon: CalendarX,
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border",
        cfg.cls,
      )}
    >
      <cfg.Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type FilterStatus = "ALL" | "PENDING" | "SUBMITTED" | "MISSED";

export default function AssignmentsPage() {
  const [params, setParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(10),
      status: parseAsString.withDefault("ALL"),
      market: parseAsString.withDefault("all"),
      frequency: parseAsString.withDefault("all"),
      search: parseAsString.withDefault(""),
    },
    {
      history: "push",
      shallow: false,
    },
  );

  const { page, limit, status, market, frequency, search } = params;
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      status: status !== "ALL" ? status : undefined,
    }),
    [page, limit, status],
  );

  const { data: metricsData } = useAssignmentMetrics();

  const { data, isLoading, isError, refetch } = useAssignments(queryParams);
  const assignments = data?.data ?? [];
  const meta = data?.meta;

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setParams({ search: e.target.value, page: 1 });
    },
    [setParams],
  );

  const handleStatusFilter = useCallback(
    (v: string) => {
      setParams({ status: v, page: 1 });
    },
    [setParams],
  );

  const handleMarketFilter = useCallback(
    (v: string) => {
      setParams({ market: v, page: 1 });
    },
    [setParams],
  );

  const handleFrequencyFilter = useCallback(
    (v: string) => {
      setParams({ frequency: v, page: 1 });
    },
    [setParams],
  );

  const setBatch = useCallback(
    (p: number | ((v: number) => number)) => {
      const newPage = typeof p === "function" ? p(page) : p;
      setParams({ page: newPage });
    },
    [page, setParams],
  );

  const setLimit = useCallback(
    (l: number | ((v: number) => number)) => {
      const newLimit = typeof l === "function" ? l(limit) : l;
      setParams({ limit: newLimit, page: 1 });
    },
    [limit, setParams],
  );

  // Unique markets for filter dropdown
  const markets = useMemo(() => {
    const set = new Set(
      assignments.map((a) => a.marketName).filter(Boolean) as string[],
    );
    return Array.from(set);
  }, [assignments]);

  // Client-side filtering for market and frequency (if not handled by API)
  const filtered = useMemo(() => {
    let list = assignments;

    if (market !== "all") {
      list = list.filter((a) => a.marketName === market);
    }
    if (frequency !== "all") {
      list = list.filter((a) => a.frequency === frequency);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.commodity.name.toLowerCase().includes(q) ||
          (a.marketName ?? "").toLowerCase().includes(q),
      );
    }

    return list;
  }, [assignments, market, frequency, search]);

  const columns: ColumnDef<Assignment>[] = useMemo(
    () => [
      {
        accessorKey: "commodity",
        header: "Commodity",
        cell: ({ row }) => {
          const assignment = row.original;
          return (
            <div>
              <p className="font-medium text-sm">{assignment.commodity.name}</p>
              {assignment.commodity.category && (
                <p className="text-xs text-muted-foreground">
                  {assignment.commodity.category
                    .replaceAll("_", " ")
                    .toLowerCase()}
                </p>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "marketName",
        header: "Market",
        cell: ({ row }) => (
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-3 h-3 shrink-0" />
            {row.original.marketName ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "region",
        header: "Region",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground uppercase opacity-80">
            {row.original.region?.replace(/_/g, " ") ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "frequency",
        header: "Frequency",
        cell: ({ row }) => (
          <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-md">
            {row.original.frequency === "DAILY" ? "Daily" : "Weekly"}
          </span>
        ),
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => (
          <span className="text-sm tabular-nums text-muted-foreground">
            {new Date(row.original.dueDate).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
            })}
          </span>
        ),
      },
      {
        id: "countdown",
        header: "Countdown",
        cell: ({ row }) => {
          const assignment = row.original;
          const isOverdue = assignment.countdown.startsWith("Overdue");
          const isDueToday = assignment.countdown === "Due today";
          return (
            <span
              className={cn(
                "text-xs font-semibold",
                isOverdue
                  ? "text-red-600 dark:text-red-400"
                  : isDueToday
                    ? "text-amber-600 dark:text-amber-400"
                    : assignment.status === "SUBMITTED"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-muted-foreground",
              )}
            >
              {assignment.countdown}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
          const assignment = row.original;
          const isOverdue = assignment.countdown.startsWith("Overdue");
          const submitUrl = `/agent/assignments/${assignment.commodity.id}?assignmentId=${assignment.id}&market=${encodeURIComponent(assignment.marketName ?? "")}`;

          if (assignment.status !== "SUBMITTED") {
            return (
              <Button
                asChild
                size="sm"
                className={cn(
                  "h-8 text-xs gap-1.5",
                  isOverdue
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white",
                )}
              >
                <Link href={submitUrl}>
                  Submit
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            );
          }
          return (
            <Button asChild size="sm" variant="ghost" className="h-8 text-xs">
              <Link href={`/agent/assignments/${assignment.id}`}>View</Link>
            </Button>
          );
        },
      },
    ],
    [],
  );

  // ── Render loading ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm">Loading your assignments…</p>
        </div>
      </div>
    );
  }

  // ── Render error ───────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              Unable to load assignments
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Please check your connection and try again.
            </p>
          </div>
          <Button variant="outline" onClick={() => refetch()} className="gap-2">
            <RefreshCcw className="w-4 h-4" /> Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 w-full pb-10 pt-4">
      {/* ── Section A: Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            View and manage your reporting responsibilities.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="gap-2 self-start sm:self-auto"
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* ── Section B: Summary Cards ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar"
      >
        <SummaryCard
          label="Due Today"
          count={metricsData?.dueToday ?? 0}
          icon={Clock}
          colorClass="text-amber-600"
          bgClass="bg-amber-100 dark:bg-amber-900/20"
        />
        <SummaryCard
          label="Overdue"
          count={metricsData?.overdue ?? 0}
          icon={AlertTriangle}
          colorClass="text-red-600"
          bgClass="bg-red-100 dark:bg-red-900/20"
        />
        <SummaryCard
          label="Completed"
          count={metricsData?.completed ?? 0}
          icon={CheckCircle2}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-100 dark:bg-emerald-900/20"
        />
        <SummaryCard
          label="Upcoming"
          count={metricsData?.upcoming ?? 0}
          icon={CalendarCheck}
          colorClass="text-blue-600"
          bgClass="bg-blue-100 dark:bg-blue-900/20"
        />
      </motion.div>

      {/* ── Section C: Filters ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="space-y-3"
      >
        {/* Search + mobile filter toggle row */}
        <div className="flex gap-2 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by market or commodity…"
              className="pl-9"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileFilters((p) => !p)}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>

          {/* Desktop filters inline */}
          <div className="hidden md:flex gap-2">
            <Select value={status} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="PENDING">Due Today</SelectItem>
                <SelectItem value="SUBMITTED">Completed</SelectItem>
                <SelectItem value="MISSED">Missed</SelectItem>
              </SelectContent>
            </Select>

            {markets.length > 0 && (
              <Select value={market} onValueChange={handleMarketFilter}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Markets</SelectItem>
                  {markets.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Select value={frequency} onValueChange={handleFrequencyFilter}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frequencies</SelectItem>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile filters dropdown */}
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2 md:hidden"
          >
            <Select value={status} onValueChange={handleStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="PENDING">Due Today / Upcoming</SelectItem>
                <SelectItem value="SUBMITTED">Completed</SelectItem>
                <SelectItem value="MISSED">Missed</SelectItem>
              </SelectContent>
            </Select>

            {markets.length > 0 && (
              <Select value={market} onValueChange={handleMarketFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Markets</SelectItem>
                  {markets.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Select value={frequency} onValueChange={handleFrequencyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frequencies</SelectItem>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        )}

        {/* Result count */}
        <p className="text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          assignment{filtered.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="hidden md:block rounded-xl border border-border/60 overflow-hidden shadow-sm bg-card"
        >
          <DataTable
            columns={columns}
            data={filtered}
            loading={isLoading}
            emptyMessage="No assignments found matching your search."
          />
        </motion.div>

        {/* ── Section E: Mobile Cards ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
          {filtered.map((assignment, i) => (
            <AgentAssignmentCard
              key={assignment.id}
              assignment={assignment}
              delay={i * 0.05}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            totalLength={meta?.total ?? 0}
            batch={page}
            setBatch={setBatch}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      </>
    </div>
  );
}
