"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Loader2 } from "lucide-react";
import { useCommodities } from "@/lib/hooks/useCommodities";
import { CATEGORY_LABELS } from "@/types/commodity";
import { toast } from "sonner";

interface AddCommodityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  watchedIds: Set<string>;
  onAdd: (commodityId: string) => Promise<void>;
  isAdding: boolean;
}

export function AddCommodityDialog({
  open,
  onOpenChange,
  watchedIds,
  onAdd,
  isAdding,
}: AddCommodityDialogProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useCommodities({
    search: debouncedSearch || undefined,
    limit: 30,
  });

  const results = (data?.data ?? []).filter((c) => !watchedIds.has(c.id));

  const handleAdd = async (commodityId: string) => {
    setAddingId(commodityId);
    try {
      await onAdd(commodityId);
      toast.success("Added to watchlist");
    } catch {
      toast.error("Couldn't add that commodity — try again");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Track New Commodity</DialogTitle>
          <DialogDescription>
            Search and add a commodity to your watchlist.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            autoFocus
            placeholder="Search commodities..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="h-72 -mx-1 px-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {c.name}
                    </p>
                    <Badge variant="outline" className="mt-0.5 text-[10px] font-normal">
                      {CATEGORY_LABELS[c.category] ?? c.category}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isAdding && addingId === c.id}
                    onClick={() => handleAdd(c.id)}
                    className="shrink-0"
                  >
                    {isAdding && addingId === c.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">
              {debouncedSearch ? "No matches." : "No commodities available."}
            </p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
