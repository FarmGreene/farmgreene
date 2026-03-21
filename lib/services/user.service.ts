import { apiClient as api } from "@/lib/api/axios";

export interface AgentStats {
  submissionsToday: number;
  submissionsThisWeek: number;
  pendingReviews: number;
  totalEarnings: number;
  accuracyScore: number;
  submissionsCount: number;
  earningsTrend: number;
  points: number;
  currentStreak: number;
}

export const userService = {
  getAgentStats: async (): Promise<AgentStats> => {
    const { data } = await api.get<AgentStats>("/users/agent-stats");
    return data;
  },
};
