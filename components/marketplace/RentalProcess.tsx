import { Search, FileText, CheckCircle2, RotateCcw } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Browse Equipment",
    desc: "Find equipment based on category, location, and availability in your area.",
  },
  {
    icon: FileText,
    title: "2. Request Rental",
    desc: "Submit a booking request specifying your required dates and duration.",
  },
  {
    icon: CheckCircle2,
    title: "3. Owner Approval",
    desc: "Wait for the equipment owner to review and confirm your request.",
  },
  {
    icon: RotateCcw,
    title: "4. Use & Return",
    desc: "Pick up or receive the equipment, use it responsibly, and return on time.",
  },
];

export default function RentalProcess() {
  return (
    <section className="py-20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How Rentals Work
          </h2>
          <p className="text-muted-foreground text-lg">
            Our process is designed to be simple, transparent, and secure.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-slate-200 dark:bg-slate-800 -z-10"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center bg-background p-4"
              >
                <div className="h-24 w-24 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center text-green-600 mb-6 shadow-sm">
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
