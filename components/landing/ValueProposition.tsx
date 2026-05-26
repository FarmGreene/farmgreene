import Image from "next/image";
import Link from "next/link";

export default function ValueProposition() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-slate-950">
      {/* Faint Subtle Sketched Farm Landscape Background in Bottom-Right */}
      <div className="absolute right-0 bottom-0 w-80 h-44 opacity-25 dark:opacity-10 pointer-events-none -z-10 select-none">
        <svg
          viewBox="0 0 300 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-emerald-600"
        >
          {/* Rolling Hills */}
          <path
            d="M0 135 C 60 115, 120 145, 180 125 C 230 110, 270 135, 320 120"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M30 142 C 100 125, 170 152, 240 138 C 275 130, 290 134, 320 132"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="4 4"
          />
          {/* Subtle sun */}
          <circle
            cx="75"
            cy="70"
            r="12"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="4 2"
          />
          {/* Windmill outline */}
          <path
            d="M235 125 L240 92 L245 125 Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M240 92 L230 82 M240 92 L250 82 M240 92 L235 102 M240 92 L245 102"
            stroke="currentColor"
            strokeWidth="1"
          />
          {/* Flying birds */}
          <path
            d="M48 35 Q52 31 56 35 Q60 31 64 35"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            d="M115 26 Q118 23 121 26 Q124 23 127 26"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Creative & Organic Image Collage */}
          <div className="lg:col-span-6 relative flex items-center justify-center order-2 lg:order-1 pt-6 pb-12 lg:py-6">
            <div className="relative w-full max-w-[460px] aspect-square group">
              
              {/* Outer Decorative Ring around the Main Circle */}
              <div className="absolute inset-[3%] rounded-full border border-dashed border-emerald-500/20 dark:border-emerald-400/20 -z-10 animate-[spin_80s_linear_infinite]" />
              
              {/* Large Main Circle (Combine harvester / fields) */}
              <div className="absolute top-[5%] right-0 w-[82%] h-[82%] rounded-full overflow-hidden border-8 border-white dark:border-slate-900 shadow-2xl transition-all duration-700 group-hover:shadow-emerald-600/10">
                <Image
                  src="/images/hero-farm.png"
                  alt="Agriculture fields sharing"
                  fill
                  sizes="(max-w-md) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Smaller Overlapping Circle (Farmer crop close-up) */}
              <div className="absolute bottom-0 left-[2%] w-[46%] h-[46%] rounded-full overflow-hidden border-8 border-white dark:border-slate-900 shadow-2xl z-20 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                <Image
                  src="/images/stakeholder-farmer.jpg"
                  alt="Farmer inspecting crops"
                  fill
                  sizes="(max-w-md) 100vw, 200px"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* High-fidelity SVG Leaf Vector Overlay - Left (Fern / Slender leaf) */}
              <div className="absolute -left-6 top-[22%] w-[24%] h-[48%] z-10 origin-bottom transition-all duration-700 ease-out group-hover:rotate-6 hover:rotate-12 cursor-pointer drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] select-none">
                <svg
                  viewBox="0 0 100 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M50 190 C15 135 10 65 50 10 C90 65 85 135 50 190 Z"
                    fill="url(#leaf-grad-left)"
                  />
                  {/* Stem */}
                  <path
                    d="M50 190 C50 130 50 70 50 10"
                    stroke="#047857"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Veins */}
                  <path d="M50 160 C35 140 22 130 18 125" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M50 135 C33 115 20 100 14 90" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M50 105 C33 85 20 70 15 55" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M50 75 C35 60 25 45 20 35" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                  
                  <path d="M50 160 C65 140 78 130 82 125" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M50 135 C67 115 80 100 86 90" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M50 105 C67 85 80 70 85 55" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M50 75 C65 60 75 45 80 35" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="leaf-grad-left" x1="50" y1="190" x2="50" y2="10" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="60%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* High-fidelity SVG Leaf Vector Overlay - Top-Right (Broad organic leaf) */}
              <div className="absolute top-[1%] right-[14%] w-[28%] h-[20%] z-10 origin-left transition-all duration-700 ease-out group-hover:-rotate-3 hover:-rotate-8 cursor-pointer drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)] select-none">
                <svg
                  viewBox="0 0 150 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M10 82 C42 32 98 12 142 32 C112 72 62 92 10 82 Z"
                    fill="url(#leaf-grad-right)"
                  />
                  {/* Center line */}
                  <path
                    d="M10 82 Q76 47 142 32"
                    stroke="#65a30d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Vein lines */}
                  <path d="M48 64 Q54 48 65 38" stroke="#ecfccb" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M78 52 Q88 38 100 30" stroke="#ecfccb" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M108 40 Q118 29 128 23" stroke="#ecfccb" strokeWidth="1.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="leaf-grad-right" x1="10" y1="82" x2="142" y2="32" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#166534" />
                      <stop offset="50%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#a3e635" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

            </div>
          </div>

          {/* Right Side: Copy & Micro-features */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              {/* Playful Handwriting style Subtitle */}
              <span className="font-handwritten text-2xl text-amber-500 dark:text-amber-400 font-semibold tracking-wide inline-block -rotate-2 origin-left mb-1 select-none">
                Our Introductions
              </span>
              
              {/* Bold Modern Heading */}
              <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Why Farmgreene Exists
              </h2>
              
              {/* Green Accent Slogan */}
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 leading-snug">
                Farmgreene bridges the gap between access, ownership, and intelligence.
              </p>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                We unlock peak efficiency across the agricultural value chain. By connecting local farmers, idle machinery owners, and data-driven agents into one unified ecosystem, we turn modern agricultural challenges into collaborative growth.
              </p>
            </div>

            {/* Feature Cards Grid (Two boxes side-by-side with hand-drawn outline icons) */}
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              
              {/* Card 1: Shared Machinery */}
              <div className="flex gap-4 p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-950/20 shadow-sm hover:shadow-md hover:border-amber-200/50 dark:hover:border-amber-900/30 transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100/70 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 shrink-0 shadow-inner">
                  {/* Outline Tractor Icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-amber-600 dark:text-amber-500"
                  >
                    <circle cx="7" cy="18" r="3" />
                    <circle cx="18" cy="18" r="4" />
                    <path d="M7 15h6v4H7z" />
                    <path d="M14 18V9h-3V6H9v3" />
                    <path d="M18 14h-4v-3h3z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                    Shared Machinery
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Rent premium equipment locally without heavy upfront costs.
                  </p>
                </div>
              </div>

              {/* Card 2: Market Intelligence */}
              <div className="flex gap-4 p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-950/20 shadow-sm hover:shadow-md hover:border-amber-200/50 dark:hover:border-amber-900/30 transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100/70 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 shrink-0 shadow-inner">
                  {/* Outline Crop Flask/Analytics Icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-amber-600 dark:text-amber-500"
                  >
                    <path d="M10 2h4" />
                    <path d="M12 2v6" />
                    <path d="M8 8h8L19 19c.6 1 .2 2.3-.8 2.8A2 2 0 0 1 17 22H7a2 2 0 0 1-1.8-1.2c-.5-1-.9-2.3-.2-2.8z" />
                    <path d="M8 14h8" />
                    <path d="M12 11c1-1 1-2.5 1-3.5" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                    Tips & Intelligence
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Access transparent market trends and data-driven insights.
                  </p>
                </div>
              </div>

            </div>

            {/* Premium Green Checkmark Badge List */}
            <div className="space-y-3.5 pt-2">
              {[
                "Turn idle agricultural machinery into active, high-yield income streams.",
                "Build trusted local networks with completely transparent market prices.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 dark:bg-emerald-600 text-white shrink-0 shadow-md shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-110 mt-0.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Premium Action Button (With micro-animated sliding arrow) */}
            <div className="pt-4">
              <Link href="/about" className="inline-block">
                <button
                  type="button"
                  className="px-9 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-base font-bold shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 group"
                >
                  Discover More
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
