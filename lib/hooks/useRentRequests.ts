import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReceivedRentRequests,
  getOwnerUtilization,
  acceptRentRequest,
  rejectRentRequest,
} from "@/lib/services/rent-request.service";

export const rentRequestKeys = {
  all: ["rent-requests"] as const,
  received: () => [...rentRequestKeys.all, "received"] as const,
  utilization: () => [...rentRequestKeys.all, "utilization"] as const,
};

/** Requests received across the current owner's listings. */
export function useReceivedRentRequests() {
  return useQuery({
    queryKey: rentRequestKeys.received(),
    queryFn: getReceivedRentRequests,
    staleTime: 60 * 1000,
  });
}

/** Fleet occupancy for the current month. */
export function useOwnerUtilization() {
  return useQuery({
    queryKey: rentRequestKeys.utilization(),
    queryFn: getOwnerUtilization,
    staleTime: 60 * 1000,
  });
}

export function useAcceptRentRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note?: string }) =>
      acceptRentRequest(id, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rentRequestKeys.received() });
      queryClient.invalidateQueries({ queryKey: rentRequestKeys.utilization() });
    },
  });
}

export function useRejectRentRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note?: string }) =>
      rejectRentRequest(id, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rentRequestKeys.received() });
    },
  });
}
