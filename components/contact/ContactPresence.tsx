import React from "react";
import { Globe2, MapPin, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Globe2,
    title: "Primary Market",
    value: "Nigeria",
    detail: "West Africa Focus",
  },
  {
    icon: MapPin,
    title: "Operational Coverage",
    value: "Rural & Urban",
    detail: "Agricultural Markets",
  },
  {
    icon: TrendingUp,
    title: "Serving",
    value: "Farmers & Agents",
    detail: "+ Agribusinesses & Analysts",
  },
];

export default function ContactPresence() {
  return (
    <section className="py-12 md:py-24 border-b">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Our Presence</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Farmgreene operates at the heart of agricultural innovation,
              connecting rural productivity with modern market intelligence.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border"
                  >
                    <div className="h-10 w-10 text-green-600 mb-4 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      {stat.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
