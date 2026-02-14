"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {COMMODITIES.map((item) => (
        <Card
          key={item.id}
          className="group relative cursor-pointer border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 rounded-2xl"
        >
          <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
            {/* Header: Name & Badge */}
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {item.name}
                </h3>
              </div>
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  item.status === "Rising"
                    ? "bg-emerald-500"
                    : item.status === "Falling"
                      ? "bg-rose-500"
                      : "bg-slate-300",
                )}
              />
            </div>

            {/* Price & Change */}
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {item.price}
              </span>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-semibold",
                  item.change.startsWith("+")
                    ? "text-emerald-600"
                    : item.change.startsWith("-")
                      ? "text-rose-600"
                      : "text-slate-500",
                )}
              >
                {item.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
