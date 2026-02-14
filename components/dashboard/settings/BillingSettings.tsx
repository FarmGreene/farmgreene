"use client";

import React from "react";
import { CreditCard, CheckCircle2, Download, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
  { id: "INV-001", date: "Jan 1, 2026", amount: "₦15,000", status: "Paid" },
  { id: "INV-002", date: "Dec 1, 2025", amount: "₦15,000", status: "Paid" },
  { id: "INV-003", date: "Nov 1, 2025", amount: "₦15,000", status: "Paid" },
];

export default function BillingSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Plan */}
        <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardDescription className="text-emerald-700 dark:text-emerald-400 font-medium">
                  Current Plan
                </CardDescription>
                <CardTitle className="text-2xl font-bold text-emerald-900 dark:text-white mt-1">
                  Pro Plan
                </CardTitle>
              </div>
              <Badge className="bg-emerald-600 hover:bg-emerald-700">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              ₦15,000{" "}
              <span className="text-sm font-medium text-slate-500">
                / month
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Unlimited Watchlists</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Advanced AI Reporting</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Priority Email Support</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Upgrade Plan
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white dark:bg-transparent"
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>

        {/* Usage Stats */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Usage this month
            </CardTitle>
            <CardDescription>Resets on Feb 1, 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">AI Reports Generated</span>
                <span className="text-slate-500">45 / 100</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">SMS Alerts</span>
                <span className="text-slate-500">12 / 50</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Team Seats</span>
                <span className="text-slate-500">3 / 5</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-16 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-slate-500" />
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Visa ending in 4242
              </p>
              <p className="text-sm text-slate-500">Expires 12/28</p>
            </div>
          </div>
          <Button variant="outline">Edit</Button>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Invoice History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200"
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4 text-slate-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
