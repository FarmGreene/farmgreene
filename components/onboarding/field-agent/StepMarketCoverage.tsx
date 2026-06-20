"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldAgentFormData } from "./FieldAgentOnboardingModal";
import { MapPin, X } from "lucide-react";
import {
  NIGERIAN_STATES,
  getLgasForState,
} from "@/lib/data/nigeria-states-lgas";

// ─── Markets tag input ──────────────────────────────────────────────────────

function MarketsTagInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [text, setText] = useState("");
  const markets = value ?? [];

  const addMarket = (raw: string) => {
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) return;
    const merged = [...markets];
    for (const part of parts) {
      if (!merged.some((m) => m.toLowerCase() === part.toLowerCase())) {
        merged.push(part);
      }
    }
    onChange(merged);
    setText("");
  };

  const removeMarket = (market: string) =>
    onChange(markets.filter((m) => m !== market));

  return (
    <div className="border-input dark:bg-input/30 flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border bg-transparent px-2 py-1.5 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-green-600/80 focus-within:ring-[3px] focus-within:ring-green-600/30">
      {markets.map((market) => (
        <span
          key={market}
          className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300"
        >
          {market}
          <button
            type="button"
            onClick={() => removeMarket(market)}
            className="text-green-700/70 transition-colors hover:text-green-900 dark:hover:text-green-100"
            aria-label={`Remove ${market}`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addMarket(text);
          } else if (e.key === "Backspace" && !text && markets.length) {
            removeMarket(markets[markets.length - 1]);
          }
        }}
        onBlur={() => {
          if (text.trim()) addMarket(text);
        }}
        placeholder={markets.length ? "Add another…" : "Type a market, then press Enter"}
        className="placeholder:text-muted-foreground min-w-[140px] flex-1 bg-transparent py-0.5 outline-none"
      />
    </div>
  );
}

// ─── Step ────────────────────────────────────────────────────────────────────

export function StepMarketCoverage() {
  const { control, watch, setValue } = useFormContext<FieldAgentFormData>();
  const selectedState = watch("state");
  const lgas = getLgasForState(selectedState);

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
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                    // Reset the dependent LGA whenever the state changes.
                    setValue("lga", "", { shouldValidate: false });
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-72">
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
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!selectedState}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          selectedState ? "Select LGA" : "Select a state first"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-72">
                    {lgas.map((lga) => (
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
              <FormLabel>Market(s) you cover</FormLabel>
              <FormControl>
                <MarketsTagInput
                  value={field.value ?? []}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Add each market by name — press Enter after each one. Add as many
                as you cover.
              </FormDescription>
              <FormMessage />
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
