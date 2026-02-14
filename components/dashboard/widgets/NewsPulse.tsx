"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Bookmark,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const NEWS_DATA = [
  {
    id: 1,
    title: "Revolutionizing Soil Health with AI-Powered Analytics",
    body: "New precision farming tools are helping farmers optimize fertilizer use and improve crop yields by analyzing soil composition in real-time. This breakthrough promises to reduce costs and environmental impact.",
    category: "AgriTech",
    source: "Farm Future",
    image: "/images/news/news-1.png",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Direct-to-Consumer: The Digital Marketplace Boom",
    body: "Local producers are increasingly turning to dedicated digital platforms to sell their harvests directly to urban consumers, bypassing traditional middle-men and increasing profit margins.",
    category: "Economy",
    source: "Market Watch",
    image: "/images/news/news-2.png",
    time: "5h ago",
  },
  {
    id: 3,
    title: "Next-Gen Greenhouses Redefining Urban Farming",
    body: "Vertical farming and automated greenhouse systems are making it possible to grow high-value crops in the heart of metropolitan areas, ensuring year-round supply of fresh produce.",
    category: "Sustainability",
    source: "Green Echo",
    image: "/images/news/news-3.png",
    time: "8h ago",
  },
  {
    id: 4,
    title: "Adapting to Change: Resilient Crop Varieties",
    body: "Agricultural researchers have unveiled new drought-resistant maize and wheat varieties designed to thrive despite the increasing unpredictability of seasonal rainfall patterns.",
    category: "Climate",
    source: "Global Harvest",
    image: "/images/news/news-4.png",
    time: "12h ago",
  },
  {
    id: 5,
    title: "Organic Certification: A New Frontier for Smallholders",
    body: "Government initiatives are simplifying the organic certification process, opening up lucrative premium markets for small-scale farmers who prioritize traditional, chemical-free methods.",
    category: "Policy",
    source: "Organic Daily",
    image: "/images/news/news-5.png",
    time: "1d ago",
  },
];

export default function NewsPulse() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % NEWS_DATA.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + NEWS_DATA.length) % NEWS_DATA.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "20%" : "-20%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "20%" : "-20%",
      opacity: 0,
    }),
  };

  const currentNews = NEWS_DATA[currentIndex];

  return (
    <Card className="relative w-full h-full overflow-hidden border-none rounded-xl group shadow-lg bg-slate-900">
      {/* Progress indicators (Top) */}
      <div className="absolute top-5 right-2 z-30 flex gap-0.5 p-1 w-[100px]">
        {NEWS_DATA.map((_, idx) => (
          <div
            key={idx}
            className="h-[4px] flex-1 bg-white/20 rounded-full overflow-hidden"
          >
            {idx === currentIndex ? (
              <motion.div
                key={`progress-${idx}`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
                className="h-full bg-emerald-500"
              />
            ) : idx < currentIndex ? (
              <div className="h-full w-full bg-emerald-500" />
            ) : null}
          </div>
        ))}
      </div>

      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image with Ken Burns effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentNews.image})` }}
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
            <div className="space-y-1.5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-none px-1.5 py-0 text-[8px] font-bold uppercase tracking-wider">
                  {currentNews.category}
                </Badge>
                <span className="text-[9px] text-slate-300 font-medium">
                  {currentNews.time}
                </span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-sm font-bold leading-tight line-clamp-2"
              >
                {currentNews.title}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Button
                  variant="link"
                  className="py-1 px-0! h-auto text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[10px] font-bold no-underline group/btn"
                >
                  READ STORY
                  <ExternalLink className="w-1.5 h-1.5 transition-transform group-hover/btn:translate-x-0.5 -mt-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Minimized */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-30">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="p-1.5 rounded-full bg-slate-900/40 backdrop-blur-xl border border-white/10 text-white hover:bg-emerald-500 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="p-1.5 rounded-full bg-slate-900/40 backdrop-blur-xl border border-white/10 text-white hover:bg-emerald-500 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Live Indicator - Scaled Down */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
        <div className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </div>
        <span className="text-[8px] font-bold text-white uppercase tracking-wider">
          Live
        </span>
      </div>
    </Card>
  );
}
