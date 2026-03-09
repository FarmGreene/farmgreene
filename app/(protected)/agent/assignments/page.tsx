"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "lucide-react";
import Link from "next/link";
import { AgentAssignmentCard } from "@/components/dashboard/agent/AgentAssignmentCard";
import { useAssignments } from "@/lib/hooks/useAssignments";
import type { Assignment } from "@/lib/services/assignment.service";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function categoriseAssignments(assignments: Assignment[]) {
  const today = getToday();
  const dueToday: Assignment[] = [];
  const overdue: Assignment[] = [];
  const completed: Assignment[] = [];
  const upcoming: Assignment[] = [];

  for (const a of assignments) {
    if (a.status === "SUBMITTED") {
      completed.push(a);
    } else if (a.dueDate < today) {
      overdue.push(a);
    } else if (a.dueDate === today) {
      dueToday.push(a);
    } else {
      upcoming.push(a);
    }
  }

  return { dueToday, overdue, completed, upcoming };
}

// ─── Summary Cards ────────────────────────────────────────────────────────────

interface SummaryCardProps {
  label: string;
  count: number;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  active?: boolean;
  onClick?: () => void;
}

function SummaryCard({
  label,
  count,
  icon: Icon,
  colorClass,
  bgClass,
  active,
  onClick,
}: SummaryCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 min-w-[130px] text-left rounded-xl p-4 border transition-all duration-200 group",
        "hover:shadow-md cursor-pointer",
        active
          ? "shadow-md ring-2 ring-offset-1 " +
              colorClass.replace("text-", "ring-")
          : "bg-card border-border/60 hover:border-border",
      )}
    >
      <div className={cn("p-2 rounded-lg w-fit mb-3", bgClass)}>
        <Icon className={cn("w-4 h-4", colorClass)} />
      </div>
      <p className="text-2xl font-bold tabular-nums">{count}</p>
      <p className="text-xs text-muted-foreground font-medium mt-0.5">
        {label}
      </p>
    </button>
  );
}

// ─── Status Badge (table version) ────────────────────────────────────────────

function TableStatusBadge({ status }: { status: Assignment["status"] }) {
  const cfg = {
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    SUBMITTED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    MISSED: "bg-red-100 text-red-700 border-red-200",
  }[status];
  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border",
        cfg,
      )}
    >
      {status === "SUBMITTED"
        ? "Completed"
        : status === "MISSED"
          ? "Missed"
          : "Due"}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type FilterStatus = "ALL" | "PENDING" | "SUBMITTED" | "MISSED";

export default function AssignmentsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [marketFilter, setMarketFilter] = useState("all");
  const [frequencyFilter, setFrequencyFilter] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data, isLoading, isError, refetch } = useAssignments({ limit: 100 });
  const assignments = data?.data ?? [];

  const { dueToday, overdue, completed, upcoming } = useMemo(
    () => categoriseAssignments(assignments),
    [assignments],
  );

  // Unique markets for filter dropdown
  const markets = useMemo(() => {
    const set = new Set(
      assignments.map((a) => a.marketName).filter(Boolean) as string[],
    );
    return Array.from(set);
  }, [assignments]);

  // Filtered + searched assignments
  const filtered = useMemo(() => {
    let list = assignments;

    if (activeFilter !== "ALL") {
      if (activeFilter === "PENDING") {
        const today = getToday();
        list = list.filter((a) => a.status === "PENDING" && a.dueDate >= today);
      } else {
        list = list.filter((a) => a.status === activeFilter);
      }
    }
    if (marketFilter !== "all") {
      list = list.filter((a) => a.marketName === marketFilter);
    }
    if (frequencyFilter !== "all") {
      list = list.filter((a) => a.frequency === frequencyFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.commodity.name.toLowerCase().includes(q) ||
          (a.marketName ?? "").toLowerCase().includes(q),
      );
    }

    return list;
  }, [assignments, activeFilter, marketFilter, frequencyFilter, searchQuery]);

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
          count={dueToday.length}
          icon={Clock}
          colorClass="text-amber-600"
          bgClass="bg-amber-100 dark:bg-amber-900/20"
          active={activeFilter === "ALL"}
          onClick={() => setActiveFilter("ALL")}
        />
        <SummaryCard
          label="Overdue"
          count={overdue.length}
          icon={AlertTriangle}
          colorClass="text-red-600"
          bgClass="bg-red-100 dark:bg-red-900/20"
          active={activeFilter === "MISSED"}
          onClick={() => setActiveFilter("MISSED")}
        />
        <SummaryCard
          label="Completed"
          count={completed.length}
          icon={CheckCircle2}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-100 dark:bg-emerald-900/20"
          active={activeFilter === "SUBMITTED"}
          onClick={() => setActiveFilter("SUBMITTED")}
        />
        <SummaryCard
          label="Upcoming"
          count={upcoming.length}
          icon={CalendarCheck}
          colorClass="text-blue-600"
          bgClass="bg-blue-100 dark:bg-blue-900/20"
          active={activeFilter === "PENDING"}
          onClick={() => setActiveFilter("PENDING")}
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
        <div className="flex gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by market or commodity…"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <Select
              value={activeFilter}
              onValueChange={(v) => setActiveFilter(v as FilterStatus)}
            >
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
              <Select value={marketFilter} onValueChange={setMarketFilter}>
                <SelectTrigger className="w-[160px]">
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

            <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
              <SelectTrigger className="w-[130px]">
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
            <Select
              value={activeFilter}
              onValueChange={(v) => setActiveFilter(v as FilterStatus)}
            >
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
              <Select value={marketFilter} onValueChange={setMarketFilter}>
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

            <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
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

      {/* ── Empty State ───────────────────────────────────────────────────── */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center gap-4"
        >
          <div className="p-5 rounded-full bg-muted/60">
            <Inbox className="w-10 h-10 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {assignments.length === 0
                ? "No reporting assignments yet"
                : "No assignments match your filters"}
            </p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              {assignments.length === 0
                ? "Your administrator will assign commodities and markets to you."
                : "Try clearing the filters to see all assignments."}
            </p>
          </div>
          {assignments.length === 0 ? (
            <Button variant="outline" asChild>
              <a href="mailto:support@farmgreene.com">Contact Admin</a>
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setActiveFilter("ALL");
                setMarketFilter("all");
                setFrequencyFilter("all");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          )}
        </motion.div>
      )}

      {/* ── Section D: Desktop Table ──────────────────────────────────────── */}
      {filtered.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="hidden md:block rounded-xl border border-border/60 overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow className="hover:bg-transparent border-b border-border/60">
                    <TableHead className="font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                      Commodity
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                      Market
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Region
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Frequency
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                      Due Date
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                      Countdown
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((assignment, i) => {
                    const isOverdue =
                      assignment.countdown.startsWith("Overdue");
                    const isDueToday = assignment.countdown === "Due today";
                    const submitUrl = `/agent/update-prices?commodityId=${assignment.commodity.id}&market=${encodeURIComponent(assignment.marketName ?? "")}&assignmentId=${assignment.id}`;

                    return (
                      <TableRow
                        key={assignment.id}
                        className={cn(
                          "group transition-colors border-b border-border/40 last:border-0",
                          isOverdue &&
                            "bg-red-50/50 dark:bg-red-950/10 hover:bg-red-50 dark:hover:bg-red-950/20",
                          isDueToday &&
                            "bg-amber-50/50 dark:bg-amber-950/10 hover:bg-amber-50 dark:hover:bg-amber-950/20",
                          !isOverdue && !isDueToday && "hover:bg-muted/30",
                        )}
                      >
                        <TableCell className="py-3.5">
                          <div>
                            <p className="font-medium text-sm">
                              {assignment.commodity.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {assignment.commodity.category}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {assignment.marketName ?? "—"}
                          </span>
                        </TableCell>
                        <TableCell className="py-3.5 text-sm text-muted-foreground">
                          {assignment.region?.replace(/_/g, " ") ?? "—"}
                        </TableCell>
                        <TableCell className="py-3.5">
                          <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-md">
                            {assignment.frequency === "DAILY"
                              ? "Daily"
                              : "Weekly"}
                          </span>
                        </TableCell>
                        <TableCell className="py-3.5 text-sm tabular-nums text-muted-foreground">
                          {new Date(assignment.dueDate).toLocaleDateString(
                            "en-NG",
                            {
                              day: "numeric",
                              month: "short",
                            },
                          )}
                        </TableCell>
                        <TableCell className="py-3.5">
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
                        </TableCell>
                        <TableCell className="py-3.5">
                          <TableStatusBadge status={assignment.status} />
                        </TableCell>
                        <TableCell className="py-3.5">
                          {assignment.status !== "SUBMITTED" ? (
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
                          ) : (
                            <Button
                              asChild
                              size="sm"
                              variant="ghost"
                              className="h-8 text-xs"
                            >
                              <Link
                                href={`/agent/assignments/${assignment.id}`}
                              >
                                View
                              </Link>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
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
        </>
      )}
    </div>
  );
}
