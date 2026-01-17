import React from "react";
import { Badge } from "@/components/ui/badge";

export default function ContactHero() {
  return (
    <section className="pt-20 pb-12 md:pt-32 md:pb-20 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container px-4 md:px-6 relative z-10 text-center space-y-6 max-w-3xl mx-auto">
        <Badge
          variant="outline"
          className="text-emerald-300 border-emerald-300 py-1 px-4 text-sm rounded-full"
        >
          Contact Us
        </Badge>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-heading">
          Get in Touch with Farmgreene
        </h1>

        <p className="text-lg md:text-xl text-emerald-200/80 leading-relaxed max-w-2xl mx-auto">
          Whether you’re a farmer, field agent, agribusiness, or data partner —
          we’re here to help you grow with better market intelligence.
        </p>

        <div className="pt-4 flex items-center justify-center gap-2 text-sm text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          We typically respond within 24 hours on business days.
        </div>
      </div>
    </section>
  );
}
