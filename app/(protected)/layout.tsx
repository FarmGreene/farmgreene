import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Navbar } from "@/components/layout/Navbar"; // Reusing Navbar or using a DashboardHeader?
// Let's use a simplified Header for dashboard or just Sidebar + Content.
// For now, let's keep it simple: Sidebar on left, Content on right. No top Navbar inside content, maybe Topbar later.

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mr-8">
            Farmgreene
          </span>
          <div className="ml-auto flex items-center space-x-4">
            {/* User Nav or Avatar here */}
            <div className="h-8 w-8 rounded-full bg-slate-200"></div>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] md:py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <DashboardSidebar />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
