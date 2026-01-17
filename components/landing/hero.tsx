import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="space-y-6 py-16 md:py-32 bg-linear-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
      <div className="container max-w-[1440px] mx-auto px-6 sm:px-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link
            href="/about"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium border-green-600 border"
            target="_blank"
          >
            Empowering Nigerian Farmers
          </Link>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Shared Machinery & <br className="hidden sm:inline" /> Real-Time
            Market Intelligence
          </h1>
          <p className="max-w-2xl text-lg leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Access affordable equipment, track commodity prices, and join
            cooperative funding pools. Farmgreene bridges the gap between
            subsistence and success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-12"
              >
                Get Started
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full px-8 h-12"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
