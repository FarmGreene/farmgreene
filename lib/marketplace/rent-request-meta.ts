import { CheckCircle2, Clock, XCircle, LucideIcon } from "lucide-react";
import { RentRequestStatus } from "@/types/marketplace";

interface RentRequestStatusMeta {
  label: string;
  badgeClassName: string;
  icon: LucideIcon;
}

/** Shared status badge styling for owner-side rental request surfaces
 * (RequestCard, RentRequestDetailSheet, the rentals list page). The
 * renter-side RenterRequestCard keeps its own separate copy by design. */
export const RENT_REQUEST_STATUS_META: Record<
  RentRequestStatus,
  RentRequestStatusMeta
> = {
  pending: {
    label: "Pending",
    badgeClassName:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Clock,
  },
  accepted: {
    label: "Accepted",
    badgeClassName:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    badgeClassName:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    icon: XCircle,
  },
  cancelled: {
    label: "Cancelled",
    badgeClassName:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    icon: XCircle,
  },
  completed: {
    label: "Completed",
    badgeClassName:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: CheckCircle2,
  },
};
