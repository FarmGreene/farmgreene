import { Database, Map, CalendarRange, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Historical Indices",
    desc: "Access long-term price archives for trend analysis.",
  },
  {
    icon: Map,
    title: "Regional Pricing",
    desc: "Drill down to specific markets and local hubs.",
  },
  {
    icon: CalendarRange,
    title: "Time-Series Data",
    desc: "Analyze price movements across multiple years.",
  },
  {
    icon: RefreshCcw,
    title: "Regular Updates",
    desc: "Stay current with frequently refreshed market inputs.",
  },
];

export default function DataCoverage() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/10">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Comprehensive Commodity Price Data
          </h2>
          <p className="text-muted-foreground text-lg">
            Reliable inputs for accurate forecasting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-background p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
