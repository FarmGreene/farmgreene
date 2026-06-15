"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Step1Basics } from "./steps/Step1Basics";
import { Step2Specs } from "./steps/Step2Specs";
import { Step3Pricing } from "./steps/Step3Pricing";
import { Step4Location } from "./steps/Step4Location";
import { Step5Photos } from "./steps/Step5Photos";
import { Step6Review } from "./steps/Step6Review";

import {
  createListingDraft,
  updateListingSpecs,
  updateListingPricing,
  updateListingLocation,
  publishListing,
  getListingById,
} from "@/lib/services/marketplace.service";
import { EquipmentListing } from "@/types/marketplace";

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  resumeListingId?: string; // If passed, resumes an existing draft
}

const STEPS = [
  { id: 1, name: "Basics" },
  { id: 2, name: "Specs" },
  { id: 3, name: "Pricing" },
  { id: 4, name: "Location" },
  { id: 5, name: "Photos" },
  { id: 6, name: "Review" },
];

export function CreateListingModal({
  isOpen,
  onClose,
  onSuccess,
  resumeListingId,
}: CreateListingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [listingId, setListingId] = useState<string | null>(null);
  const [listingData, setListingData] = useState<EquipmentListing | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  // Initialize if resuming
  useEffect(() => {
    if (isOpen && resumeListingId && !listingId) {
      setIsInitializing(true);
      getListingById(resumeListingId)
        .then((data) => {
          setListingId(data.id);
          setListingData(data);
          // Jump to the lowest uncompleted step
          const step = Math.min(Math.max(data.completedStep, 1), 6);
          setCurrentStep(step);
        })
        .catch(() => {
          toast.error("Failed to load draft");
          onClose();
        })
        .finally(() => setIsInitializing(false));
    }
  }, [isOpen, resumeListingId, listingId, onClose]);

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to allow exit animation
      setTimeout(() => {
        setCurrentStep(1);
        setListingId(null);
        setListingData(null);
      }, 300);
    }
  }, [isOpen]);

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, 6));
  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  // --- Submit Handlers ---

  const onStep1Submit = async (data: any) => {
    setIsLoading(true);
    try {
      if (listingId) {
        // Technically backend doesn't have an updateStep1, but it's okay for now.
        // We just move next if it's already created.
        handleNext();
      } else {
        const res = await createListingDraft(data);
        setListingId(res.id);
        setListingData(res);
        handleNext();
      }
    } catch (e) {
      toast.error("Failed to save basics");
    } finally {
      setIsLoading(false);
    }
  };

  const onStep2Submit = async (data: any) => {
    if (!listingId) return;
    setIsLoading(true);
    try {
      const res = await updateListingSpecs(listingId, data);
      setListingData(res);
      handleNext();
    } catch (e) {
      toast.error("Failed to save specifications");
    } finally {
      setIsLoading(false);
    }
  };

  const onStep3Submit = async (data: any) => {
    if (!listingId) return;
    setIsLoading(true);
    try {
      const res = await updateListingPricing(listingId, data);
      setListingData(res);
      handleNext();
    } catch (e) {
      toast.error("Failed to save pricing");
    } finally {
      setIsLoading(false);
    }
  };

  const onStep4Submit = async (data: any) => {
    if (!listingId) return;
    setIsLoading(true);
    try {
      const res = await updateListingLocation(listingId, data);
      setListingData(res);
      handleNext();
    } catch (e) {
      toast.error("Failed to save location");
    } finally {
      setIsLoading(false);
    }
  };

  const onStep5Next = async () => {
    // Step 5 doesn't have a form, it uploads instantly. We just validate here.
    if (!listingData?.primaryPhotoUrl) {
      toast.error("A primary photo is required.");
      return;
    }
    if (!listingData?.ownershipProofUrl) {
      toast.error("Proof of ownership is required.");
      return;
    }
    handleNext();
  };

  const onStep6Submit = async (data: any) => {
    if (!listingId) return;
    setIsLoading(true);
    try {
      await publishListing(listingId);
      toast.success("Listing submitted for review!");
      onSuccess();
      onClose();
    } catch (e) {
      toast.error("Failed to publish listing");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Rendering ---

  if (isInitializing) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] h-[80vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] h-[90vh] max-h-[800px] p-0 flex flex-col gap-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Header & Progress */}
        <div className="p-6 pb-4 bg-white dark:bg-slate-900 border-b shrink-0 z-10">
          <h2 className="text-xl font-bold font-heading mb-4 text-slate-800 dark:text-slate-100">
            {listingId ? "Complete your listing" : "List Equipment"}
          </h2>

          <div className="flex items-center justify-between relative px-0">
            {/* Background Base Line */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 dark:bg-slate-800 rounded-full -z-10" />

            {/* Active Filled Progress Line */}
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-500 rounded-full -z-10 transition-all duration-500 ease-out"
              style={{
                width: `calc((100% - 32px) * ${(currentStep - 1) / (STEPS.length - 1)})`,
              }}
            />

            {STEPS.map((step) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center gap-1.5 z-10"
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 bg-white dark:bg-slate-900",
                      isCompleted
                        ? "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 scale-100"
                        : isCurrent
                          ? "border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-110 ring-4 ring-emerald-500/10"
                          : "border-slate-200 text-slate-400 dark:border-slate-800 scale-95 hover:border-slate-300",
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-4.5 w-4.5 stroke-[2.5]" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-bold tracking-wide transition-all duration-300 hidden sm:block",
                      isCurrent
                        ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                        : isCompleted
                          ? "text-slate-700 dark:text-slate-300"
                          : "text-slate-400 dark:text-slate-500",
                    )}
                  >
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content Area */}
        <div className="flex-1 overflow-y-auto p-6 relative bg-white dark:bg-slate-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="pb-24"
            >
              {currentStep === 1 && (
                <Step1Basics
                  onSubmit={onStep1Submit}
                  defaultValues={listingData || {}}
                  isLoading={isLoading}
                />
              )}
              {currentStep === 2 && (
                <Step2Specs
                  onSubmit={onStep2Submit}
                  defaultValues={listingData || {}}
                  isLoading={isLoading}
                />
              )}
              {currentStep === 3 && (
                <Step3Pricing
                  onSubmit={onStep3Submit}
                  defaultValues={listingData || {}}
                  isLoading={isLoading}
                />
              )}
              {currentStep === 4 && (
                <Step4Location
                  onSubmit={onStep4Submit}
                  defaultValues={listingData || {}}
                  isLoading={isLoading}
                />
              )}
              {currentStep === 5 && (
                <Step5Photos
                  listingId={listingId!}
                  defaultPrimaryUrl={listingData?.primaryPhotoUrl}
                  defaultPrimaryId={listingData?.primaryPhotoPublicId}
                  defaultGallery={listingData?.galleryPhotos}
                  defaultOwnershipUrl={listingData?.ownershipProofUrl}
                  defaultInsuranceUrl={listingData?.insuranceCertificateUrl}
                  onReady={onStep5Next}
                  onUpdate={setListingData}
                  isLoading={isLoading}
                />
              )}
              {currentStep === 6 && listingData && (
                <Step6Review
                  listing={listingData}
                  onSubmit={onStep6Submit}
                  isLoading={isLoading}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t flex justify-between items-center shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handleBack}
            disabled={isLoading}
          >
            {currentStep === 1 ? (
              "Cancel"
            ) : (
              <span className="flex items-center gap-1.5">
                <ArrowLeft className="h-4 w-4" /> Back
              </span>
            )}
          </Button>

          {currentStep === 5 ? (
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={onStep5Next}
              disabled={isLoading}
            >
              Continue <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          ) : (
            <Button
              type="submit"
              form="step-form"
              className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : currentStep === 6 ? (
                "Publish Listing"
              ) : (
                <span className="flex items-center gap-1.5">
                  Continue <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
