"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Loader2,
  MapPin,
  CircleDashed,
} from "lucide-react";
import Link from "next/link";
import { useAssignments } from "@/lib/hooks/useAssignments";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export function AgentUpcomingAssignments() {
  const today = new Date().toISOString().slice(0, 10);
  const { data, isLoading } = useAssignments({
    fromDate: today,
    limit: 10,
  });
  const assignments = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="border-0 shadow-sm overflow-hidden bg-background/40 backdrop-blur-sm ring-1 ring-white/10">
        <CardHeader className="pb-3 border-b border-white/5 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-xl text-primary">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold tracking-tight">
                  Upcoming Assignments
                </CardTitle>
                <p className="text-xs text-muted-foreground/70">
                  Next {assignments.length} planned mission{assignments.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs font-bold text-primary hover:text-primary hover:bg-primary/10 transition-colors group"
            >
              <Link href="/agent/assignments" className="flex items-center">
                View All{" "}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
                <p className="text-xs font-medium text-muted-foreground animate-pulse">
                  Tuning frequencies...
                </p>
              </div>
            </div>
          ) : assignments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center px-6">
              <div className="bg-emerald-500/10 p-4 rounded-full">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-bold">You&apos;re ahead of schedule!</p>
                <p className="text-xs text-muted-foreground max-w-[200px] mt-1">
                  No upcoming assignments found. Check back later for new missions.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-white/5">
                    <TableHead className="w-[120px] pl-6 text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">
                      Scheduled Date
                    </TableHead>
                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">
                      Commodity
                    </TableHead>
                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">
                      Market / Region
                    </TableHead>
                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">
                      Status
                    </TableHead>
                    <TableHead className="text-right pr-6 text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment, index) => {
                    const isOverdue = assignment.countdown.startsWith("Overdue");
                    const isCompleted = assignment.status === "SUBMITTED";
                    const submitUrl = `/agent/assignments/${assignment.commodity.id}?assignmentId=${assignment.id}&market=${encodeURIComponent(assignment.marketName ?? "")}`;

                    return (
                      <TableRow key={assignment.id} className="group border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="pl-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold truncate">
                              {format(new Date(assignment.dueDate), "MMM d, yyyy")}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0" />
                             <span className="text-sm font-medium">{assignment.commodity.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-xs truncate max-w-[150px]">
                              {assignment.marketName || assignment.region}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight shadow-sm",
                            isCompleted 
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20" 
                              : isOverdue 
                              ? "bg-destructive/10 text-destructive ring-1 ring-destructive/20 animate-pulse" 
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20"
                          )}>
                            {isCompleted ? (
                              <CheckCircle2 size={10} />
                            ) : isOverdue ? (
                              <AlertTriangle size={10} />
                            ) : (
                              <Clock size={10} />
                            )}
                            {isCompleted ? "Completed" : isOverdue ? "Overdue" : "Pending"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                           {!isCompleted ? (
                             <Button
                               asChild
                               variant="ghost"
                               size="sm"
                               className="h-8 px-3 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/20 hover:text-primary rounded-lg"
                             >
                               <Link href={submitUrl}>
                                 Report <ArrowRight className="w-3 h-3 ml-1" />
                               </Link>
                             </Button>
                           ) : (
                             <div className="flex justify-end pr-3">
                               <CheckCircle2 size={16} className="text-emerald-500/40" />
                             </div>
                           )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
