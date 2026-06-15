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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const COMMODITIES = [
  "Maize",
  "Rice",
  "Cassava",
  "Yam",
  "Beans",
  "Sorghum",
  "Fertilizer",
  "Poultry Feed",
  "Soybeans",
  "Palm Oil",
  "Groundnut",
  "Millet",
  "Cocoa",
  "Cashew Nuts",
];

export function StepCommodityCoverage() {
  const { control } = useFormContext<FieldAgentFormData>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          Commodity Coverage
        </h3>
        <p className="text-sm text-gray-500">
          Select all the commodities you can reliably report on.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="commodities"
          render={() => (
            <FormItem>
              <FormLabel className="mb-4 block">Select Commodities</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {COMMODITIES.map((item) => (
                  <FormField
                    key={item}
                    control={control}
                    name="commodities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {item}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 border-t">
          <FormField
            control={control}
            name="reportingFrequency"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>How often can you report prices?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="DAILY" />
                      </FormControl>
                      <FormLabel className="font-normal">Daily</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3X_WEEKLY" />
                      </FormControl>
                      <FormLabel className="font-normal">3x per week</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="WEEKLY" />
                      </FormControl>
                      <FormLabel className="font-normal">Weekly</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
