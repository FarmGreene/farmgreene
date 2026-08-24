import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAlerts,
  createAlert,
  pauseAlert,
  resumeAlert,
  deleteAlert,
} from "@/lib/services/alert.service";
import type { CreatePriceAlertBody } from "@/types/alert";

export const alertKeys = {
  all: ["alerts"] as const,
  list: () => [...alertKeys.all, "list"] as const,
};

export function useAlerts() {
  return useQuery({
    queryKey: alertKeys.list(),
    queryFn: getAlerts,
    staleTime: 60 * 1000,
  });
}

export function useCreateAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreatePriceAlertBody) => createAlert(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: alertKeys.list() }),
  });
}

export function usePauseAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => pauseAlert(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: alertKeys.list() }),
  });
}

export function useResumeAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resumeAlert(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: alertKeys.list() }),
  });
}

export function useDeleteAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAlert(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: alertKeys.list() }),
  });
}
