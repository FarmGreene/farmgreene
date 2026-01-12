import { AlertTriangle } from "lucide-react";

export default function ProblemSection() {
  return (
    <section className="py-20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              The Challenge in Modern Agriculture
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Across many agricultural communities, access to essential farm
                equipment remains limited and expensive. Farmers often struggle
                to acquire the tools they need at the right time, while
                equipment owners face long periods of idle machinery.
              </p>
              <p>
                At the same time, unreliable and fragmented market price
                information makes it difficult for farmers and traders to make
                informed decisions.
              </p>
              <p>
                These challenges slow productivity, increase costs, and reduce
                income potential across the agricultural value chain. Farmgreene
                was created to address these gaps—by enabling shared access to
                equipment and improving the flow of reliable market
                intelligence.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-3xl bg-slate-100 dark:bg-slate-800 border flex items-center justify-center p-8">
            <div className="text-center space-y-4 opacity-50">
              <AlertTriangle className="h-16 w-16 mx-auto mb-4" />
              <p className="font-medium text-xl">
                [Illustration: Fragmented Supply Chain]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
