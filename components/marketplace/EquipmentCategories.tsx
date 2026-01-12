import { Tractor, Sprout, Combine, Droplets, Warehouse } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    icon: Tractor,
    title: "Tractors & Power",
    description: "Versatile tractors for ploughing, tilling, and hauling.",
  },
  {
    icon: Combine,
    title: "Harvesting",
    description:
      "Efficient harvesters for grains, cocoa, and specialized crops.",
  },
  {
    icon: Sprout,
    title: "Planting & Seeding",
    description: "Precision planters and seed drills for optimal coverage.",
  },
  {
    icon: Droplets,
    title: "Irrigation Systems",
    description: "Pumps, sprinklers, and pipes for water management.",
  },
  {
    icon: Warehouse,
    title: "Processing & Storage",
    description: "Dryers, shellers, and secure storage units.",
  },
];

export default function EquipmentCategories() {
  return (
    <section className="py-20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Equipment Categories
          </h2>
          <p className="text-muted-foreground text-lg">
            Find exactly what you need for every stage of farming.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <Card
              key={i}
              className="hover:border-green-500/50 hover:shadow-md transition-all cursor-pointer group text-center"
            >
              <CardContent className="pt-6">
                <div className="h-12 w-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 group-hover:bg-green-100 group-hover:text-green-600 transition-colors mb-4">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{cat.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {cat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
