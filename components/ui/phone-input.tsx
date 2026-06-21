"use client";

import * as React from "react";
import PhoneInputNational from "react-phone-number-input/input";

import { cn } from "@/lib/utils";

export interface PhoneInputProps {
  /** E.164 value, e.g. "+2348012345678" */
  value?: string;
  /** Receives the E.164 value (or undefined when cleared) */
  onChange?: (value?: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onBlur?: () => void;
}

/**
 * Phone number input locked to Nigeria (+234).
 *
 * Formats the national number as the user types (via react-phone-number-input)
 * while emitting a clean E.164 value through `onChange`. The country is fixed —
 * there's no country switcher — and a static 🇳🇬 +234 prefix is shown.
 *
 * Styled to match the shadcn `Input` component.
 */
const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    { value, onChange, placeholder = "801 234 5678", className, disabled, ...props },
    ref,
  ) => {
    return (
      <div
        data-slot="phone-input"
        className={cn(
          "border-input dark:bg-input/30 flex h-9 w-full min-w-0 items-center gap-2 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] md:text-sm",
          "focus-within:border-green-600/80 focus-within:ring-green-600/30 focus-within:ring-[3px]",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          className,
        )}
      >
        <span className="text-muted-foreground flex select-none items-center gap-1">
          <span aria-hidden className="text-base leading-none">
            🇳🇬
          </span>
          <span className="text-sm font-medium">+234</span>
        </span>
        <span aria-hidden className="bg-border h-5 w-px" />
        <PhoneInputNational
          ref={ref}
          country="NG"
          international={false}
          withCountryCallingCode={false}
          value={value}
          onChange={(v?: string) => onChange?.(v)}
          placeholder={placeholder}
          disabled={disabled}
          inputMode="tel"
          autoComplete="tel-national"
          className="placeholder:text-muted-foreground flex-1 bg-transparent outline-none disabled:cursor-not-allowed"
          {...props}
        />
      </div>
    );
  },
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
