import {
  EquipmentListing,
  OwnerStats,
  RentalRequest,
} from "@/types/marketplace";

export const MOCK_OWNER_STATS: OwnerStats = {
  totalListings: 4,
  activeRentals: 1,
  pendingRequests: 2,
  totalEarnings: 154000, // In local currency
  earningsChange: 12, // +12%
};

export const MOCK_MY_LISTINGS: EquipmentListing[] = [
  {
    id: "1",
    name: "John Deere 5050D Tractor",
    category: "Tractors",
    location: "Osogbo, Osun",
    price: 45000,
    period: "day",
    status: "available",
    stats: { views: 124, saves: 12 },
  },
  {
    id: "2",
    name: "Cassava Peeling Machine",
    category: "Processing",
    location: "Ilesa, Osun",
    price: 15000,
    period: "day",
    status: "rented",
    stats: { views: 89, saves: 5 },
  },
  {
    id: "3",
    name: "Knapsack Sprayer (Manual)",
    category: "Tools",
    location: "Ede, Osun",
    price: 2000,
    period: "day",
    status: "available",
    stats: { views: 45, saves: 2 },
  },
  {
    id: "4",
    name: "Yam Harvester Attachment",
    category: "Harvesting",
    location: "Ikire, Osun",
    price: 10000,
    period: "day",
    status: "maintenance",
    stats: { views: 12, saves: 0 },
  },
];

export const MOCK_RENTAL_REQUESTS: RentalRequest[] = [
  {
    id: "req_1",
    equipmentId: "1",
    equipmentName: "John Deere 5050D Tractor",
    requesterName: "Adekunle Farms Ltd",
    startDate: "2024-03-10",
    endDate: "2024-03-15",
    totalPrice: 225000,
    status: "pending",
    requestDate: "2024-03-01",
  },
  {
    id: "req_2",
    equipmentId: "3",
    equipmentName: "Knapsack Sprayer",
    requesterName: "Green Earth Co-op",
    startDate: "2024-03-12",
    endDate: "2024-03-12",
    totalPrice: 2000,
    status: "pending",
    requestDate: "2024-03-02",
  },
];

export const MOCK_BROWSER_LISTINGS: EquipmentListing[] = [
  ...MOCK_MY_LISTINGS,
  {
    id: "5",
    name: "Drip Irrigation Kit (1 Acre)",
    category: "Irrigation",
    location: "Osogbo, Osun",
    price: 35000,
    period: "week",
    status: "available",
    stats: { views: 200, saves: 45 },
  },
  {
    id: "6",
    name: "Heavy Duty Harrow",
    category: "Tractor Attachments",
    location: "Ife, Osun",
    price: 12000,
    period: "day",
    status: "available",
    stats: { views: 56, saves: 8 },
  },
];
