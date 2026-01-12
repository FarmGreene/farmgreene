import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarClock } from "lucide-react";
import Link from "next/link";
// Mock data for featured listings
const listings = [
  {
    id: 1,
    name: "John Deere 5050D Tractor",
    category: "Tractors",
    location: "Osogbo, Osun",
    price: "₦45,000",
    unit: "day",
    available: true,
  },
  {
    id: 2,
    name: "Cassava Peeling Machine",
    category: "Processing",
    location: "Ilesa, Osun",
    price: "₦15,000",
    unit: "day",
    available: true,
  },
  {
    id: 3,
    name: "Knapsack Sprayer (Manual)",
    category: "Tools",
    location: "Ede, Osun",
    price: "₦2,000",
    unit: "day",
    available: true,
  },
  {
    id: 4,
    name: "Yam Harvester Attachment",
    category: "Harvesting",
    location: "Ikire, Osun",
    price: "₦10,000",
    unit: "day",
    available: false,
  },
];

export default function FeaturedListings() {
  return (
    <section id="listings" className="py-20 bg-slate-50 dark:bg-slate-900/20">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-2">
              Featured Equipment
            </h2>
            <p className="text-muted-foreground">
              Recently listed equipment from verified owners nearby.
            </p>
          </div>
          <Link href="/dashboard" className="hidden sm:block">
            <Button variant="outline">View All Listings</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col">
              <div className="h-40 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-medium">
                [Image: {item.name}]
              </div>
              <CardHeader className="p-4 pb-2 space-y-1">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-xs font-normal">
                    {item.category}
                  </Badge>
                  {item.available ? (
                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
                      Available
                    </span>
                  ) : (
                    <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>{" "}
                      Rented
                    </span>
                  )}
                </div>
                <h3
                  className="font-bold text-lg leading-tight truncate"
                  title={item.name}
                >
                  {item.name}
                </h3>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2 flex-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" /> {item.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarClock className="h-3 w-3 mr-1" /> Daily / Weekly
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg text-green-700">
                    {item.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    /{item.unit}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="default"
                  className="bg-slate-900 text-white hover:bg-slate-800"
                >
                  Rent Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full">
              View All Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
