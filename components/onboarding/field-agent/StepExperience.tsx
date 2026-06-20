"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { FieldAgentFormData } from "./FieldAgentOnboardingModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { PhotoCaptureField } from "./PhotoCaptureField";

export function StepExperience() {
  const { control } = useFormContext<FieldAgentFormData>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          Experience & Reliability
        </h3>
        <p className="text-sm text-gray-500">
          Tell us about your experience in the market.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your role in the market?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="trader">Trader</SelectItem>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="aggregator">Aggregator</SelectItem>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="middleman">Middleman</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="experienceYears"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How long have you worked in this market?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="LESS_THAN_1" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Less than 1 year
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1_TO_3" />
                    </FormControl>
                    <FormLabel className="font-normal">1–3 years</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3_TO_5" />
                    </FormControl>
                    <FormLabel className="font-normal">3–5 years</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5_PLUS" />
                    </FormControl>
                    <FormLabel className="font-normal">5+ years</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <FormLabel className="mb-2 flex items-center gap-1.5">
            Proof of Activity (Optional)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Why add proof of activity?"
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[260px] text-xs leading-relaxed">
                  A quick photo at your shop, stall, or the market confirms you
                  actually work on the ground. Agents who add it are verified and
                  approved noticeably faster.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormLabel>
          <PhotoCaptureField
            name="proofPhoto"
            label="Upload Photo of Shop/Stall"
            sublabel="Increases trust in your data (max 5MB)"
          />
        </div>
      </div>
    </div>
  );
}
