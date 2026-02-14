export type UserRole = "owner" | "renter";

export type AvailabilityStatus = "available" | "rented" | "maintenance";
export type RentalStatus =
  | "pending"
  | "active"
  | "completed"
  | "cancelled"
  | "rejected";

export interface EquipmentListing {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  period: "day" | "week" | "month"; // e.g. /day
  status: AvailabilityStatus;
  imageUrl?: string;
  stats?: {
    views: number;
    saves: number;
  };
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
