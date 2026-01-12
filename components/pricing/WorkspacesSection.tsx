import { Users, Layout } from "lucide-react";

export default function WorkspacesSection() {
  return (
    <section className="py-20 border-b">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-slate-50 dark:bg-slate-900/20 p-8 rounded-3xl">
            <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-6">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-2">Team Collaboration</h3>
            <p className="text-muted-foreground">
              Work solo or collaborate with others by sharing insights, charts,
              and reports within a shared workspace.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/20 p-8 rounded-3xl">
            <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mb-6">
              <Layout className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-2">Organization Management</h3>
            <p className="text-muted-foreground">
              Manage permissions, shared assets, and billing from a central
              admin dashboard designed for efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
