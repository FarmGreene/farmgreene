import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import WaitlistInput from "@/components/landing/WaitlistInput";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-linear-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
      <div className="container max-w-[1440px] mx-auto px-6 sm:px-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start gap-6 lg:gap-8 order-2 lg:order-1 relative z-10">
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Shared Machinery <br /> &{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Market Data</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-brand-400/80 -rotate-1 rounded-full -z-0"></span>
              </span>
            </h1>
            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl leading-relaxed">
              Access affordable equipment, track commodity prices, and become a
              field agent to contribute to the vision. Farmgreene bridges the
              gap.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 bg-brand-600 hover:bg-brand-700 text-white text-lg font-semibold shadow-xl shadow-brand-600/20"
                >
                  Become an Agent
                </Button>
              </Link>
              <Link
                href="/market"
                className="flex items-center gap-2 text-green-600 font-semibold hover:underline"
              >
                <div className="h-10 w-10 rounded-full border border-green-200 flex items-center justify-center bg-green-50">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-0.5"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                View Market Live
              </Link>
            </div>
            {/* TODO: Bring this to live when we have partners */}
            {/* <div className="pt-8 flex items-center gap-8">
              <p className="text-sm font-medium text-slate-500">
                Trusted by
                <br />
                leading co-ops
              </p>
              <div className="flex gap-4 opacity-50 grayscale">
                <div className="h-8 w-8 rounded-full bg-slate-300"></div>
                <div className="h-8 w-8 rounded-full bg-slate-300"></div>
                <div className="h-8 w-8 rounded-full bg-slate-300"></div>
                <div className="h-8 w-8 rounded-full bg-slate-300"></div>
              </div>
            </div> */}
            <WaitlistInput />
          </div>

          <div className="order-1 lg:order-2 relative h-[600px] w-full hidden lg:block">
            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 text-brand-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-1/3 text-brand-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>

            {/* Top Image - Farmer on Phone */}
            <div className="absolute top-0 right-4 w-[280px] h-[340px] z-20">
              <div className="absolute inset-0 bg-brand-300 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] rotate-3 transform"></div>
              <div className="absolute inset-2 overflow-hidden rounded-[30%_70%_70%_30%/30%_30%_70%_70%] rotate-3">
                <Image
                  src="/images/hero-farmer-phone.png"
                  alt="Farmer using phone"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -left-12 top-20 bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex flex-col gap-1 max-w-[140px]">
                <span className="text-xs font-bold text-slate-800">
                  Cocoa Price Up
                </span>
                <div className="h-2 w-full bg-green-100 rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div className="absolute -left-4 bottom-10 bg-white p-2 px-4 rounded-lg shadow-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-700">
                  ₦2,500/kg
                </span>
              </div>
            </div>

            {/* Bottom Image - Agent on Laptop */}
            <div className="absolute bottom-10 left-10 w-[300px] h-[300px] z-10">
              <div className="absolute inset-0 bg-brand-600 rounded-[63%_37%_39%_61%/60%_54%_46%_40%] -rotate-6 transform"></div>
              <div className="absolute inset-2 overflow-hidden rounded-[63%_37%_39%_61%/60%_54%_46%_40%] -rotate-6">
                <Image
                  src="/images/hero-agent-laptop.png"
                  alt="Agent on laptop"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -right-8 top-10 bg-slate-800 text-white p-3 rounded-xl shadow-xl flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">
                  128
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-300">
                    Active
                  </span>
                  <span className="text-sm font-bold">Listings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
