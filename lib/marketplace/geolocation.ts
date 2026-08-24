"use client";

import { useCallback, useState } from "react";

/** Listings further than this from the user are excluded from "Near You". */
export const NEAR_YOU_RADIUS_KM = 100;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance between two lat/lng points, in kilometers. */
export function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export type UserLocationStatus = "idle" | "loading" | "granted" | "denied" | "unsupported";

/**
 * Opt-in browser geolocation. Never auto-prompts — callers must invoke
 * `request()` from a user gesture (e.g. a button), since an unsolicited
 * permission prompt on page load is both bad UX and often auto-blocked.
 */
export function useUserLocation() {
  const [status, setStatus] = useState<UserLocationStatus>("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const request = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setStatus("granted");
      },
      () => {
        setStatus("denied");
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 10 * 60 * 1000 },
    );
  }, []);

  return { status, coords, request };
}
