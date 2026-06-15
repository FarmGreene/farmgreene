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
import { Camera } from "lucide-react";

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
          <FormLabel className="mb-2 block">
            Proof of Activity (Optional)
          </FormLabel>
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
              <Camera className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              Upload Photo of Shop/Stall
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Increases trust in your data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
