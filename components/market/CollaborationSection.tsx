import { Users, MessageSquare, Share2 } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Shared Workspaces",
    desc: "Bring your team together in one data environment.",
  },
  {
    icon: MessageSquare,
    title: "Discuss Trends",
    desc: "Annotate charts and share notes directly.",
  },
  {
    icon: Share2,
    title: "Collaborative Reports",
    desc: "Build and export market outlooks together.",
  },
];

export default function CollaborationSection() {
  return (
    <section className="py-20 border-b">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Analyze Together. <br /> Decide Smarter.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Market intelligence improves when insights are shared. Farmgreene
              enables peer-to-peer analysis through shared workspaces, allowing
              teams to discuss trends, annotate charts, and collaborate on
              reports.
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Ideal for cooperatives, research teams, and agribusiness
              organizations.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 mb-4">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
