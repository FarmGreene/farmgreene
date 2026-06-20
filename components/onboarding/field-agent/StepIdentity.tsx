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
import { PhoneInput } from "@/components/ui/phone-input";
import { NumericInput } from "@/components/ui/numeric-input";
import { FieldAgentFormData } from "./FieldAgentOnboardingModal";
import { PhotoCaptureField } from "./PhotoCaptureField";

export function StepIdentity() {
  const { control } = useFormContext<FieldAgentFormData>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Basic Identity</h3>
        <p className="text-sm text-gray-500">
          We need to verify who you are to trust your market data.
        </p>
      </div>

      {/* Profile Photo */}
      <PhotoCaptureField
        name="profilePhoto"
        label="Upload Profile Photo"
        sublabel="A clear selfie helps us verify you (max 5MB)"
      />

      <div className="space-y-4">
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium text-gray-900 mb-4">
          Optional Verification Docs
        </h4>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <FormField
            control={control}
            name="nin"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  National ID (NIN){" "}
                  <span className="text-xs text-gray-400 font-normal">
                    (Optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <NumericInput
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    maxLength={11}
                    placeholder="11-digit NIN"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="bvn"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  BVN{" "}
                  <span className="text-xs text-gray-400 font-normal">
                    (Optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <NumericInput
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    maxLength={11}
                    placeholder="11-digit BVN"
                  />
                </FormControl>
                <FormDescription className="text-[11px]">
                  Only required if you want to receive payments.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
