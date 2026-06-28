import { Search, FileText, CheckCircle2, RotateCcw } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse Equipment",
    desc: "Find elite equipment based on category, location, and availability in your farming community.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Request Rental",
    desc: "Submit a secure booking request specifying your required dates, duration, and delivery needs.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Owner Approval",
    desc: "Wait for the verified machinery owner to review, confirm, and prepare your request.",
  },
  {
    number: "04",
    icon: RotateCcw,
    title: "Use & Return",
    desc: "Pick up or receive the equipment, operate with built-in telemetry, and return on time.",
  },
];

export default function RentalProcess() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-slate-900">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Premium Image Layout */}
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              {/* Soft glow behind the image */}
              <div className="absolute -inset-4 rounded-3xl bg-green-500/10 dark:bg-green-500/5 blur-xl group-hover:bg-green-500/15 dark:group-hover:bg-green-500/10 transition-all duration-700"></div>

              {/* Image container */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-slate-100 dark:border-slate-800">
                <Image
                  src="/images/rental-process.png"
                  alt="Farmgreene Rental Process"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Visual design overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* Floating overlay badge */}
              <div className="absolute -bottom-6 -right-6 md:right-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-2xl max-w-xs transition-transform duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-green-500/10 text-[#049878] dark:text-green-400 flex items-center justify-center font-bold text-xl">
                    99%
                  </div>
                  <div className="text-left">
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                      Owner Match Rate
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Fast approvals and verified support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Elegant Numbered Steps */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="text-left mb-12">
              <span className="font-handwritten text-2xl text-amber-500 dark:text-amber-400 font-semibold tracking-wide inline-block -rotate-1 origin-center select-none mb-4">
                How It Works
              </span>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                The Smart Way to Rent Equipment
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                We have streamlined agriculture equipment sharing to be incredibly
                secure, fast, and simple for both owners and renters.
              </p>
            </div>

            {/* Steps stack */}
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="group flex gap-6 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-900"
                >
                  {/* Step Number in giant styling */}
                  <div className="font-heading text-4xl sm:text-5xl font-black text-slate-200 dark:text-slate-800 group-hover:text-green-500/40 transition-colors duration-300 select-none">
                    {step.number}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 text-left space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-green-500/10 text-[#049878] dark:text-green-400 flex items-center justify-center">
                        <step.icon className="h-3.5 w-3.5" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#049878] dark:group-hover:text-green-400 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

