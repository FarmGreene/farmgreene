"use client";

import { useRouter } from "next/navigation";
import { Loader2, Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBecomeOwner } from "@/lib/hooks/useBecomeOwner";
import { cn } from "@/lib/utils";

/** Where someone lands to build their first listing. */
const WIZARD_HREF = "/dashboard/marketplace/manage?new=1";

/**
 * The path from "I use Farmgreene" to "I list equipment on Farmgreene".
 *
 * Signup no longer asks anyone to pick a role, so this is where the OWNER
 * capability is actually granted — at the moment somebody acts on the
 * intention, which is a far better signal than a radio button they clicked
 * before seeing the product.
 *
 * The upgrade is instant rather than an application: OWNER only unlocks the
 * listing wizard, and every listing still goes to an admin for review before
 * it publishes. The scrutiny stays where it belongs, on the listing.
 */
export function BecomeOwnerButton({ className }: { className?: string }) {
  const router = useRouter();
  const { isOwner, becomeOwner, isPending, error } = useBecomeOwner();

  async function handleClick() {
    if (isOwner) {
      router.push(WIZARD_HREF);
      return;
    }

    try {
      await becomeOwner();
      router.push(WIZARD_HREF);
    } catch {
      // Surfaced below — the role wasn't granted, so don't navigate into a
      // wizard that would immediately fail on permissions.
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="shrink-0 bg-[#049878] hover:bg-[#037a60]"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Tractor className="mr-2 h-4 w-4" />
        )}
        {isOwner ? "Add a listing" : "List your equipment"}
      </Button>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          Couldn&rsquo;t set that up just now. Try again in a moment.
        </p>
      )}
    </div>
  );
}
