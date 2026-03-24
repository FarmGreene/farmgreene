import { apiClient } from "@/lib/api/axios";

export interface Assignment {
  id: string;
  commodity: {
    id: string;
    name: string;
    category: string | null;
    unit: string | null;
  };
  marketName: string | null;
  region: string | null;
  state: string | null;
  dueDate: string;
  frequency: "DAILY" | "WEEKLY";
  status: "PENDING" | "SUBMITTED" | "MISSED";
  submissionId: string | null;
  note: string | null;
  countdown: string;
  createdAt: string;
}

export interface AssignmentsResponse {
  data: Assignment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AssignmentMetrics {
  dueToday: number;
  overdue: number;
  completed: number;
  upcoming: number;
}

export interface AssignmentQueryParams {
  status?: string;
  category?: string;
  commodityId?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export async function getAssignments(
  params?: AssignmentQueryParams,
): Promise<AssignmentsResponse> {
  const res = await apiClient.get("/assignments", { params });
  return res.data;
}

export async function getAssignmentById(id: string): Promise<Assignment> {
  const res = await apiClient.get(`/assignments/${id}`);
  return res.data;
}

export async function getAssignmentMetrics(): Promise<AssignmentMetrics> {
  const res = await apiClient.get("/assignments/metrics");
  return res.data;
}
