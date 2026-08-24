"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useCommodity, usePriceHistory } from "@/lib/hooks/useCommodities";
import { CommodityHero } from "@/components/dashboard/intelligence/commodity/CommodityHero";
import { VariantSwitcher } from "@/components/dashboard/intelligence/commodity/VariantSwitcher";
import { CommodityAIAssistant } from "@/components/dashboard/intelligence/commodity/CommodityAIAssistant";
import { CommodityFundamentals } from "@/components/dashboard/intelligence/commodity/CommodityFundamentals";
import { CommodityPriceChart } from "@/components/dashboard/intelligence/commodity/CommodityPriceChart";
import { CommodityRegionalPrices } from "@/components/dashboard/intelligence/commodity/CommodityRegionalPrices";
import { NewsSection } from "@/components/dashboard/intelligence/NewsSection";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommodityIntelligenceHub() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: commodity, isLoading: isCommLoading, isError: isCommError } = useCommodity(id);
  const { data: history, isLoading: isHistLoading } = usePriceHistory(id, 90);

  if (isCommLoading) {
    return (
      <div className="flex flex-col gap-8 max-w-[1600px] w-full pb-20 mt-4 animate-pulse">
        <Skeleton className="w-full h-[340px] rounded-3xl" />
        <Skeleton className="w-full h-40 rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (isCommError || !commodity) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Commodity Not Found</h2>
        <p className="text-slate-500 mt-2 text-center max-w-md">
          We couldn't load the market intelligence for this specific commodity. It might have been removed or the ID is invalid.
        </p>
        <Button onClick={() => router.push("/dashboard/intelligence")} className="mt-6 bg-emerald-500 hover:bg-emerald-600">
          Return to Intelligence Index
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-[1600px] w-full pb-20">
      {/* 1. Hero Section */}
      <CommodityHero commodity={commodity} />

      {/* 1b. Variant Switcher (only renders for commodities with siblings) */}
      <VariantSwitcher variants={commodity.variants} />

      {/* 2. AI Market Summary */}
      <CommodityAIAssistant commodity={commodity} />

      {/* 3. Fundamentals Grid */}
      <CommodityFundamentals commodity={commodity} history={history} />

      {/* 4. Chart & Deep Data Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        <div className="xl:col-span-2">
          {isHistLoading ? (
            <Skeleton className="w-full h-[400px] rounded-2xl" />
          ) : (
            <CommodityPriceChart commodityId={commodity.id} history={history} />
          )}
        </div>
        <div className="xl:col-span-1">
          <CommodityRegionalPrices commodity={commodity} />
        </div>
      </div>

      {/* 5. Commodity Specific News (Using existing component for now) */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-1.5 rounded-full bg-emerald-500" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Impact Drivers & Macro Trends
          </h2>
        </div>
        <NewsSection />
      </div>
    </div>
  );
}
