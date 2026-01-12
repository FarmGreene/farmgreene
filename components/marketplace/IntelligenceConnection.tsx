import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function IntelligenceConnection() {
  return (
    <section className="py-20 border-t bg-slate-50 dark:bg-slate-900/10 text-center">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            More Than Just Equipment Access
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Farmgreene integrates equipment sharing with market intelligence,
            helping farmers make better decisions beyond access to tools. By
            understanding market prices and trends, users can plan smarter and
            operate more efficiently.
          </p>
          <Link
            href="/market"
            className="inline-flex items-center text-green-600 font-semibold hover:underline"
          >
            Explore Market Intelligence <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
