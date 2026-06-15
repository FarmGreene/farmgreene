import { Tractor, Sprout, Combine, Droplets, Warehouse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    icon: Tractor,
    title: "Tractors & Power",
    description: "Versatile tractors for ploughing, tilling, and hauling.",
    image: "/images/categories/tractors.png",
    slug: "tractors",
  },
  {
    icon: Combine,
    title: "Harvesting",
    description:
      "Efficient harvesters for grains, cocoa, and specialized crops.",
    image: "/images/categories/harvesting.png",
    slug: "harvesting",
  },
  {
    icon: Sprout,
    title: "Planting & Seeding",
    description: "Precision planters and seed drills for optimal coverage.",
    image: "/images/categories/planting.png",
    slug: "planting",
  },
  {
    icon: Droplets,
    title: "Irrigation Systems",
    description: "Pumps, sprinklers, and pipes for water management.",
    image: "/images/categories/irrigation.png",
    slug: "irrigation",
  },
  {
    icon: Warehouse,
    title: "Processing & Storage",
    description: "Dryers, shellers, and secure storage units.",
    image: "/images/categories/processing.png",
    slug: "processing",
  },
];

export default function EquipmentCategories() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden border-b border-slate-100 dark:border-slate-900">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl text-left">
            <span className="font-handwritten text-2xl text-amber-500 dark:text-amber-400 font-semibold tracking-wide inline-block -rotate-1 origin-center select-none mb-4">
              Explore Departments
            </span>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Browse by Category
            </h2>
            <p className="text-muted-foreground text-lg">
              Find state-of-the-art machinery and specialized implements for every stage of your crop cycle.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/marketplace?category=${cat.slug}`}
              className="group relative h-[420px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/10 dark:border-slate-800/50 hover:shadow-2xl transition-all duration-500 flex flex-col justify-end bg-slate-950"
            >
              {/* Image background with hover zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  priority={i < 2}
                />
                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-950/20 to-transparent mix-blend-multiply z-10"></div>
              </div>

              {/* Floating icon badge (glassmorphic) */}
              <div className="absolute top-6 left-6 h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out shadow-lg z-20">
                <cat.icon className="h-6 w-6 text-green-400" />
              </div>

              {/* Text content */}
              <div className="p-6 text-left transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out relative z-20">
                {/* Micro-label */}
                <span className="text-[10px] uppercase tracking-widest text-green-400 font-bold mb-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Farmgreene Share
                </span>

                <h3 className="font-heading text-xl font-bold text-white mb-2 leading-tight group-hover:text-green-300 transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 leading-relaxed">
                  {cat.description}
                </p>

                {/* Styled arrow indicator */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 transform translate-x-2 group-hover:translate-x-0">
                  <span>View listings</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


