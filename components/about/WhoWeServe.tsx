import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Tractor, TrendingUp } from "lucide-react";

const stakeholders = [
  {
    icon: Users,
    title: "Farmers",
    description:
      "Farmgreene helps farmers access essential equipment when they need it—without the burden of high upfront costs—allowing them to focus on productivity and yield.",
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/20",
  },
  {
    icon: Tractor,
    title: "Equipment Owners",
    description:
      "We enable equipment owners to earn more from their assets by connecting them with verified renters and providing tools to manage listings, rentals, and earnings.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: TrendingUp,
    title: "Market Agents",
    description:
      "Market agents play a critical role by submitting real-time price information, helping improve transparency and reliability in agricultural markets.",
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/20",
  },
];

export default function WhoWeServe() {
  return (
    <section className="py-20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Designed for the Entire Agricultural Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We build tools that create value for everyone in the value chain.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {stakeholders.map((item, index) => (
            <Card key={index} className="border shadow-sm h-full">
              <CardHeader>
                <div
                  className={`h-12 w-12 rounded-lg ${item.bg} flex items-center justify-center ${item.color} mb-4`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
