import { Badge } from "@/components/ui/badge";

export default function Differentiators() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            A Platform Built for Real Agricultural Needs
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Farmgreene goes beyond traditional marketplaces by combining
              equipment sharing with market intelligence. Our platform
              emphasizes trust, verified participation, and data
              accuracy—ensuring that every interaction adds real value to the
              agricultural community.
            </p>
            <p>
              We are focused on local realities, scalable infrastructure, and
              solutions that grow alongside the people who use them.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Badge variant="secondary" className="px-4 py-2 text-base">
              Verified Data
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-base">
              Community Trust
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-base">
              Scalable Tech
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
