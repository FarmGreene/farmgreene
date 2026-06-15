import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommodityWithLatest, REGION_LABELS, NigerianRegion } from "@/types/commodity";
import { Map, ArrowRight } from "lucide-react";

interface CommodityRegionalPricesProps {
  commodity: CommodityWithLatest;
}

export function CommodityRegionalPrices({ commodity }: CommodityRegionalPricesProps) {
  const regionalData = commodity.latestAverage?.regionalBreakdown || {};
  const nationalAvg = commodity.latestAverage?.averagePrice || 0;

  // Convert the object map to an array for easy sorting and mapping
  const regions = Object.keys(regionalData)
    .map((regionKey) => ({
      region: regionKey as NigerianRegion,
      label: REGION_LABELS[regionKey as NigerianRegion] || regionKey,
      price: regionalData[regionKey],
      variance: regionalData[regionKey] - nationalAvg,
    }))
    .sort((a, b) => b.price - a.price); // Sort highest price first

  if (regions.length === 0) {
    return null; // Don't render if no regional data
  }

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Map className="w-4 h-4 text-indigo-500" />
            Regional Arbitrage
          </CardTitle>
          <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
            vs National Avg: ₦{nationalAvg.toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {regions.map((data, idx) => {
            const isHigher = data.variance > 0;
            const isLower = data.variance < 0;
            const variancePercent = ((data.variance / nationalAvg) * 100).toFixed(1);

            return (
              <div 
                key={data.region} 
                className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    idx === 0 ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30" : 
                    idx === regions.length - 1 ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" : 
                    "bg-slate-100 text-slate-500 dark:bg-slate-800"
                  }`}>
                    #{idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{data.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium">Premium Trading Zone</p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      ₦{data.price.toLocaleString()}
                    </p>
                    <p className={`text-[10px] font-bold ${
                      isHigher ? "text-rose-500" : isLower ? "text-emerald-500" : "text-slate-400"
                    }`}>
                      {isHigher ? "+" : ""}{variancePercent}%
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
