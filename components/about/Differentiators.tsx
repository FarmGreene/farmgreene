import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Trust",
    description:
      "Every participant is verified, creating a safe environment for transactions and equipment sharing.",
  },
  {
    icon: Zap,
    title: "Real-Time Intelligence",
    description:
      "Market data that moves as fast as the market does, giving you the edge in negotiation.",
  },
  {
    icon: Globe,
    title: "Community First",
    description:
      "Built to strengthen local economies by keeping resources and value within the community.",
  },
];

export default function Differentiators() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm border-emerald-200 text-emerald-700 bg-emerald-50 mb-4"
          >
            Why Farmgreene?
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            A Platform Built for Real Agricultural Needs
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We go beyond simple listings. Farmgreene helps you build a
            reputation, access data, and grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-6">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
