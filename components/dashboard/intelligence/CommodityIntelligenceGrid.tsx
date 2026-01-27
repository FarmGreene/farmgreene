"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const COMMODITIES = [
  {
    id: 1,
    name: "Maize",
    category: "Grains",
    price: "₦420",
    change: "+6.4%",
    status: "Rising",
    statusColor: "bg-emerald-500",
    trend: [400, 410, 405, 415, 420],
  },
  {
    id: 2,
    name: "Rice",
    category: "Grains",
    price: "₦780",
    change: "-5.1%",
    status: "Falling",
    statusColor: "bg-red-500",
    trend: [820, 810, 800, 790, 780],
  },
  {
    id: 3,
    name: "Sorghum",
    category: "Grains",
    price: "₦310",
    change: "+4.9%",
    status: "Rising",
    statusColor: "bg-emerald-500",
    trend: [300, 305, 302, 308, 310],
  },
  {
    id: 4,
    name: "Cassava",
    category: "Tubers",
    price: "₦120",
    change: "-3.8%",
    status: "Falling",
    statusColor: "bg-red-500",
    trend: [130, 128, 125, 122, 120],
  },
  {
    id: 5,
    name: "Yam",
    category: "Tubers",
    price: "₦950",
    change: "-2.6%",
    status: "Falling",
    statusColor: "bg-red-500",
    trend: [980, 970, 960, 955, 950],
  },
  {
    id: 6,
    name: "Beans",
    category: "Legumes",
    price: "₦550",
    change: "+3.2%",
    status: "Rising",
    statusColor: "bg-emerald-500",
    trend: [530, 535, 540, 545, 550],
  },
  {
    id: 7,
    name: "Soya Beans",
    category: "Legumes",
    price: "₦610",
    change: "+2.8%",
    status: "Rising",
    statusColor: "bg-emerald-500",
    trend: [590, 595, 600, 605, 610],
  },
  {
    id: 8,
    name: "Cocoa",
    category: "Cash Crops",
    price: "₦3,200",
    change: "0.0%",
    status: "Stable",
    statusColor: "bg-slate-400",
    trend: [3200, 3200, 3190, 3210, 3200],
  },
];

export default function CommodityIntelligenceGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {COMMODITIES.map((item) => (
        <Card
          key={item.id}
          className="cursor-pointer group hover:shadow-lg transition-all border-slate-200 dark:border-slate-800"
        >
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">
                  {item.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {item.category}
                </span>
              </div>
              <Badge
                variant="secondary"
                className="text-[10px] font-bold px-1.5 py-0 h-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {item.status}
              </Badge>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">
                  {item.price}
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-bold ${item.change.startsWith("+") ? "text-emerald-600" : item.change.startsWith("-") ? "text-red-600" : "text-slate-500"}`}
                >
                  {item.change.startsWith("+") ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : item.change.startsWith("-") ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : (
                    <Minus className="w-3 h-3" />
                  )}
                  {item.change}
                </div>
              </div>

              {/* Micro Sparkline Visualization (SVG) */}
              <div className="flex gap-0.5 items-end h-8">
                {item.trend.map((val, i) => {
                  // Normalize for visual height
                  const min = Math.min(...item.trend);
                  const max = Math.max(...item.trend);
                  const range = max - min || 1;
                  const height = 10 + ((val - min) / range) * 20; // Min height 10px, Max 30px

                  return (
                    <div
                      key={i}
                      className={`w-1.5 rounded-t-sm ${item.statusColor} opacity-${40 + i * 15}`}
                      style={{ height: `${height}px` }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                View Intelligence
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Minus className="w-4 h-4 rotate-45 text-slate-400" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
