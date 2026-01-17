import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PriceReportForm } from "@/components/dashboard/PriceReportForm";
import { MarketPriceChart } from "@/components/dashboard/MarketPriceChart";

export default function AgentPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agent Portal</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Submit Market Price</CardTitle>
            <CardDescription>
              Report today's commodity prices for your assigned market.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PriceReportForm />
          </CardContent>
        </Card>
        <div className="col-span-3">
          <MarketPriceChart />
        </div>
      </div>
    </div>
  );
}
