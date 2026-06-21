"use client";

import * as React from "react";

import { Input } from "./input";

export interface NumericInputProps {
  /** Digit-only string value */
  value?: string;
  /** Receives the sanitized digit-only string */
  onChange?: (value: string) => void;
  /** Maximum number of digits allowed */
  maxLength?: number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onBlur?: () => void;
}

/**
 * A text input that only accepts digits and (optionally) caps the length.
 * Useful for NIN, BVN, account numbers, etc. Emits the cleaned digit string.
 */
export function NumericInput({
  value,
  onChange,
  maxLength,
  ...props
}: NumericInputProps) {
  return (
    <Input
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={value ?? ""}
      onChange={(e) => {
        let digits = e.target.value.replace(/\D/g, "");
        if (maxLength != null) digits = digits.slice(0, maxLength);
        onChange?.(digits);
      }}
      {...props}
    />
  );
}
