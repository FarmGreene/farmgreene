import { Suspense } from "react";
import { SuspenseFallback } from "@/components/ui/suspense-fallback";
import AssignmentsContent from "./AssignmentsContent";

export default function AssignmentsPage() {
  return (
    <Suspense
      fallback={<SuspenseFallback message="Loading your assignments…" />}
    >
      <AssignmentsContent />
    </Suspense>
  );
}
