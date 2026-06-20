import * as z from "zod";
import { EquipmentCategory } from "@/types/marketplace";

const CATEGORY_VALUES: [EquipmentCategory, ...EquipmentCategory[]] = [
  "Tractors & Power",
  "Harvesting",
  "Planting & Seeding",
  "Irrigation Systems",
  "Processing & Storage",
  "Tractor Attachments",
  "Hand Tools & Accessories",
];

export const agentListingSchema = z.object({
  // Owner
  ownerName: z.string().min(2, "Owner name is required."),
  ownerPhone: z
    .string()
    .min(7, "A valid phone number is required.")
    .max(20, "Phone number is too long.")
    .regex(/^[0-9+\s-]+$/, "Phone can only contain digits, +, spaces or -."),
  // Equipment
  name: z.string().min(3, "Equipment name is required."),
  category: z.enum(CATEGORY_VALUES, {
    message: "Select a category.",
  }),
  condition: z.enum(["excellent", "good", "fair"]).optional(),
  // Pricing
  pricePerDay: z
    .string()
    .min(1, "Daily price is required.")
    .refine((v) => {
      const n = Number(v.replace(/,/g, ""));
      return !isNaN(n) && n > 0;
    }, "Price must be a positive number."),
  // Location
  state: z.string().min(1, "State is required."),
  lga: z.string().optional(),
  city: z.string().optional(),
  landmark: z.string().optional(),
  // Captured GPS (set via the Capture button)
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  // Extras
  includesOperator: z.boolean().optional(),
  deliveryAvailable: z.boolean().optional(),
});

export type AgentListingFormValues = z.infer<typeof agentListingSchema>;
