"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface AmountInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: number | string | null;
  onChange?: (value: number | undefined) => void;
  error?: boolean;
}

const formatNumber = (val: string | number | undefined | null): string => {
  if (val === undefined || val === null || val === "") return "";
  // Strip non-digits
  const cleanVal = String(val).replace(/[^\d]/g, "");
  if (!cleanVal) return "";
  return Number(cleanVal).toLocaleString("en-US");
};

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  ({ value, onChange, className, placeholder, disabled, error, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState("");

    // Sync external value with local display state
    useEffect(() => {
      if (value === undefined || value === null || value === "") {
        setDisplayValue("");
      } else {
        setDisplayValue(formatNumber(value));
      }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawInput = e.target.value;
      // Strip everything except digits
      const cleanInput = rawInput.replace(/[^\d]/g, "");

      if (!cleanInput) {
        setDisplayValue("");
        onChange?.(undefined);
        return;
      }

      // Format local display state
      const formatted = Number(cleanInput).toLocaleString("en-US");
      setDisplayValue(formatted);

      // Notify parent forms of the raw numeric representation
      onChange?.(Number(cleanInput));
    };

    return (
      <div className="relative flex items-center w-full">
        {/* Naira currency symbol at the left of the field */}
        <span className="absolute left-3 text-slate-400 dark:text-slate-500 font-semibold select-none text-sm pointer-events-none">
          ₦
        </span>
        <Input
          type="text"
          ref={ref}
          value={displayValue}
          onChange={handleInputChange}
          className={cn(
            "pl-8 pr-3 w-full transition-all",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);

AmountInput.displayName = "AmountInput";
