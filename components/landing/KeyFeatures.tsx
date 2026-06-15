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
    description: "Browse and rent tractors, harvesters, and specialized tools securely from verified owners.",
    iconClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    borderHover: "hover:border-emerald-500/30 dark:hover:border-emerald-500/20",
    glowColor: "hover:shadow-emerald-600/5 dark:hover:shadow-emerald-500/5",
    morphClass: "rounded-[35%_65%_30%_70%_/_60%_35%_65%_40%]",
    leafColor: "text-emerald-600",
  },
  {
    icon: LayoutDashboard,
    title: "Rental Management",
    description: "Track equipment bookings, usage reports, and scheduled payments inside one unified dashboard.",
    iconClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderHover: "hover:border-blue-500/30 dark:hover:border-blue-500/20",
    glowColor: "hover:shadow-blue-600/5 dark:hover:shadow-blue-500/5",
    morphClass: "rounded-[65%_35%_60%_40%_/_30%_70%_35%_65%]",
    leafColor: "text-blue-600",
  },
  {
    icon: LineChart,
    title: "Market Price Reporting",
    description: "Access transparent regional pricing trends and real-time commodity data for optimal trading.",
    iconClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderHover: "hover:border-amber-500/30 dark:hover:border-amber-500/20",
    glowColor: "hover:shadow-amber-600/5 dark:hover:shadow-amber-500/5",
    morphClass: "rounded-[30%_70%_40%_60%_/_70%_35%_65%_30%]",
    leafColor: "text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Profiles",
    description: "Rent with absolute confidence utilizing verified user trust scores, history, and feedback systems.",
    iconClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    borderHover: "hover:border-emerald-500/30 dark:hover:border-emerald-500/20",
    glowColor: "hover:shadow-emerald-600/5 dark:hover:shadow-emerald-500/5",
    morphClass: "rounded-[50%_50%_30%_70%_/_70%_30%_70%_30%]",
    leafColor: "text-emerald-600",
  },
  {
    icon: Wallet,
    title: "Smart Wallets",
    description: "Enjoy secure payment escrows and split fees with automated instant revenue withdrawals.",
    iconClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderHover: "hover:border-blue-500/30 dark:hover:border-blue-500/20",
    glowColor: "hover:shadow-blue-600/5 dark:hover:shadow-blue-500/5",
    morphClass: "rounded-[30%_70%_50%_50%_/_50%_50%_70%_30%]",
    leafColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "Agent Network",
    description: "Leverage crowd-verified prices contributed directly by active field agents tracking local hubs.",
    iconClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderHover: "hover:border-amber-500/30 dark:hover:border-amber-500/20",
    glowColor: "hover:shadow-amber-600/5 dark:hover:shadow-amber-500/5",
    morphClass: "rounded-[70%_30%_65%_35%_/_35%_65%_30%_70%]",
    leafColor: "text-amber-600",
  },
];

export default function KeyFeatures() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900/20">
      
      {/* Premium ambient light blurs in the background */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-emerald-500/5 dark:bg-emerald-500/2 blur-[80px] pointer-events-none -z-10 select-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-500/2 blur-[80px] pointer-events-none -z-10 select-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-amber-500/5 dark:bg-amber-500/2 blur-[80px] pointer-events-none -z-10 select-none" />

      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          {/* Cursive Subtitle Badge */}
          <span className="font-handwritten text-2xl text-amber-500 dark:text-amber-400 font-semibold tracking-wide inline-block -rotate-1 origin-center select-none">
            Built For Scale
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Everything You Need to Scale
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Powerful tools custom-engineered to streamline equipment renting and transparency in modern agricultural markets.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {features.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={i}
                className={`flex gap-5 p-6.5 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl ${feature.borderHover} ${feature.glowColor} transition-all duration-500 hover:-translate-y-1.5 group relative overflow-hidden`}
              >
                
                {/* Organic Shape-shifting Icon container */}
                <div className="shrink-0 pt-0.5">
                  <div className={`h-14 w-14 ${feature.morphClass} ${feature.bgClass} ${feature.iconClass} flex items-center justify-center shadow-inner transition-all duration-750 ease-out group-hover:rotate-12 group-hover:scale-105`}>
                    <IconComponent className="h-6.5 w-6.5" />
                  </div>
                </div>

                {/* Content block */}
                <div className="space-y-2 relative z-10">
                  <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Delicate Vector Leaf peeking from the bottom-right corner of the card on hover */}
                <div className={`absolute -bottom-6 -right-6 w-16 h-16 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-500 pointer-events-none select-none ${feature.leafColor}`}>
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full rotate-45"
                  >
                    <path
                      d="M10 90 C30 50 60 30 90 40 C70 70 40 80 10 90 Z"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 90 Q50 65 90 40"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
