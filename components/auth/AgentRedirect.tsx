"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";

/**
 * Field agents have their own dedicated app. If an AGENT-role user lands in the
 * consumer app, send them to the agent app. The target is configured via
 * NEXT_PUBLIC_AGENT_APP_URL (defaults to the local agent app in development).
 *
 * Renders nothing. Mounted in the protected layout so it runs on every
 * authenticated page.
 */
export function AgentRedirect() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user?.roles?.includes("AGENT")) return;
    const target =
      process.env.NEXT_PUBLIC_AGENT_APP_URL ?? "http://localhost:3100";
    // Hard navigation — the agent app is a separate origin.
    window.location.assign(target);
  }, [user]);

  return null;
}
