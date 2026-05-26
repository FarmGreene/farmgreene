import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up as a Farmer, Owner, or Agent in less than 2 minutes.",
  },
  {
    number: "02",
    title: "Browse or List",
    description: "Search for premium machinery nearby or list idle equipment to earn.",
  },
  {
    number: "03",
    title: "Connect & Transact",
    description: "Book securely through the platform with transparent pricing guarantees.",
  },
  {
    number: "04",
    title: "Track & Grow",
    description: "Monitor crop market trends and optimize your seasonal farming profits.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-slate-950">
      
      {/* Background Soft Ambient Blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-amber-500/5 dark:bg-amber-500/2 blur-[100px] pointer-events-none -z-10 select-none" />

      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Modern Portrait Image Frame */}
          <div className="lg:col-span-5 relative w-full h-[540px] flex items-center justify-center">
            
            {/* Outer Decorative Dashed Frame */}
            <div className="absolute -inset-4 rounded-[2.5rem_2.5rem_6.5rem_2.5rem] border-2 border-dashed border-slate-100 dark:border-slate-800/80 -z-10 pointer-events-none group-hover:scale-[1.01] transition-transform duration-500" />

            {/* Asymmetric portrait image block with leaf-like bottom-right curve */}
            <div className="relative w-full h-full rounded-[2.5rem_2.5rem_6rem_2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 group bg-slate-50 dark:bg-slate-900">
              <Image
                src="/images/how-it-works-tech.png"
                alt="Modern Agriculture Technology"
                fill
                sizes="(max-w-md) 100vw, 500px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              
              {/* Subtle hover gradient screen overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-60 pointer-events-none group-hover:opacity-40 transition-opacity duration-500" />
            </div>

          </div>

          {/* Right Column: Step details and 2x2 grid */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Title Block */}
            <div className="space-y-4">
              {/* Signature Cursive Subtitle */}
              <span className="font-handwritten text-2xl text-amber-500 dark:text-amber-400 font-semibold tracking-wide inline-block -rotate-1 origin-left select-none">
                Simple Process
              </span>
              
              {/* Modern Heading */}
              <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                How Farmgreene Works
              </h2>
              
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Simple, automated steps custom-built to modernize your agricultural workflow. We make machinery sharing and price transparency accessible in minutes.
              </p>
            </div>

            {/* 2x2 Interactive Grid */}
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10 pt-4">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`relative group flex flex-col justify-start space-y-3.5 ${
                    i % 2 === 0
                      ? "sm:border-r sm:border-slate-100 dark:sm:border-slate-800/40 sm:pr-10"
                      : ""
                  }`}
                >
                  
                  {/* Step Title Row with circular amber badge */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-amber-500/80 text-amber-600 dark:text-amber-400 font-bold text-sm flex items-center justify-center shrink-0 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500">
                      {step.number}
                    </div>
                    <h4 className="font-heading font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                      {step.title}
                    </h4>
                  </div>

                  {/* Horizontal Line under Row with interactive hover slide effect */}
                  <div className="h-[1.5px] bg-slate-100 dark:bg-slate-800/50 w-full relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-amber-500 to-amber-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  </div>

                  {/* Step Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>

                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
