"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNews } from "@/lib/hooks/useNews";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Bookmark,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewsPulse() {
  const { data, isLoading, isError } = useNews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const articles = data?.articles?.slice(0, 5) || [];

  const nextSlide = useCallback(() => {
    if (articles.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  }, [articles.length]);

  const prevSlide = useCallback(() => {
    if (articles.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  }, [articles.length]);

  useEffect(() => {
    if (articles.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [nextSlide, articles.length]);

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

  if (isLoading) {
    return <Card className="w-full h-full rounded-xl bg-slate-900 border-none aspect-video sm:aspect-auto flex items-center justify-center"><Loader2 className="h-6 w-6 text-emerald-500 animate-spin" /></Card>;
  }

  if (isError || articles.length === 0) {
    return (
      <Card className="w-full h-full rounded-xl bg-slate-900 border-none p-4 flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-6 w-6 text-slate-500 mb-2" />
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Insights Unavailable</p>
      </Card>
    );
  }

  const currentNews = articles[currentIndex];
  const timeAgo = formatDistanceToNow(new Date(currentNews.publishedAt), { addSuffix: true });

  return (
    <Card className="relative w-full h-full overflow-hidden border-none rounded-xl group shadow-lg bg-slate-900">
      {/* Progress indicators (Top) */}
      <div className="absolute top-5 right-2 z-30 flex gap-0.5 p-1 w-[100px]">
        {articles.map((_, idx) => (
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
            style={{ backgroundImage: `url(${currentNews.image || "/assets/placeholder-agric.jpg"})` }}
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
                  {currentNews.source}
                </Badge>
                <span className="text-[9px] text-slate-300 font-medium">
                  {timeAgo}
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
                <a href={currentNews.link} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="link"
                    className="py-1 px-0! h-auto text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[10px] font-bold no-underline group/btn"
                  >
                    READ STORY
                    <ExternalLink className="w-1.5 h-1.5 transition-transform group-hover/btn:translate-x-0.5 -mt-1" />
                  </Button>
                </a>
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
