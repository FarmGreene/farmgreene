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
import { Checkbox } from "@/components/ui/checkbox";
import { FieldAgentFormData } from "./FieldAgentOnboardingModal";
import { ShieldCheck } from "lucide-react";

export function StepTerms() {
  const { control } = useFormContext<FieldAgentFormData>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Final Agreement
          </h3>
        </div>
        <p className="text-sm text-gray-500">
          Please review and agree to the terms to become a verified agent.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border text-sm text-gray-700 space-y-3">
        <p>
          By signing up as a Field Agent, you agree to safeguard the integrity
          of Farmgreene's market data.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            You will provide accurate, real-time prices from physical markets.
          </li>
          <li>You will not fabricate or guess prices.</li>
          <li>
            You understand that consistent submission of false data will lead to
            permanent account suspension.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="agreedToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to provide accurate and honest market data
                </FormLabel>
                <FormDescription>
                  I understand the consequences of providing false data.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
