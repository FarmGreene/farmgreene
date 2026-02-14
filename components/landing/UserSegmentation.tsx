import { Button } from "@/components/ui/button";
import { ArrowRight, Tractor, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

const segments = [
  {
    icon: Users,
    title: "Farmers",
    description: "Rent equipment on demand and reduce upfront costs.",
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/20",
  },
  {
    icon: Tractor,
    title: "Equipment Owners",
    description: "Monetize idle machinery by renting it out securely.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: TrendingUp,
    title: "Market Agents",
    description: "Report real-time prices and improve data transparency.",
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/20",
  },
];

export default function UserSegmentation() {
  return (
    <section className="py-20 bg-slate-50/50 dark:bg-transparent">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Who Farmgreene Is For
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're farming the land, owning the machines, or tracking
            the market, we have a place for you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-8 bg-background rounded-2xl border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-xl mb-6 ${segment.bg}`}>
                <segment.icon className={`h-8 w-8 ${segment.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{segment.title}</h3>
              <p className="text-muted-foreground mb-6 flex-1">
                {segment.description}
              </p>
              <span
                className={`flex items-center font-medium opacity-60 cursor-default`}
              >
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
