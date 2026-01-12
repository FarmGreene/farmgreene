import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-green-900 text-white relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 relative z-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
          Ready to unlock smarter farming?
        </h2>
        <p className="text-green-100 text-xl max-w-2xl mx-auto mb-10">
          Join hundreds of farmers and owners maximizing their potential with
          Farmgreene.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-green-900 hover:bg-green-50 w-full sm:w-auto text-base h-12 px-8 rounded-full font-semibold"
            >
              Get Started Now
            </Button>
          </Link>
          <Link href="/register?role=owner">
            <Button
              size="lg"
              variant="outline"
              className="border-green-400 text-black hover:bg-green-800 hover:text-white w-full sm:w-auto text-base h-12 px-8 rounded-full"
            >
              List Your Equipment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
