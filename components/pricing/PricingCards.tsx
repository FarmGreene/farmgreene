import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    description:
      "Perfect for exploring commodity price trends and staying informed.",
    features: [
      "Commodity price index (Limited)",
      "Up to 2 years historical data",
      "Basic price charts",
      "Limited news feed",
      "1 user",
    ],
    cta: "Get Started for Free",
    variant: "outline",
    popular: false,
  },
  {
    name: "Insight",
    price: "₦5,000",
    frequency: "/month",
    description:
      "For Individual Professionals. Unlock deeper data and AI summaries.",
    features: [
      "Up to 10 years historical data",
      "Real-time price updates",
      "AI-generated summaries",
      "10 AI reports / month",
      "Advanced interactive charts",
      "Full news feed",
    ],
    cta: "Upgrade to Insight",
    variant: "default",
    popular: true,
  },
  {
    name: "Intelligence",
    price: "₦20,000",
    frequency: "/month",
    description:
      "For Teams. Advanced analytics, collaboration, and unlimited AI.",
    features: [
      "Full historical data",
      "Advanced AI forecasting",
      "Unlimited AI reports (Fair use)",
      "Full TradingView tools",
      "Peer-to-peer analysis",
      "Up to 10 users",
    ],
    cta: "Get Intelligence",
    variant: "outline",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Tailored data access and enterprise-grade support for large orgs.",
    features: [
      "Custom data feeds",
      "Unlimited users",
      "API access",
      "White-labeled reports",
      "Dedicated support",
      "SLA agreements",
    ],
    cta: "Contact Sales",
    variant: "ghost",
    popular: false,
  },
];

export default function PricingCards() {
  return (
    <section className="py-10">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                tier.popular
                  ? "border-green-600 shadow-lg ring-1 ring-green-600"
                  : "bg-background shadow-sm"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-2">
                  <span className="inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white shadow-sm ring-1 ring-inset ring-green-600/10">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-bold leading-8">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  {tier.frequency && (
                    <span className="text-sm font-semibold leading-6 text-muted-foreground">
                      {tier.frequency}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              <ul
                role="list"
                className="mt-auto mb-8 space-y-3 text-sm leading-6 text-muted-foreground"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className="h-5 w-5 flex-none text-green-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={
                  tier.variant === "default"
                    ? "default"
                    : tier.variant === "outline"
                    ? "outline"
                    : "ghost"
                }
                className={`w-full rounded-full ${
                  tier.variant === "default"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : ""
                } ${
                  tier.variant === "ghost"
                    ? "hover:bg-transparent hover:text-green-600 hover:underline"
                    : ""
                }`}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
