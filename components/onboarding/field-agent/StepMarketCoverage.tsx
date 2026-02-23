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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldAgentFormData } from "./FieldAgentOnboardingModal";
import { MapPin } from "lucide-react";

// Mock Data for States and LGAs
const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

// Simplified LGA mock - in production this would depend on selected state
const MOCK_LGAS = [
  "Zaria",
  "Kaduna North",
  "Kaduna South",
  "Chikun",
  "Sabon Gari",
  "Giwa",
  "Birnin Gwari",
];

export function StepMarketCoverage() {
  const { control, watch, setValue } = useFormContext<FieldAgentFormData>();
  const selectedState = watch("state");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Market Coverage</h3>
        <p className="text-sm text-gray-500">
          Where will you be reporting prices from? Accurate location data is
          critical.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Primary State</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {NIGERIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lga"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Local Government Area (LGA)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!selectedState}
                >
                  <FormControl>
                    <SelectTrigger className="w-fullV">
                      <SelectValue placeholder="Select LGA" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MOCK_LGAS.map((lga) => (
                      <SelectItem key={lga} value={lga}>
                        {lga}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="markets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specific Market(s)</FormLabel>
              {/* Simplified for prototype - comma separated or simple input */}
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="e.g. Sabon Gari Market, Central Market"
                    className="pl-9"
                    value={field.value?.join(", ") || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      )
                    }
                  />
                </div>
              </FormControl>
              <FormDescription>
                Enter the names of markets you cover, separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="hasMultipleMarkets"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I cover multiple markets</FormLabel>
                <FormDescription>
                  Check this if you plan to report from more than one location.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
        <MapPin className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <h5 className="text-sm font-medium text-blue-900">GPS Location</h5>
          <p className="text-xs text-blue-700 mt-1">
            We'll ask for precise GPS location when you submit your first price
            report.
          </p>
        </div>
      </div>
    </div>
  );
}
