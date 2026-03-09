import { useQuery } from "@tanstack/react-query";
import {
  getAssignments,
  getAssignmentById,
  type AssignmentQueryParams,
} from "@/lib/services/assignment.service";

export const assignmentKeys = {
  all: ["assignments"] as const,
  list: (params?: AssignmentQueryParams) =>
    [...assignmentKeys.all, "list", params] as const,
  detail: (id: string) => [...assignmentKeys.all, "detail", id] as const,
};

export function useAssignments(params?: AssignmentQueryParams) {
  return useQuery({
    queryKey: assignmentKeys.list(params),
    queryFn: () => getAssignments(params),
    staleTime: 2 * 60 * 1000, // 2 min cache
  });
}

export function useAssignment(id: string) {
  return useQuery({
    queryKey: assignmentKeys.detail(id),
    queryFn: () => getAssignmentById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}
