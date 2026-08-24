import { RentRequestStatus } from "@/types/marketplace";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export type ReturnCountdownTone = "upcoming" | "due-soon" | "overdue" | "closed";

export interface ReturnCountdown {
  label: string;
  tone: ReturnCountdownTone;
  daysRemaining: number;
}

/** Live "when is this coming back" read on an accepted rental, derived
 * purely from endDate vs today — no backend "returned" tracking exists.
 * Uses the same UTC-midnight day-diff math as rentalDaysBetween in
 * pricing.ts so this never disagrees with the rentalDays badge next to it. */
export function getReturnCountdown(
  endDate: string,
  status: RentRequestStatus,
): ReturnCountdown {
  if (status === "completed") {
    return { label: "Completed", tone: "closed", daysRemaining: 0 };
  }
  if (status !== "accepted") {
    return { label: "—", tone: "closed", daysRemaining: 0 };
  }

  const end = Date.parse(`${endDate}T00:00:00Z`);
  const todayStr = new Date().toISOString().slice(0, 10);
  const today = Date.parse(`${todayStr}T00:00:00Z`);

  if (Number.isNaN(end) || Number.isNaN(today)) {
    return { label: "—", tone: "closed", daysRemaining: 0 };
  }

  const daysRemaining = Math.round((end - today) / MS_PER_DAY);

  if (daysRemaining < 0) {
    return {
      label: `Overdue by ${Math.abs(daysRemaining)}d`,
      tone: "overdue",
      daysRemaining,
    };
  }
  if (daysRemaining === 0) {
    return { label: "Returns today", tone: "due-soon", daysRemaining };
  }
  if (daysRemaining <= 2) {
    return {
      label: `Returns in ${daysRemaining}d`,
      tone: "due-soon",
      daysRemaining,
    };
  }
  return {
    label: `Returns in ${daysRemaining}d`,
    tone: "upcoming",
    daysRemaining,
  };
}
