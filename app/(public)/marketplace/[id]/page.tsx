import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicListing } from "@/types/marketplace";
import { ListingDetail } from "@/components/marketplace/detail/ListingDetail";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/app`;

async function getListing(id: string): Promise<PublicListing | null> {
  try {
    const res = await fetch(`${API_BASE}/public/marketplace/listings/${id}`, {
      // Always reflect the latest listing state / availability.
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as PublicListing;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) return { title: "Equipment not found" };
  const location = [listing.lga, listing.state].filter(Boolean).join(", ");
  return {
    title: `${listing.name} — Rent on Farmgreene`,
    description:
      listing.description?.slice(0, 155) ||
      `Rent ${listing.name}${location ? ` in ${location}` : ""} from a verified owner on Farmgreene.`,
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <ListingDetail listing={listing} />
    </div>
  );
}
