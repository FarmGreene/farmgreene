import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PlanTieIn() {
  return (
    <section className="py-24 bg-green-50/50 dark:bg-green-900/5">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight mb-12">
          Intelligence That Scales With You
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          <div className="bg-background border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-2">Starter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Basic price visibility
            </p>
            <ul className="text-sm space-y-2 text-left mb-6">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-500" /> Price Index
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-500" /> 2 Years History
              </li>
            </ul>
          </div>
          <div className="bg-background border-2 border-green-500 rounded-2xl p-6 shadow-lg relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              RECOMMENDED
            </div>
            <h3 className="font-bold text-lg mb-2 text-green-700">Insight</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI Tools & Deep Data
            </p>
            <ul className="text-sm space-y-2 text-left mb-6">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-500" /> AI Summaries
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-500" /> 10 Years History
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-500" /> 10 AI Reports/mo
              </li>
            </ul>
          </div>
          <div className="bg-background border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-2">Intelligence</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Teams & Power Users
            </p>
            <ul className="text-sm space-y-2 text-left mb-6">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-500" /> Forecasting
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-500" /> Collaboration
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-green-500" /> Unlimited AI
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/pricing">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Compare Plans
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="lg"
              className="rounded-full px-8 bg-green-600 hover:bg-green-700 text-white"
            >
              Start Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
