"use client";

import React, { useState } from "react";
import {
  Bell,
  Plus,
  Check,
  TrendingUp,
  TrendingDown,
  Target,
  Mail,
  Smartphone,
  ChevronRight,
  ClockPlus,
  AlarmPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function QuickAlertCreateDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commodity, setCommodity] = useState("");
  const [condition, setCondition] = useState("above");
  const [notifications, setNotifications] = useState({
    inApp: true,
    email: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsOpen(false);

    // Show success toast (mock)
    // In a real app: toast.success("Alert created for " + commodity);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="hidden md:flex gap-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <AlarmPlus className="h-6 w-6 text-slate-500 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400">
            Create Alert
          </span>
        </Button>
      </DialogTrigger>
      {/* Mobile Trigger (Icon Only) */}
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Bell className="h-5 w-5 text-slate-500" />
          <div className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Price Alert</DialogTitle>
            <DialogDescription>
              Get notified immediately when market conditions change.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            {/* Commodity & Region Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="commodity">Commodity</Label>
                <Select value={commodity} onValueChange={setCommodity} required>
                  <SelectTrigger id="commodity" className="w-full">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="soybeans">Soybeans</SelectItem>
                    <SelectItem value="cassava">Cassava</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select defaultValue="lagos">
                  <SelectTrigger id="region" className="w-full">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="kano">Kano</SelectItem>
                    <SelectItem value="kaduna">Kaduna</SelectItem>
                    <SelectItem value="ibadan">Ibadan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Condition Type - Custom Radio Group */}
            <div className="space-y-3">
              <Label>Alert me when price...</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "above", label: "Goes Above", icon: TrendingUp },
                  { id: "below", label: "Drops Below", icon: TrendingDown },
                  { id: "exact", label: "Is Exactly", icon: Target },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = condition === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setCondition(type.id)}
                      className={cn(
                        "cursor-pointer rounded-lg border p-3 flex flex-col items-center justify-center gap-2 transition-all hover:bg-slate-50 dark:hover:bg-slate-800",
                        isSelected
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-500"
                          : "border-slate-200 text-slate-500 dark:border-slate-800",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-[10px] font-medium text-center leading-tight">
                        {type.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <Label htmlFor="price">Target Price</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">
                  ₦
                </div>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  className="pl-7"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500">
                We'll notify you when {commodity ? commodity : "the commodity"}{" "}
                price{" "}
                {condition === "above"
                  ? "exceeds"
                  : condition === "below"
                    ? "falls below"
                    : "reaches"}{" "}
                this amount.
              </p>
            </div>

            {/* Notification Method - Custom Checkboxes */}
            <div className="space-y-3">
              <Label>Notify me via</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={cn(
                      "h-5 w-5 rounded border flex items-center justify-center transition-colors",
                      notifications.inApp
                        ? "bg-emerald-600 border-emerald-600"
                        : "border-slate-300 group-hover:border-slate-400",
                    )}
                  >
                    {notifications.inApp && (
                      <Check className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={notifications.inApp}
                    onChange={() =>
                      setNotifications((p) => ({ ...p, inApp: !p.inApp }))
                    }
                  />
                  <div className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                    <Smartphone className="h-4 w-4 text-slate-400" />
                    In-app
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={cn(
                      "h-5 w-5 rounded border flex items-center justify-center transition-colors",
                      notifications.email
                        ? "bg-emerald-600 border-emerald-600"
                        : "border-slate-300 group-hover:border-slate-400",
                    )}
                  >
                    {notifications.email && (
                      <Check className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={notifications.email}
                    onChange={() =>
                      setNotifications((p) => ({ ...p, email: !p.email }))
                    }
                  />
                  <div className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                    <Mail className="h-4 w-4 text-slate-400" />
                    Email
                  </div>
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex-1 flex justify-start">
              <Button
                variant="link"
                className="px-0 text-slate-500 h-auto"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link
                  href="/dashboard/watchlist/alerts"
                  className="flex items-center gap-1 text-xs"
                >
                  View all alerts <ChevronRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting || !commodity}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? "Creating..." : "Create Alert"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
