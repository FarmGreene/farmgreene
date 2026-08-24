"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  ChevronRight,
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
import { useCommodities } from "@/lib/hooks/useCommodities";
import { useCreateAlert } from "@/lib/hooks/useAlerts";
import type { PriceAlertCondition } from "@/types/alert";
import { toast } from "sonner";

interface QuickAlertCreateDialogProps {
  /** Pass both to control the dialog from a parent trigger (hides the built-in triggers). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function QuickAlertCreateDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: QuickAlertCreateDialogProps = {}) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

  const [commodityId, setCommodityId] = useState("");
  const [condition, setCondition] = useState<PriceAlertCondition>("above");
  const [targetPrice, setTargetPrice] = useState("");

  const { data } = useCommodities({ limit: 100 });
  const commodities = data?.data ?? [];
  const selectedCommodity = commodities.find((c) => c.id === commodityId);
  const createMutation = useCreateAlert();

  useEffect(() => {
    if (!isOpen) {
      setCommodityId("");
      setCondition("above");
      setTargetPrice("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(targetPrice);
    if (!commodityId || !price || price <= 0) return;

    try {
      await createMutation.mutateAsync({ commodityId, condition, targetPrice: price });
      toast.success(`Alert created for ${selectedCommodity?.name ?? "commodity"}`);
      setIsOpen(false);
    } catch {
      toast.error("Couldn't create alert — try again");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!isControlled && (
        <>
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
        </>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Price Alert</DialogTitle>
            <DialogDescription>
              Get notified by email when a commodity crosses your target price.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="commodity">Commodity</Label>
              <Select value={commodityId} onValueChange={setCommodityId} required>
                <SelectTrigger id="commodity" className="w-full">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {commodities.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Condition Type - Custom Radio Group */}
            <div className="space-y-3">
              <Label>Alert me when price...</Label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: "above" as const, label: "Goes Above", icon: TrendingUp },
                    { id: "below" as const, label: "Drops Below", icon: TrendingDown },
                  ]
                ).map((type) => {
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
                  min={0}
                  placeholder="0.00"
                  className="pl-7"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500">
                We&apos;ll email you when {selectedCommodity ? selectedCommodity.name : "the commodity"}{" "}
                price {condition === "above" ? "exceeds" : "falls below"} this amount.
              </p>
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
              disabled={createMutation.isPending || !commodityId || !targetPrice}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {createMutation.isPending ? "Creating..." : "Create Alert"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
