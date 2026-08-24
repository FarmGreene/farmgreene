import * as z from "zod";

const currentYear = new Date().getFullYear();

const optionalNumber = z
  .union([z.number(), z.string(), z.nan(), z.null()])
  .optional()
  .transform((val) => {
    if (val === "" || val === null || val === undefined || Number.isNaN(val)) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  });

export const editListingSchema = z
  .object({
    // Basics
    name: z.string().min(3, "Name must be at least 3 characters").max(120),
    category: z.enum([
      "Tractors & Power",
      "Harvesting",
      "Planting & Seeding",
      "Irrigation Systems",
      "Processing & Storage",
      "Tractor Attachments",
      "Hand Tools & Accessories",
    ]),
    subcategory: z.string().min(1, "Subcategory is required"),
    brand: z.string().min(1, "Brand is required").max(80),
    model: z.string().max(80).nullable().optional(),
    yearManufactured: z
      .number()
      .int()
      .min(1990, "Year must be 1990 or later")
      .max(currentYear, `Year cannot exceed ${currentYear}`),
    description: z.string().min(50, "Description must be at least 50 characters").max(2000),

    // Specs
    condition: z.enum(["excellent", "good", "fair"]),
    maintenanceStatus: z.enum(["ready", "recently_serviced", "under_maintenance"]),
    engineHours: optionalNumber,
    horsePower: optionalNumber,
    fuelType: z.enum(["petrol", "diesel", "electric", "manual"]).nullable().optional(),
    weightKg: optionalNumber,
    additionalSpecs: z.string().max(1000).nullable().optional(),
    lastServiceDate: z.string().min(1, "Last service date is required"),

    // Pricing
    pricePerDay: z.number().min(500, "Minimum daily price is ₦500"),
    pricePerWeek: optionalNumber,
    pricePerMonth: optionalNumber,
    primaryPeriod: z.enum(["day", "week", "month"]),
    minRentalDays: z.number().int().min(1),
    maxRentalDays: optionalNumber,
    depositRequired: z.boolean(),
    depositAmount: optionalNumber,
    includesOperator: z.boolean(),
    operatorChargePerDay: optionalNumber,
    cancellationPolicy: z.enum(["flexible", "moderate", "strict"]),
    additionalRules: z.string().max(1000).nullable().optional(),

    // Location
    state: z.string().min(2, "State is required"),
    lga: z.string().min(2, "LGA is required"),
    city: z.string().min(2, "City is required"),
    exactAddress: z.string().max(300).nullable().optional(),
    landmark: z.string().max(200).nullable().optional(),
    deliveryAvailable: z.boolean(),
    deliveryRadiusKm: optionalNumber,
    deliveryFeePerKm: optionalNumber,
    availabilityType: z.enum(["always", "custom"]),
    advanceBookingDays: z.number().int().min(1),
  })
  .superRefine((data, ctx) => {
    if (data.depositRequired && !data.depositAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["depositAmount"],
        message: "Deposit amount is required when deposit is enabled",
      });
    }
    if (data.deliveryAvailable && !data.deliveryRadiusKm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["deliveryRadiusKm"],
        message: "Delivery radius is required when delivery is enabled",
      });
    }
  });

export type EditListingData = z.infer<typeof editListingSchema>;
