"use client";

import React, { useState, useEffect } from "react";
import { useNews } from "@/lib/hooks/useNews";
import { motion, AnimatePresence } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import {
  Newspaper,
  ExternalLink,
  Clock,
  ArrowRight,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const ARTICLES_PER_PAGE = 6;

export function NewsSection() {
  const { data, isLoading, isError, error, refetch } = useNews();
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const articles = data?.articles || [];
  const hasMore = visibleCount < articles.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ARTICLES_PER_PAGE);
  };

  const visibleArticles = articles.slice(0, visibleCount);

  if (isLoading && !data) {
    return <NewsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl border-2 border-dashed border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10">
        <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Failed to load news
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mt-1">
          {error instanceof Error
            ? error.message
            : "Something went wrong while fetching the latest market insights."}
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="mt-6 border-red-200 hover:bg-red-50 text-red-600"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
            <Newspaper className="h-4 w-4 text-emerald-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Market Intelligence
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            Live Feed
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <AnimatePresence mode="popLayout">
          {visibleArticles.map((article, index) => (
            <motion.div
              key={article.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <NewsCard article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="group relative px-8 py-6 rounded-full border-2 border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-500 transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold tracking-tight">
              Load More Insights
              <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </Button>
        </div>
      )}

      {!hasMore && articles.length > 0 && (
        <p className="text-center text-xs font-medium text-slate-400 pt-8 uppercase tracking-widest px-4">
          You've reached the end of current agricultural intelligence feed.
        </p>
      )}

      {articles.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <Newspaper className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">
            No fresh market news available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}

function NewsCard({ article }: { article: any }) {
  const publishedAt = new Date(article.publishedAt);
  const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true });

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative"
    >
      <div className="flex gap-5 sm:gap-6">
        {/* Image Container */}
        <div className="relative h-24 w-32 sm:h-32 sm:w-44 shrink-0 overflow-hidden rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${article.image || "/assets/placeholder-agric.jpg"})`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-2 left-2">
            <Badge className="bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 backdrop-blur-md border-none text-[9px] font-bold py-0 h-5">
              {article.source}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center space-y-2">
          <div className="flex items-center gap-3 text-[10px] font-bold">
            <span className="text-emerald-600 uppercase tracking-widest transition-colors group-hover:text-emerald-500">
              {article.category || "Agriculture"}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3 w-3" />
              {timeAgo}
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
            {article.title}
          </h3>

          <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {article.snippet.slice(0, 100) + "..."}
          </p>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            READ SOURCE <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </a>
  );
}

function NewsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 4, 3, 5, 6].map((i) => (
          <div key={i} className="flex gap-6">
            <Skeleton className="h-32 w-44 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-3 py-2">
              <div className="flex gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
