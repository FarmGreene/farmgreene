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

export function StepPayment() {
  const { control } = useFormContext<FieldAgentFormData>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          Payment Details{" "}
          <span className="text-gray-400 font-normal text-base ml-2">
            (Optional)
          </span>
        </h3>
        <p className="text-sm text-gray-500">
          Where should we send your earnings? You can skip this and add it
          later.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. GTBank, Zenith Bank, OPay"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="10-digit account number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Name on account" {...field} />
              </FormControl>
              <FormDescription>
                Ensure this matches your verified name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
