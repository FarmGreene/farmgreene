import * as z from "zod";

const currentYear = new Date().getFullYear();

// ─── Helpers for Optional Number Coercion ────────────────────────────────────
// Coerces empty strings, nulls, and NaNs to undefined, allowing
// optional schemas to pass validation instead of failing on NaN/null.
// Adding z.null() to the union ensures that database null values from drafts
// pass validation cleanly rather than throwing resolver exceptions.

const optionalInt = z
  .union([z.number(), z.string(), z.nan(), z.null()])
  .optional()
  .transform((val) => {
    if (val === "" || val === null || val === undefined || Number.isNaN(val)) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : Math.floor(num);
  })
  .refine((val) => val === undefined || val >= 0, {
    message: "Must be a non-negative integer",
  });

const optionalNumber = z
  .union([z.number(), z.string(), z.nan(), z.null()])
  .optional()
  .transform((val) => {
    if (val === "" || val === null || val === undefined || Number.isNaN(val)) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  })
  .refine((val) => val === undefined || val >= 0, {
    message: "Must be a non-negative number",
  });

const optionalHorsePower = z
  .union([z.number(), z.string(), z.nan(), z.null()])
  .optional()
  .transform((val) => {
    if (val === "" || val === null || val === undefined || Number.isNaN(val)) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  })
  .refine((val) => val === undefined || (val >= 0 && val <= 999), {
    message: "Horsepower must be between 0 and 999",
  });

const optionalDeliveryRadius = z
  .union([z.number(), z.string(), z.nan(), z.null()])
  .optional()
  .transform((val) => {
    if (val === "" || val === null || val === undefined || Number.isNaN(val)) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  })
  .refine((val) => val === undefined || val >= 1, {
    message: "Minimum delivery radius is 1 km",
  });

const optionalMaxRentalDays = z
  .union([z.number(), z.string(), z.nan(), z.null()])
  .optional()
  .transform((val) => {
    if (val === "" || val === null || val === undefined || Number.isNaN(val)) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : Math.floor(num);
  })
  .refine((val) => val === undefined || val >= 1, {
    message: "Minimum rental days is 1",
  });

// ─── Step 1: Basics ──────────────────────────────────────────────────────────

export const step1Schema = z.object({
  name: z.string().min(3, "Equipment name must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  subcategory: z.string().min(1, "Please select a subcategory"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().nullable().optional(),
  yearManufactured: z
    .number()
    .int()
    .min(1990, "Year must be 1990 or later")
    .max(currentYear, `Year cannot exceed ${currentYear}`),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(2000, "Description is too long"),
});

export type Step1Data = z.infer<typeof step1Schema>;

// ─── Step 2: Specifications ───────────────────────────────────────────────────

export const step2Schema = z.object({
  condition: z.enum(["excellent", "good", "fair"]),
  maintenanceStatus: z.enum(["ready", "recently_serviced", "under_maintenance"]),
  engineHours: optionalInt,
  horsePower: optionalHorsePower,
  fuelType: z.enum(["petrol", "diesel", "electric", "manual"]).nullable().optional(),
  weightKg: optionalNumber,
  additionalSpecs: z.string().max(1000).nullable().optional(),
  lastServiceDate: z.string().nullable().optional(),
});

export type Step2Data = z.infer<typeof step2Schema>;

// ─── Step 3: Pricing ─────────────────────────────────────────────────────────

export const step3Schema = z
  .object({
    pricePerDay: z
      .number()
      .min(500, "Minimum daily price is ₦500"),
    pricePerWeek: optionalNumber,
    pricePerMonth: optionalNumber,
    primaryPeriod: z.enum(["day", "week", "month"]),
    minRentalDays: z
      .number()
      .int()
      .min(1, "Minimum 1 day"),
    maxRentalDays: optionalMaxRentalDays,
    depositRequired: z.boolean(),
    depositAmount: optionalNumber,
    includesOperator: z.boolean(),
    operatorChargePerDay: optionalNumber,
    cancellationPolicy: z.enum(["flexible", "moderate", "strict"]),
    additionalRules: z.string().max(1000).nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.depositRequired && !data.depositAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["depositAmount"],
        message: "Deposit amount is required when deposit is enabled",
      });
    }
    if (
      data.primaryPeriod === "week" &&
      !data.pricePerWeek
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pricePerWeek"],
        message: "Weekly price is required when it's the primary period",
      });
    }
    if (
      data.primaryPeriod === "month" &&
      !data.pricePerMonth
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pricePerMonth"],
        message: "Monthly price is required when it's the primary period",
      });
    }
  });

export type Step3Data = z.infer<typeof step3Schema>;

// ─── Step 4: Location ─────────────────────────────────────────────────────────

export const step4Schema = z
  .object({
    state: z.string().min(2, "State is required"),
    lga: z.string().min(2, "LGA is required"),
    city: z.string().min(2, "City is required"),
    exactAddress: z.string().max(300).nullable().optional(),
    landmark: z.string().max(200).nullable().optional(),
    deliveryAvailable: z.boolean(),
    deliveryRadiusKm: optionalDeliveryRadius,
    deliveryFeePerKm: optionalNumber,
    availabilityType: z.enum(["always", "custom"]),
    unavailableDates: z.array(z.string()).nullable().optional(),
    advanceBookingDays: z
      .number()
      .int()
      .min(1, "Minimum 1 day advance notice"),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryAvailable && !data.deliveryRadiusKm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["deliveryRadiusKm"],
        message: "Delivery radius is required when delivery is enabled",
      });
    }
  });

export type Step4Data = z.infer<typeof step4Schema>;

// ─── Step 5: Photos — validated separately via upload callbacks ───────────────
// (No Zod schema needed; validation is done by checking listing.primaryPhotoUrl)

// ─── Step 6: Publish ─────────────────────────────────────────────────────────

export const step6Schema = z.object({
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
  agreeToAccuracyDeclaration: z.boolean().refine((val) => val === true, "You must confirm the accuracy"),
});

export type Step6Data = z.infer<typeof step6Schema>;

