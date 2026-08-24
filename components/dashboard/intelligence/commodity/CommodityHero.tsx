"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, BellRing, BookmarkPlus, BookmarkCheck, Loader2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommodityWithLatest } from "@/types/commodity";
import { useWatchlist, useAddToWatchlist, useRemoveFromWatchlist } from "@/lib/hooks/useCommodities";
import { toast } from "sonner";

interface CommodityHeroProps {
  commodity: CommodityWithLatest;
}

export function CommodityHero({ commodity }: CommodityHeroProps) {
  const router = useRouter();

  const { data: watchlist = [] } = useWatchlist();
  const isWatched = watchlist.some((item) => item.commodityId === commodity.id);
  const addMutation = useAddToWatchlist();
  const removeMutation = useRemoveFromWatchlist();
  const isToggling = addMutation.isPending || removeMutation.isPending;

  const handleToggleWatchlist = async () => {
    try {
      if (isWatched) {
        await removeMutation.mutateAsync(commodity.id);
        toast.success("Removed from watchlist");
      } else {
        await addMutation.mutateAsync(commodity.id);
        toast.success("Added to watchlist");
      }
    } catch {
      toast.error("Couldn't update your watchlist — try again");
    }
  };

  // Fallback image if none provided
  const imageUrl = commodity.imageUrl || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=1200";
  
  const currentPrice = commodity.latestAverage?.averagePrice || 0;
  const priceChange = commodity.latestAverage?.priceChange || 0;
  const isPositive = priceChange > 0;
  const isNegative = priceChange < 0;

  return (
    <div className="relative w-full h-[340px] rounded-3xl overflow-hidden shadow-xl group">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-slate-900/20" />
      
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.back()}
          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 rounded-full h-10 w-10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 rounded-full h-10 w-10 transition-colors"
          >
            <BellRing className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={handleToggleWatchlist}
            disabled={isToggling}
            className={`border-none rounded-full h-10 px-4 font-semibold text-xs tracking-wide transition-colors ${
              isWatched
                ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
          >
            {isToggling ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : isWatched ? (
              <BookmarkCheck className="h-4 w-4 mr-2" />
            ) : (
              <BookmarkPlus className="h-4 w-4 mr-2" />
            )}
            {isWatched ? "Watching" : "Watchlist"}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <Badge className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border-emerald-500/30 px-3 py-1 text-xs tracking-widest uppercase font-bold backdrop-blur-md">
              {commodity.category.replace("_", " ")}
            </Badge>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-slate-300 uppercase tracking-widest font-semibold">Live Market</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            {commodity.name}
          </motion.h1>

          {commodity.description && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-300 max-w-xl text-sm leading-relaxed hidden md:block"
            >
              {commodity.description}
            </motion.p>
          )}
        </div>

        {/* Price Block */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 min-w-[200px]"
        >
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">National Average</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-white tracking-tight">
              ₦{currentPrice.toLocaleString()}
            </span>
            <span className="text-slate-400 text-sm font-medium">/ {commodity.unit}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={`border-none font-bold tabular-nums ${
                isPositive ? "bg-emerald-500/20 text-emerald-400" : 
                isNegative ? "bg-rose-500/20 text-rose-400" : 
                "bg-slate-500/20 text-slate-400"
              }`}
            >
              {isPositive && <ArrowUpRight className="h-3 w-3 mr-1" />}
              {isNegative && <ArrowDownRight className="h-3 w-3 mr-1" />}
              {!isPositive && !isNegative && <span className="mr-1">-</span>}
              {Math.abs(priceChange)}%
            </Badge>
            <span className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">vs Yesterday</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
