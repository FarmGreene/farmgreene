import { ShieldCheck, UserCheck, FileCheck } from "lucide-react";

export default function MarketplaceTrust() {
  return (
    <section className="py-16 bg-green-50/50 dark:bg-green-900/10 border-y border-green-100 dark:border-green-900/20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-4 gap-8 items-center">
          <div className="lg:col-span-1">
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-2">
              Built on Trust <br /> and Transparency
            </h2>
            <div className="h-1 w-20 bg-green-500 rounded-full"></div>
          </div>

          <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <ShieldCheck className="h-6 w-6 text-[#049878] shrink-0" />
              <div>
                <h3 className="font-bold text-sm mb-1">Accountability</h3>
                <p className="text-xs text-muted-foreground">
                  Platform records ensure fair issue resolution.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <UserCheck className="h-6 w-6 text-[#049878] shrink-0" />
              <div>
                <h3 className="font-bold text-sm mb-1">Verified Owners</h3>
                <p className="text-xs text-muted-foreground">
                  Every equipment owner is vetted for safety.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <FileCheck className="h-6 w-6 text-[#049878] shrink-0" />
              <div>
                <h3 className="font-bold text-sm mb-1">Clear Terms</h3>
                <p className="text-xs text-muted-foreground">
                  Transparent pricing and rental agreements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
