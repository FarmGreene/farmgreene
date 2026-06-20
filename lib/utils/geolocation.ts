export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

/**
 * Capture the device's current GPS position. Intended for field agents who are
 * physically standing at the equipment during onboarding.
 *
 * Resolves with lat/lng/accuracy or rejects with a human-readable message.
 */
export function captureLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Location is not supported on this device."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error(
                "Location permission denied. Enable it to tag the equipment.",
              ),
            );
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location unavailable. Try again outdoors."));
            break;
          case error.TIMEOUT:
            reject(new Error("Location request timed out. Try again."));
            break;
          default:
            reject(new Error("Could not capture location."));
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  });
}
