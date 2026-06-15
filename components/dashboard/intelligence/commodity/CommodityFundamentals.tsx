import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CommodityWithLatest, PriceHistory } from "@/types/commodity";
import { CalendarDays, PackageOpen, ArrowUpFromLine, ArrowDownToLine, MapPin } from "lucide-react";

interface CommodityFundamentalsProps {
  commodity: CommodityWithLatest;
  history?: PriceHistory;
}

export function CommodityFundamentals({ commodity, history }: CommodityFundamentalsProps) {
  // Calculate 52-week High/Low from history if available
  let high = 0;
  let low = Infinity;
  
  if (history?.history && history.history.length > 0) {
    history.history.forEach(day => {
      if (day.averagePrice > high) high = day.averagePrice;
      if (day.averagePrice < low) low = day.averagePrice;
    });
  } else if (commodity.latestAverage) {
    high = commodity.latestAverage.averagePrice;
    low = commodity.latestAverage.averagePrice;
  }

  if (low === Infinity) low = 0;

  // Mock fundamental data (in a real app, this would come from the backend database)
  const fundamentals = [
    {
      title: "Supply Status",
      value: commodity.latestAverage?.priceChange && commodity.latestAverage.priceChange > 0 ? "Constrained" : "Plentiful",
      icon: <PackageOpen className="w-5 h-5 text-indigo-500" />,
      color: "bg-indigo-50 dark:bg-indigo-500/10",
      description: "Based on market volume",
    },
    {
      title: "Seasonality Phase",
      value: "Pre-Harvest",
      icon: <CalendarDays className="w-5 h-5 text-orange-500" />,
      color: "bg-orange-50 dark:bg-orange-500/10",
      description: "Typical cycle for this period",
    },
    {
      title: "52-Week High",
      value: `₦${high.toLocaleString()}`,
      icon: <ArrowUpFromLine className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-50 dark:bg-emerald-500/10",
      description: "Highest recorded moving avg",
    },
    {
      title: "52-Week Low",
      value: `₦${low.toLocaleString()}`,
      icon: <ArrowDownToLine className="w-5 h-5 text-rose-500" />,
      color: "bg-rose-50 dark:bg-rose-500/10",
      description: "Lowest recorded moving avg",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {fundamentals.map((item, index) => (
        <Card key={index} className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl">
          <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {item.title}
              </span>
              <div className={`p-2 rounded-xl ${item.color}`}>
                {item.icon}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                {item.value}
              </h4>
              <p className="text-[10px] text-slate-500 font-medium">
                {item.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Expanded Region Card taking 2 columns */}
      <Card className="border-none shadow-sm bg-slate-900 dark:bg-slate-950 rounded-2xl col-span-2 md:col-span-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-emerald-500/20 to-transparent pointer-events-none" />
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Top Producing Regions
              </span>
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">
              Kaduna, Katsina, Niger, Kano
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Export Quality", "High Demand", "Local Staple"].map((tag, i) => (
              <div key={i} className="px-3 py-1.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold backdrop-blur-sm border border-white/5">
                {tag}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
