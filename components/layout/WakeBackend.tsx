"use client";

import { useEffect } from "react";

/**
 * Fire-and-forget warm-up ping. On a free-tier host the API sleeps after idle
 * and cold-starts (~30–50s). Pinging the lightweight /health endpoint as soon
 * as a visitor lands on a public page wakes the server in the background, so it
 * is (usually) warm by the time they reach login. Errors are ignored on
 * purpose — this is purely an optimization.
 */
export function WakeBackend() {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;
    if (!base) return;
    const version = process.env.NEXT_PUBLIC_API_VERSION ?? "v1";

    fetch(`${base}/api/${version}/health`, {
      method: "GET",
      cache: "no-store",
      keepalive: true,
    }).catch(() => {
      // Server may be cold/unreachable — that's expected; ignore.
    });
  }, []);

  return null;
}
