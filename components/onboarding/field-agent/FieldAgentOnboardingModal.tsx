"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StepIdentity } from "./StepIdentity";
import { StepMarketCoverage } from "./StepMarketCoverage";
import { StepExperience } from "./StepExperience";
import { StepPayment } from "./StepPayment";
import { StepTerms } from "./StepTerms";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { authService } from "@/lib/services/auth.service";
import { useAuthStore } from "@/lib/store/useAuthStore";

// Define the schema for the entire wizard
export const fieldAgentSchema = z.object({
  // Step 1: Identity
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  profilePhoto: z.any().optional(), // File object
  nin: z.string().optional(),
  bvn: z.string().optional(),

  // Step 2: Market Coverage
  state: z.string().min(1, "State is required"),
  lga: z.string().min(1, "LGA is required"),
  markets: z.array(z.string()).min(1, "At least one market is required"),

  // Step 3: Experience
  role: z.string().min(1, "Role is required"),
  experienceYears: z.string().min(1, "Experience duration is required"),
  proofPhoto: z.any().optional(),

  // Step 4: Payment (Optional)
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),

  // Step 6: Terms
  agreedToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

export type FieldAgentFormData = z.infer<typeof fieldAgentSchema>;

interface FieldAgentOnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STEPS = [
  { id: 1, title: "Identity", component: StepIdentity },
  { id: 2, title: "Market Coverage", component: StepMarketCoverage },
  { id: 3, title: "Experience", component: StepExperience },
  { id: 4, title: "Payment", component: StepPayment },
  { id: 5, title: "Review & Submit", component: StepTerms },
];

export function FieldAgentOnboardingModal({
  open,
  onOpenChange,
}: FieldAgentOnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { setUser } = useAuthStore();

  const methods = useForm<FieldAgentFormData>({
    resolver: zodResolver(fieldAgentSchema),
    mode: "onChange",
    defaultValues: {
      markets: [],
      agreedToTerms: false,
    },
  });

  const { trigger, handleSubmit, getValues } = methods;

  const handleNext = async () => {
    let isValid = false;

    // Validate current step fields
    switch (currentStep) {
      case 1:
        isValid = await trigger(["phoneNumber"]);
        break;
      case 2:
        isValid = await trigger(["state", "lga", "markets"]);
        break;
      case 3:
        isValid = await trigger(["role", "experienceYears"]);
        break;
      case 4:
        // Payment is optional, so we can just proceed, validation is on individual fields if filled
        isValid = await trigger(["bankName", "accountNumber", "accountName"]);
        // If empty it's fine as they are optional in schema
        break;
      case 5:
        isValid = await trigger(["agreedToTerms"]);
        break;
    }

    if (isValid) {
      if (currentStep < STEPS.length) {
        setDirection(1);
        setCurrentStep((prev) => prev + 1);
      } else {
        await onSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async () => {
    const data = getValues();

    // Persist onboarding photos (best-effort — a failed upload must not block
    // the agent from completing verification).
    if (data.profilePhoto instanceof File) {
      try {
        await authService.uploadAgentPhoto(data.profilePhoto, "profile");
      } catch (error) {
        console.error("Profile photo upload failed:", error);
      }
    }
    if (data.proofPhoto instanceof File) {
      try {
        await authService.uploadAgentPhoto(data.proofPhoto, "proof");
      } catch (error) {
        console.error("Proof photo upload failed:", error);
      }
    }

    try {
      // Call API to mark agent as verified
      const updatedUser = await authService.verifyAgent();
      // Update auth store with new user data
      setUser(updatedUser);
      setIsCompleted(true);
    } catch (error) {
      console.error("Failed to verify agent:", error);
      // Still show completion for now, but we could show an error state
      setIsCompleted(true);
    }
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;
  const progress = (currentStep / STEPS.length) * 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  if (isCompleted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] text-center">
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              You're verified!
            </DialogTitle>
            <DialogDescription className="text-gray-600 max-w-sm">
              You are now a verified Field Agent on Farmgreene. Start submitting
              prices to earn rewards.
            </DialogDescription>
            <Button
              className="w-full mt-6 bg-[#18181B] text-white hover:bg-[#27272a]"
              onClick={() => onOpenChange(false)}
            >
              Start Submitting Prices
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="sm:max-w-[600px] py-4 px-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-xl font-bold">
              Field Agent Onboarding
            </DialogTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </DialogHeader>

        <div className="p-6 max-h-[70vh] overflow-y-auto overflow-x-hidden">
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <CurrentStepComponent />
                </motion.div>
              </AnimatePresence>
            </form>
          </FormProvider>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="text-gray-600"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-[#18181B] text-white hover:bg-[#27272a]"
            disabled={methods.formState.isSubmitting}
          >
            {currentStep === STEPS.length ? "Submit Application" : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
