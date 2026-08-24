"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListingGalleryProps {
  name: string;
  primaryPhotoUrl?: string | null;
  galleryPhotos?: Array<{ url: string; publicId: string }>;
}

/** Premium image gallery: large stage with a motion crossfade + thumbnail strip. */
export function ListingGallery({
  name,
  primaryPhotoUrl,
  galleryPhotos,
}: ListingGalleryProps) {
  const photos = [
    ...(primaryPhotoUrl ? [primaryPhotoUrl] : []),
    ...(galleryPhotos?.map((p) => p.url).filter(Boolean) ?? []),
  ].filter((url, i, arr) => url && arr.indexOf(url) === i);

  const [active, setActive] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center text-slate-400">
        <ImageIcon className="h-12 w-12 mb-2 stroke-[1.25] opacity-60" />
        <span className="text-xs font-bold tracking-wider uppercase opacity-75">
          No photos provided
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-slate-100 dark:bg-slate-900 shadow-[0_16px_50px_rgba(0,0,0,0.08)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={photos[active]}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={photos[active]}
              alt={`${name} — photo ${active + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {photos.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {photos.map((url, i) => (
            <button
              key={url}
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className={cn(
                "relative h-16 w-20 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                i === active
                  ? "border-emerald-500 ring-2 ring-emerald-500/20"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={url}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
