import { useQuery } from "@tanstack/react-query";
import { userService, AgentStats } from "@/lib/services/user.service";

export const userKeys = {
  all: ["user"] as const,
  stats: () => [...userKeys.all, "stats"] as const,
};

export function useAgentStats() {
  return useQuery({
    queryKey: userKeys.stats(),
    queryFn: () => userService.getAgentStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
