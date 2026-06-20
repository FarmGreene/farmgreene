import Link from "next/link";
import { Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentMissionCard } from "@/components/dashboard/agent/AgentMissionCard";
import { AgentQuickStats } from "@/components/dashboard/agent/AgentQuickStats";
import { AgentUpcomingAssignments } from "@/components/dashboard/agent/AgentUpcomingAssignments";
import { AgentNotifications } from "@/components/dashboard/agent/AgentNotifications";
import { AgentPerformanceSnapshot } from "@/components/dashboard/agent/AgentPerformanceSnapshot";

export default function AgentOverviewPage() {
  return (
    <div className="flex-1 space-y-6  w-full pb-6 pt-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agent Overview</h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Your daily command center for field operations and assignments.
          </p>
        </div>
        <Button asChild className="gap-2 shrink-0">
          <Link href="/agent/onboard">
            <Tractor className="h-4 w-4" />
            Onboard Equipment
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-8">
        {/* Section A: Mission Card */}
        <section>
          <AgentMissionCard />
        </section>

        {/* Section B: Quick Stats */}
        <section className="w-full">
          <AgentQuickStats />
        </section>

        {/* Section C: Upcoming Assignments */}
        <section>
          <AgentUpcomingAssignments />
        </section>

        {/* Bottom Split: Notifications & Performance */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AgentNotifications />
          </div>
          <div className="lg:col-span-2">
            <AgentPerformanceSnapshot />
          </div>
        </section>
      </div>
    </div>
  );
}
