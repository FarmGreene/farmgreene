import {
  LayoutDashboard,
  ShoppingBag,
  LineChart,
  ShieldCheck,
  Wallet,
  Users,
} from "lucide-react";

const features = [
  {
    icon: ShoppingBag,
    title: "Equipment Marketplace",
    description:
      "Browse and rent tractors, harvesters, and more from verified owners.",
  },
  {
    icon: LayoutDashboard,
    title: "Rental Management",
    description:
      "Track bookings, usage, and payments in one intuitive dashboard.",
  },
  {
    icon: LineChart,
    title: "Market Price Reporting",
    description: "Access real-time commodity prices from key regional markets.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Profiles",
    description: "Verified user ratings and trust scores for peace of mind.",
  },
  {
    icon: Wallet,
    title: "Smart Wallets",
    description: "Secure payments and instant revenue withdrawal for owners.",
  },
  {
    icon: Users,
    title: "Agent Network",
    description: "Crowdsourced data from field agents ensures accuracy.",
  },
];

export default function KeyFeatures() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need to Scale
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features built specifically for the unique needs of
            Nigerian agriculture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 rounded-2xl border bg-background transition-colors hover:border-green-600/50"
            >
              <div className="shrink-0">
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
