"use client";

import React, { useState } from "react";
import { PhotoUploadZone } from "../shared/PhotoUploadZone";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, ShieldCheck } from "lucide-react";
import {
  uploadListingPhoto,
  uploadListingDocument,
  deleteListingPhoto,
} from "@/lib/services/marketplace.service";

interface Step5PhotosProps {
  listingId: string;
  defaultPrimaryUrl?: string | null;
  defaultPrimaryId?: string | null;
  defaultGallery?: Array<{ url: string; publicId: string }>;
  defaultOwnershipUrl?: string | null;
  defaultInsuranceUrl?: string | null;
  // This step doesn't have a traditional form submit, we just validate it has the required uploads
  onReady: () => void;
  onUpdate: (data: any) => void;
  isLoading: boolean;
}

export function Step5Photos({
  listingId,
  defaultPrimaryUrl,
  defaultPrimaryId,
  defaultGallery = [],
  defaultOwnershipUrl,
  defaultInsuranceUrl,
  onReady,
  onUpdate,
}: Step5PhotosProps) {
  const [primaryUrl, setPrimaryUrl] = useState(defaultPrimaryUrl);
  const [primaryId, setPrimaryId] = useState(defaultPrimaryId);
  const [gallery, setGallery] = useState(defaultGallery);
  const [ownershipUrl, setOwnershipUrl] = useState(defaultOwnershipUrl);
  const [insuranceUrl, setInsuranceUrl] = useState(defaultInsuranceUrl);
  const [error, setError] = useState<string | null>(null);

  const handleUploadPrimary = async (file: File) => {
    setError(null);
    try {
      const res = await uploadListingPhoto(listingId, file, true);
      setPrimaryUrl(res.primaryPhotoUrl);
      setPrimaryId(res.primaryPhotoPublicId);
      onUpdate(res);
    } catch (e: any) {
      setError("Failed to upload primary photo");
      throw e;
    }
  };

  const handleRemovePrimary = async () => {
    if (!primaryId) return;
    try {
      const res = await deleteListingPhoto(listingId, primaryId);
      setPrimaryUrl(null);
      setPrimaryId(null);
      onUpdate(res);
    } catch (e) {
      setError("Failed to delete photo");
    }
  };

  const handleUploadGallery = async (file: File) => {
    setError(null);
    try {
      const res = await uploadListingPhoto(listingId, file, false);
      setGallery(res.galleryPhotos || []);
      onUpdate(res);
    } catch (e: any) {
      setError("Failed to upload gallery photo");
      throw e;
    }
  };

  const handleRemoveGallery = async (publicId: string) => {
    try {
      const res = await deleteListingPhoto(listingId, publicId);
      setGallery(res.galleryPhotos || []);
      onUpdate(res);
    } catch (e) {
      setError("Failed to delete photo");
    }
  };

  const handleUploadOwnership = async (file: File) => {
    setError(null);
    try {
      const res = await uploadListingDocument(listingId, file, "ownership");
      setOwnershipUrl(res.ownershipProofUrl);
      onUpdate(res);
    } catch (e: any) {
      setError("Failed to upload ownership document");
      throw e;
    }
  };

  const handleUploadInsurance = async (file: File) => {
    setError(null);
    try {
      const res = await uploadListingDocument(listingId, file, "insurance");
      setInsuranceUrl(res.insuranceCertificateUrl);
      onUpdate(res);
    } catch (e: any) {
      setError("Failed to upload insurance document");
      throw e;
    }
  };

  // Called when user clicks "Continue" in the parent modal
  React.useEffect(() => {
    // Parent should check if ready via some mechanism, or we expose validation
  }, []);

  return (
    <div className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Photos Section */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold border-b pb-2 mb-4">Equipment Photos</h4>
          <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-xs">
              Clear, bright photos get 3x more rentals. Ensure the equipment is clean and visible from multiple angles.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-2">
          <Label>Primary Photo <span className="text-red-500">*</span></Label>
          <PhotoUploadZone
            label="Upload Cover Image"
            sublabel="This is the main image renters will see"
            onUpload={handleUploadPrimary}
            onRemove={handleRemovePrimary}
            currentUrl={primaryUrl}
          />
        </div>

        <div className="space-y-2">
          <Label>Additional Photos (Max 4)</Label>
          <div className="grid grid-cols-2 gap-4">
            {gallery.map((p) => (
              <PhotoUploadZone
                key={p.publicId}
                label=""
                currentUrl={p.url}
                onRemove={() => handleRemoveGallery(p.publicId)}
                onUpload={async () => {}}
              />
            ))}
            {gallery.length < 4 && (
              <PhotoUploadZone
                label="Add Photo"
                onUpload={handleUploadGallery}
              />
            )}
          </div>
        </div>
      </div>

      {/* Verification Documents */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold border-b pb-2 flex items-center gap-2">
            Verification Documents <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </h4>
          <p className="text-xs text-muted-foreground mt-2">
            These documents are kept secure and are only used by Farmgreene admins to verify ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Proof of Ownership <span className="text-red-500">*</span></Label>
            <PhotoUploadZone
              label="Upload Receipt/Registration"
              sublabel="PDF, JPG, PNG"
              isDocument
              onUpload={handleUploadOwnership}
              currentUrl={ownershipUrl}
              accept={{
                "image/*": [".jpg", ".jpeg", ".png"],
                "application/pdf": [".pdf"],
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Insurance Certificate <span className="text-muted-foreground">(Optional)</span></Label>
            <PhotoUploadZone
              label="Upload Insurance"
              sublabel="If equipment is insured"
              isDocument
              onUpload={handleUploadInsurance}
              currentUrl={insuranceUrl}
              accept={{
                "image/*": [".jpg", ".jpeg", ".png"],
                "application/pdf": [".pdf"],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
