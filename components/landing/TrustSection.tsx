export default function TrustSection() {
  return (
    <section className="py-20 border-y bg-slate-50/50">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14 text-center">
        <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-8">
          Trusted by Osun State's Agricultural Leaders
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholders for logos */}
          <div className="h-12 flex items-center justify-center font-bold text-xl text-slate-400">
            AGRO-ALLIED
          </div>
          <div className="h-12 flex items-center justify-center font-bold text-xl text-slate-400">
            OSUN CO-OP
          </div>
          <div className="h-12 flex items-center justify-center font-bold text-xl text-slate-400">
            FARM TECH
          </div>
          <div className="h-12 flex items-center justify-center font-bold text-xl text-slate-400">
            GROWTH HUB
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
