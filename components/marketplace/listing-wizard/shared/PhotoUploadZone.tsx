"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, X, Loader2, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadZoneProps {
  label: string;
  sublabel?: string;
  accept?: Record<string, string[]>;
  maxSizeMB?: number;
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => void;
  currentUrl?: string | null;
  isDocument?: boolean;
}

export function PhotoUploadZone({
  label,
  sublabel,
  accept = { "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"] },
  maxSizeMB = 5,
  onUpload,
  onRemove,
  currentUrl,
  isDocument = false,
}: PhotoUploadZoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      if (!accepted[0]) return;
      const file = accepted[0];

      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File must be under ${maxSizeMB}MB`);
        return;
      }

      setError(null);
      setIsUploading(true);
      try {
        await onUpload(file);
      } catch {
        setError("Upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload, maxSizeMB]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    disabled: isUploading,
  });

  if (currentUrl) {
    return (
      <div className="relative rounded-xl overflow-hidden border-2 border-emerald-200 dark:border-emerald-800 group">
        {isDocument ? (
          <div className="h-28 flex items-center justify-center gap-3 bg-emerald-50 dark:bg-emerald-950/30">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            <div>
              <p className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">
                Document uploaded
              </p>
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 underline"
              >
                View document
              </a>
            </div>
          </div>
        ) : (
          <img
            src={currentUrl}
            alt="Uploaded"
            className="h-40 w-full object-cover"
          />
        )}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 transition-all cursor-pointer",
          isDragActive
            ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20"
            : "border-slate-200 dark:border-slate-700 hover:border-emerald-300 hover:bg-slate-50 dark:hover:bg-slate-900/50",
          isUploading && "pointer-events-none opacity-60"
        )}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
        ) : isDocument ? (
          <FileText className="h-8 w-8 text-slate-400" />
        ) : (
          <ImagePlus className="h-8 w-8 text-slate-400" />
        )}
        <div className="text-center">
          <p className="text-sm font-semibold">
            {isUploading ? "Uploading..." : label}
          </p>
          {sublabel && !isUploading && (
            <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
