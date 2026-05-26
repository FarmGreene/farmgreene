export type UserRole = "owner" | "renter";

export type AvailabilityStatus = "available" | "rented" | "maintenance";
export type RentalStatus =
  | "pending"
  | "active"
  | "completed"
  | "cancelled"
  | "rejected";

export type ListingStatus =
  | "draft"
  | "pending_review"
  | "active"
  | "paused"
  | "rejected";

export type EquipmentCategory =
  | "Tractors & Power"
  | "Harvesting"
  | "Planting & Seeding"
  | "Irrigation Systems"
  | "Processing & Storage"
  | "Tractor Attachments"
  | "Hand Tools & Accessories";

export type EquipmentCondition = "excellent" | "good" | "fair";
export type FuelType = "petrol" | "diesel" | "electric" | "manual";
export type MaintenanceStatus = "ready" | "recently_serviced" | "under_maintenance";
export type RentalPeriod = "day" | "week" | "month";
export type CancellationPolicy = "flexible" | "moderate" | "strict";
export type AvailabilityType = "always" | "custom";

export interface EquipmentListing {
  id: string;
  ownerId: string;
  name: string;
  category: EquipmentCategory;
  subcategory?: string;
  brand?: string;
  model?: string;
  yearManufactured?: number;
  description?: string;
  location: string; // derived: "city, state"
  price: number; // derived from primaryPeriod price
  period: RentalPeriod;
  status: ListingStatus;
  completedStep: number;
  // Specs
  condition?: EquipmentCondition;
  engineHours?: number;
  horsePower?: number;
  fuelType?: FuelType;
  weightKg?: number;
  additionalSpecs?: string;
  maintenanceStatus?: MaintenanceStatus;
  lastServiceDate?: string;
  // Pricing
  pricePerDay?: number;
  pricePerWeek?: number;
  pricePerMonth?: number;
  primaryPeriod?: RentalPeriod;
  minRentalDays?: number;
  maxRentalDays?: number;
  depositRequired?: boolean;
  depositAmount?: number;
  includesOperator?: boolean;
  operatorChargePerDay?: number;
  cancellationPolicy?: CancellationPolicy;
  additionalRules?: string;
  // Location
  state?: string;
  lga?: string;
  city?: string;
  exactAddress?: string;
  landmark?: string;
  deliveryAvailable?: boolean;
  deliveryRadiusKm?: number;
  deliveryFeePerKm?: number;
  availabilityType?: AvailabilityType;
  unavailableDates?: string[];
  advanceBookingDays?: number;
  // Photos
  primaryPhotoUrl?: string | null;
  primaryPhotoPublicId?: string | null;
  galleryPhotos?: Array<{ url: string; publicId: string }>;
  ownershipProofUrl?: string;
  insuranceCertificateUrl?: string;
  // Admin
  rejectionReason?: string | null;
  reviewedAt?: string | null;
  // Stats
  imageUrl?: string; // alias for primaryPhotoUrl for backwards compat
  stats?: {
    views: number;
    saves: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

/** Shape returned by every listing API endpoint */
export type ListingDraftResponse = EquipmentListing;

export interface RentalRequest {
  id: string;
  equipmentId: string;
  equipmentName: string;
  requesterName: string;
  requesterAvatar?: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  totalPrice: number;
  status: RentalStatus;
  requestDate: string;
}

export interface OwnerStats {
  totalListings: number;
  activeRentals: number;
  pendingRequests: number;
  totalEarnings: number;
  earningsChange: number; // Percentage change
}

export interface MarketplaceFilter {
  query: string;
  location?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  availableDates?: {
    start: Date;
    end: Date;
  };
}
