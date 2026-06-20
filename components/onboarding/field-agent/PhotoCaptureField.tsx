"use client";

import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { PhotoUploadZone } from "@/components/marketplace/listing-wizard/shared/PhotoUploadZone";

interface PhotoCaptureFieldProps {
  /** react-hook-form field name (stores the selected File) */
  name: string;
  label: string;
  sublabel?: string;
}

/**
 * A functional image picker bound to react-hook-form. Lets the agent choose or
 * capture a photo, shows a live preview, and stores the File on the form field.
 * Reuses the marketplace PhotoUploadZone (dropzone + size validation + preview).
 */
export function PhotoCaptureField({
  name,
  label,
  sublabel,
}: PhotoCaptureFieldProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <PhotoUploadZone
      label={label}
      sublabel={sublabel}
      currentUrl={preview}
      onUpload={async (file) => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(URL.createObjectURL(file));
        field.onChange(file);
      }}
      onRemove={() => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        field.onChange(undefined);
      }}
    />
  );
}
