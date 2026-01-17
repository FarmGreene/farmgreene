import { SidebarSwitcher } from "@/components/layout/SidebarSwitcher";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
      <SidebarSwitcher className="hidden md:flex" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
