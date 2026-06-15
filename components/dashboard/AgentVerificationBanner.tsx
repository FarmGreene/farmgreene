"use client";

import React from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AgentVerificationBanner() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const isAgent = user?.roles?.includes("AGENT");
  const agentStatus = user?.agentStatus;

  if (!isAgent || agentStatus === "active") return null;

  return (
    <div className="relative overflow-hidden bg-linear-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20 border-b border-amber-200/50 dark:border-amber-800/50 w-full shrink-0">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="px-6 py-3 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 w-full">
        <div className="flex items-start sm:items-center gap-3">
          <div className="shrink-0 mt-0.5 sm:mt-0 bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full border border-amber-200 dark:border-amber-800">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              Action Required: Complete Field Agent Onboarding
            </h3>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5 font-medium max-w-3xl leading-relaxed">
              You are one step away from actively shaping the future of farmng
              and agriculture in Nigeria. Complete your profile verification to
              gain full access to agent tools and start onboarding farmers.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="shrink-0 bg-white/80 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 border-amber-200 hover:border-amber-300 dark:border-amber-800 dark:hover:border-amber-700 text-amber-700 dark:text-amber-400 font-medium shadow-sm transition-all"
          onClick={() => {
            const btn = document.getElementById("agent-onboarding-trigger");
            if (btn) btn.click();
          }}
        >
          Verify Now
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );
}
