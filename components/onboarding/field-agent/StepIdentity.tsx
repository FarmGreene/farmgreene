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
import { Input } from "@/components/ui/input";
import { FieldAgentFormData } from "./FieldAgentOnboardingModal";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";

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

      {/* Profile Photo Placeholder - In a real app this would handle file upload */}
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
        <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
          <Camera className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-700">
          Upload Profile Photo
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Selfie required for verification
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="080..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                  <Input placeholder="11-digit NIN" {...field} />
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
                  <Input placeholder="11-digit BVN" {...field} />
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
