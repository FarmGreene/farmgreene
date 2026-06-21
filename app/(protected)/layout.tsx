import { SidebarSwitcher } from "@/components/layout/SidebarSwitcher";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AgentRedirect } from "@/components/auth/AgentRedirect";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
      {/* Field agents belong in the dedicated agent app — bounce them there. */}
      <AgentRedirect />
      <SidebarSwitcher className="hidden md:flex" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
