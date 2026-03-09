import { AgentMissionCard } from "@/components/dashboard/agent/AgentMissionCard";
import { AgentQuickStats } from "@/components/dashboard/agent/AgentQuickStats";
import { AgentNotifications } from "@/components/dashboard/agent/AgentNotifications";
import { AgentPerformanceSnapshot } from "@/components/dashboard/agent/AgentPerformanceSnapshot";
import { AgentTodaysTasks } from "@/components/dashboard/agent/AgentTodaysTasks";

export default function AgentOverviewPage() {
  return (
    <div className="flex-1 space-y-6  w-full pb-8 pt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agent Overview</h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Your daily command center for field operations and assignments.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Section A: Mission Card */}
        <section>
          <AgentMissionCard
            status="not-started"
            completedSubmissions={0}
            totalSubmissions={5}
          />
        </section>

        {/* Section B: Quick Stats */}
        <section className="w-full">
          <AgentQuickStats />
        </section>

        {/* Section C: Today's Tasks */}
        <section>
          <AgentTodaysTasks />
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
