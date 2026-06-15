import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Tractor, TrendingUp } from "lucide-react";
import Image from "next/image";

const stakeholders = [
  {
    icon: Users,
    title: "Farmers",
    description:
      "Access essential equipment when needed—without high upfront costs. Focus on productivity and yield.",
    image: "/images/stakeholder-farmer.jpg",
    accent: "bg-green-600",
  },
  {
    icon: Tractor,
    title: "Equipment Owners",
    description:
      "Earn more from assets by connecting with verified renters. Manage listings, rentals, and earnings seamlessly.",
    image: "/images/stakeholder-owner.jpg",
    accent: "bg-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Market Agents",
    description:
      "Submit real-time price info to improve transparency and earn by helping the market flow efficiently.",
    image: "/images/stakeholder-agent.jpg",
    accent: "bg-orange-600",
  },
];

export default function WhoWeServe() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-16 space-y-6">
          <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">
            Our Ecosystem
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
            Designed for Everyone
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            We build tools that create value for every participant in the
            agricultural value chain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stakeholders.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[500px] flex flex-col"
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/50 to-transparent z-10" />

              {/* Content */}
              <div className="relative z-20 mt-auto p-8 text-white space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <div
                  className={`h-12 w-12 rounded-xl ${item.accent} flex items-center justify-center shadow-lg mb-2`}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-slate-200 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
