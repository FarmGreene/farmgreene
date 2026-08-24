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

/** Off-platform owner recruited in the field by an agent */
export interface EquipmentOwner {
  id: string;
  fullName: string;
  phone: string;
  state?: string;
  lga?: string;
  notes?: string;
  createdByAgentId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface EquipmentListing {
  id: string;
  ownerId: string | null;
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
  latitude?: number | null;
  longitude?: number | null;
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
  // Agent onboarding
  agentVerified?: boolean;
  equipmentOwnerId?: string | null;
  equipmentOwner?: EquipmentOwner | null;
  onboardedByAgentId?: string | null;
  // Admin
  rejectionReason?: string | null;
  reviewedAt?: string | null;
  /** Staged edit awaiting admin approval (ACTIVE listings only); null if none. */
  pendingChanges?: Record<string, unknown> | null;
  pendingChangesSubmittedAt?: string | null;
  /** Set when an admin rejects a staged edit; cleared on the next edit submission. */
  lastEditRejectionReason?: string | null;
  // Archive (owner-hidden; separate from status)
  archivedAt?: string | null;
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

/** Every field the edit form can submit — all optional (partial edit). */
export interface EditListingBody {
  name: string;
  category: EquipmentCategory;
  subcategory: string;
  brand: string;
  model?: string | null;
  yearManufactured: number;
  description: string;
  condition: EquipmentCondition;
  maintenanceStatus: MaintenanceStatus;
  engineHours?: number;
  horsePower?: number;
  fuelType?: FuelType | null;
  weightKg?: number;
  additionalSpecs?: string | null;
  lastServiceDate: string;
  pricePerDay: number;
  pricePerWeek?: number;
  pricePerMonth?: number;
  primaryPeriod: RentalPeriod;
  minRentalDays: number;
  maxRentalDays?: number;
  depositRequired: boolean;
  depositAmount?: number;
  includesOperator: boolean;
  operatorChargePerDay?: number;
  cancellationPolicy: CancellationPolicy;
  additionalRules?: string | null;
  state: string;
  lga: string;
  city: string;
  exactAddress?: string | null;
  landmark?: string | null;
  deliveryAvailable: boolean;
  deliveryRadiusKm?: number;
  deliveryFeePerKm?: number;
  availabilityType: AvailabilityType;
  advanceBookingDays: number;
}

/** Non-PII owner summary attached to public listings. */
export interface PublicOwnerSummary {
  firstName: string | null;
  avatarUrl: string | null;
  isVerified: boolean;
}

/** A listing served to unauthenticated buyers (owner PII + exact address
 *  stripped by the backend). */
export type PublicListing = EquipmentListing & {
  owner?: PublicOwnerSummary | null;
};

// ─── Rent requests (buyer-side, no payment) ───────────────────────────────────

export type RentRequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "completed";

/** Computed cost breakdown shown before submitting a request. */
export interface RentEstimate {
  rentalDays: number;
  ratePeriod: RentalPeriod;
  unitPrice: number;
  subtotal: number;
  depositAmount: number;
  operatorCharge: number;
  deliveryFee: number;
  estimatedTotal: number;
}

export interface CreateRentRequestPayload {
  listingId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  operatorRequested?: boolean;
  deliveryRequested?: boolean;
  message?: string;
}

export interface RentRequestListingSummary {
  id: string;
  name: string;
  primaryPhotoUrl?: string | null;
  state?: string;
  lga?: string;
}

/** A person on a rent request (renter to owner, or owner contact to renter). */
export interface RentRequestParty {
  id?: string;
  firstName: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface RentRequest {
  id: string;
  listingId: string;
  listing: RentRequestListingSummary | null;
  startDate: string;
  endDate: string;
  rentalDays: number;
  ratePeriod: RentalPeriod;
  unitPrice: number;
  subtotal: number;
  depositAmount: number;
  operatorRequested: boolean;
  operatorCharge: number;
  deliveryRequested: boolean;
  deliveryFee: number;
  estimatedTotal: number;
  message: string | null;
  status: RentRequestStatus;
  ownerResponseNote: string | null;
  createdAt: string;
  /** Present on the owner's "received" view. */
  renter?: RentRequestParty | null;
  /** Present on the renter's "mine" view once the request is accepted. */
  ownerContact?: RentRequestParty | null;
  /** Revealed to the renter only after acceptance. */
  exactAddress?: string | null;
}

/** Payload an agent submits to quick-add a listing on an owner's behalf */
export interface CreateAgentListingInput {
  existingOwnerId?: string;
  owner?: {
    fullName: string;
    phone: string;
    state?: string;
    lga?: string;
    notes?: string;
  };
  name: string;
  category: EquipmentCategory;
  subcategory?: string;
  condition?: EquipmentCondition;
  pricePerDay: number;
  primaryPeriod?: RentalPeriod;
  state?: string;
  lga?: string;
  city?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  includesOperator?: boolean;
  deliveryAvailable?: boolean;
}

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

/** Fleet occupancy for the current calendar month. */
export interface OwnerUtilization {
  occupancyRate: number; // 0–100 (%)
  previousRate: number; // 0–100 (%) last month
  changePoints: number; // occupancyRate − previousRate (percentage points)
  bookedDays: number;
  availableDays: number;
  activeListings: number;
  daysInMonth: number;
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
