import Image from "next/image";

export default function TrustSection() {
  return (
    <section className="py-20 border-y bg-slate-50/50">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-8">
          Trusted by Nigeria Agricultural Leaders
        </p>

        <div className="relative rounded-2xl overflow-hidden aspect-21/9 md:aspect-21/7 shadow-lg mb-12 group">
          <Image
            src="/images/trust-partners.png"
            alt="Diverse Agricultural Professionals Partnering"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
            <p className="text-white text-lg md:text-xl font-medium max-w-2xl px-4 drop-shadow-md">
              "Unified by a common goal: Food security for every Nigerian home."
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-4xl font-black text-green-600 mb-2">500+</div>
            <div className="text-sm font-medium text-muted-foreground">
              Active Farmers
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-blue-600 mb-2">50+</div>
            <div className="text-sm font-medium text-muted-foreground">
              Certified Equipment
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-orange-600 mb-2">
              Daily
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Market Updates
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
