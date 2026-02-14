"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Receipt,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Calendar,
  ChevronRight,
  Download,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock Data
const INVOICES = [
  {
    id: "INV-2026-003",
    date: "Feb 12, 2026",
    amount: "$49.00",
    status: "Paid",
  },
  {
    id: "INV-2026-002",
    date: "Jan 12, 2026",
    amount: "$49.00",
    status: "Paid",
  },
  {
    id: "INV-2025-012",
    date: "Dec 12, 2025",
    amount: "$49.00",
    status: "Paid",
  },
];

export default function WorkspaceBilling() {
  return (
    <div className="space-y-8">
      {/* Plan & Method Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Plan Card */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-none font-bold uppercase tracking-widest text-[10px]">
              Active Now
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Your Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Pro <span className="text-emerald-600">Tier</span>
                </div>
                <p className="text-sm font-medium text-slate-500">
                  $49.00 / month • Renewals handled by Stripe
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 dark:border-slate-800">
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> Next Billing
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  March 12, 2026
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <CreditCard className="h-3 w-3" /> Seats Used
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  7 of 10 Seats
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 dark:bg-slate-900/40 flex gap-2">
            <Button
              className="flex-1 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 font-bold text-xs uppercase tracking-widest shadow-sm"
              variant="outline"
            >
              Cancel Plan
            </Button>
            <Button className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 font-bold text-xs uppercase tracking-widest shadow-sm">
              Change Subscription
            </Button>
          </CardFooter>
        </Card>

        {/* Payment Method Card */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 bg-slate-50/50 dark:bg-slate-900/30 p-8 flex flex-col items-center justify-center space-y-4">
            <div className="w-full max-w-[320px] p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 shadow-xl border border-slate-800/50 relative overflow-hidden group">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />

              <div className="flex justify-between items-start mb-10">
                <div className="h-8 w-12 rounded bg-slate-700/50 flex items-center justify-center italic text-slate-500 font-bold text-[10px]">
                  VISA
                </div>
                <CreditCard className="h-6 w-6 text-slate-600" />
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-black">
                  Card ending in
                </p>
                <p className="text-xl font-mono text-white tracking-[0.2em]">
                  •••• •••• •••• 4242
                </p>
              </div>

              <div className="mt-6 flex justify-between items-end">
                <div className="space-y-0.5">
                  <p className="text-[8px] text-slate-500 uppercase font-black">
                    Expiry
                  </p>
                  <p className="text-xs text-white font-bold tracking-widest">
                    08 / 26
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="border-emerald-500/50 text-emerald-400 bg-emerald-500/5 px-2 py-0 text-[10px] font-black uppercase tracking-widest"
                >
                  Primary
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4 pb-6 px-8 flex justify-center">
            <Button
              variant="ghost"
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-600 gap-1.5 transition-all"
            >
              Update Payment Method <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Invoice History */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-slate-400" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
            Invoice History
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6 w-[30%] font-bold text-[10px] uppercase tracking-widest text-slate-400">
                  Invoice ID
                </TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-400">
                  Billing Date
                </TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-400">
                  Amount
                </TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-slate-400">
                  Status
                </TableHead>
                <TableHead className="text-right pr-6 font-bold text-[10px] uppercase tracking-widest text-slate-400">
                  Download
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((inv) => (
                <TableRow
                  key={inv.id}
                  className="border-slate-100 dark:border-slate-900 group"
                >
                  <TableCell className="pl-6 font-bold text-slate-900 dark:text-white text-sm">
                    {inv.id}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-slate-500">
                    {inv.date}
                  </TableCell>
                  <TableCell className="text-sm font-black text-slate-900 dark:text-white">
                    {inv.amount}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-none font-black text-[10px] px-2 py-0 uppercase">
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Enterprise CTA */}
      <div className="p-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col md:flex-row gap-8 items-center justify-between border-4 border-slate-800 dark:border-slate-100 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all duration-1000" />

        <div className="space-y-2 relative z-10 text-center md:text-left">
          <h3 className="text-2xl font-black tracking-tight leading-none">
            Need global scale?
          </h3>
          <p className="text-slate-400 dark:text-slate-500 max-w-md font-medium">
            Upgrade to **Enterprise** for custom billing, unlimited team seats,
            dedicated account management, and SSO integration.
          </p>
        </div>
        <Button className="h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white border-none font-black text-sm uppercase tracking-widest shadow-xl group-hover:scale-105 transition-all relative z-10 shrink-0">
          Contact Sales <ArrowUpRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
