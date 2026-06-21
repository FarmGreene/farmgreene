import { Tractor, Users, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const segments = [
  {
    icon: Users,
    title: "Farmers",
    description: "Rent premium agricultural equipment on demand, optimize operating costs, and scale your seasonal harvest.",
    image: "/images/stakeholder-farmer.jpg",
    roundedClass: "rounded-[2.5rem_1rem_2.5rem_1rem]",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    borderHover: "hover:border-emerald-500/30 dark:hover:border-emerald-500/20",
    glowColor: "hover:shadow-emerald-600/5 dark:hover:shadow-emerald-500/5",
  },
  {
    icon: Tractor,
    title: "Equipment Owners",
    description: "Monetize your idle machinery and tractors securely. Turn expensive assets into constant active income streams.",
    image: "/images/stakeholder-owner.jpg",
    roundedClass: "rounded-[1rem_2.5rem_1rem_2.5rem]",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    borderHover: "hover:border-blue-500/30 dark:hover:border-blue-500/20",
    glowColor: "hover:shadow-blue-600/5 dark:hover:shadow-blue-500/5",
  },
  {
    icon: TrendingUp,
    title: "Market Agents",
    description: "Report real-time crop market pricing, upload data, and help eliminate price manipulation across local hubs.",
    href: "/agents",
    image: "/images/stakeholder-agent.jpg",
    roundedClass: "rounded-[2rem_2rem_1rem_1rem]",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    borderHover: "hover:border-amber-500/30 dark:hover:border-amber-500/20",
    glowColor: "hover:shadow-amber-600/5 dark:hover:shadow-amber-500/5",
  },
];

export default function UserSegmentation() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-50/50 dark:bg-transparent">
      
      {/* Decorative Grid Line/Mesh Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 dark:opacity-10 pointer-events-none -z-20" />

      {/* Decorative Peeking Leaf Accent - Left (Soft Emerald) */}
      <div className="absolute -left-12 top-1/4 w-32 h-64 text-emerald-500/10 dark:text-emerald-500/5 pointer-events-none -z-10 select-none hidden lg:block">
        <svg
          viewBox="0 0 100 200"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full rotate-45"
        >
          <path d="M50 190 C15 135 10 65 50 10 C90 65 85 135 50 190 Z" />
        </svg>
      </div>

      {/* Decorative Peeking Leaf Accent - Right (Soft Amber) */}
      <div className="absolute -right-12 bottom-1/4 w-32 h-64 text-amber-500/10 dark:text-amber-500/5 pointer-events-none -z-10 select-none hidden lg:block">
        <svg
          viewBox="0 0 100 200"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full -rotate-45"
        >
          <path d="M50 190 C15 135 10 65 50 10 C90 65 85 135 50 190 Z" />
        </svg>
      </div>

      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        
        {/* Header Block */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          {/* Cursive handwritten accent label */}
          <span className="font-handwritten text-2xl text-amber-500 dark:text-amber-400 font-semibold tracking-wide inline-block -rotate-1 origin-center select-none">
            Tailored For You
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Who Farmgreene Is For
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you're farming the land, owning the machines, or tracking the market, we build the perfect tools for your success.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3 relative z-10">
          {segments.map((segment, index) => {
            const IconComponent = segment.icon;
            const href = "href" in segment ? segment.href : undefined;
            return (
              <div
                key={index}
                className={`flex flex-col items-start p-6 sm:p-8 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl ${segment.borderHover} ${segment.glowColor} transition-all duration-500 hover:-translate-y-2 group`}
              >
                
                {/* Organic Asymmetric Photo Container */}
                <div className="relative w-full h-52 overflow-hidden mb-8 shadow-md">
                  <div className={`absolute inset-0 ${segment.roundedClass} overflow-hidden bg-slate-100 dark:bg-slate-800`}>
                    <Image
                      src={segment.image}
                      alt={`${segment.title} stakeholder`}
                      fill
                      sizes="(max-w-md) 100vw, 360px"
                      className="object-cover transition-transform duration-750 group-hover:scale-108"
                    />
                  </div>
                  
                  {/* Icon Overlay floating on bottom right of the photo block */}
                  <div className="absolute -bottom-3 right-4 p-3.5 rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-100/80 dark:border-slate-700 z-10 transition-transform duration-500 group-hover:scale-110">
                    <div className={`p-2.5 rounded-xl ${segment.bg} ${segment.color} shrink-0`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div className="space-y-3.5 flex-1 flex flex-col justify-between w-full">
                  <div className="space-y-3">
                    <h3 className="font-heading text-2xl font-bold text-slate-800 dark:text-slate-100">
                      {segment.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                      {segment.description}
                    </p>
                  </div>

                  {/* Pulsing Coming Soon Badge */}
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50 w-full mt-4">
                    {href ? (
                      <Link
                        href={href}
                        className={`inline-flex items-center gap-1.5 text-sm font-bold ${segment.color} transition-all hover:gap-2.5`}
                      >
                        Learn more
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2 px-4.5 py-2 rounded-full bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-100/40 dark:border-emerald-950/30 shadow-inner select-none">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Coming Soon
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
