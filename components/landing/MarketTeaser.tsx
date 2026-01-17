"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { MarketPriceChart } from "@/components/dashboard/MarketPriceChart";
import { Card, CardContent } from "@/components/ui/card";

export default function MarketTeaser() {
  return (
    <section className="py-20 bg-slate-900 text-slate-50 overflow-hidden">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-25"></div>
              <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-4">
                {/* Reusing the chart component, wrapped to fit context */}
                <MarketPriceChart />
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400 mb-4">
                <TrendingUp className="mr-2 h-4 w-4" />
                Live Market Intelligence
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
                Know the Price Before You Sell
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Stop guessing. Access real-time price updates for Cocoa,
                Cassava, Yam, and Palm Oil from Osogbo, Ilesa, and Bodija
                markets.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Daily price updates verified by agents",
                "Historical trend analysis",
                "Regional market comparisons",
                "Profitability calculators",
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-300">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full cursor-default"
            >
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
