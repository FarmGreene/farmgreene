import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up as a Farmer, Owner, or Agent in less than 2 minutes.",
  },
  {
    number: "02",
    title: "Browse or List",
    description:
      "Search for machinery nearby or list your idle assets to earn.",
  },
  {
    number: "03",
    title: "Connect & Transact",
    description: "Book securely through the platform with transparent pricing.",
  },
  {
    number: "04",
    title: "Track & Grow",
    description: "Monitor market trends and optimize your farming profits.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How Farmgreene Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple steps to modernize your agricultural operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="text-6xl font-black text-slate-100 dark:text-slate-800 mb-4 group-hover:text-green-50 transition-colors">
                {step.number}
              </div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
