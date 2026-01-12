"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Mon", cocoa: 4500, cassava: 2000 },
  { day: "Tue", cocoa: 4600, cassava: 2100 },
  { day: "Wed", cocoa: 4550, cassava: 2050 },
  { day: "Thu", cocoa: 4800, cassava: 2200 },
  { day: "Fri", cocoa: 4900, cassava: 2300 },
  { day: "Sat", cocoa: 5000, cassava: 2400 },
  { day: "Sun", cocoa: 5100, cassava: 2500 },
];

const chartConfig = {
  cocoa: {
    label: "Cocoa",
    color: "hsl(var(--chart-1))",
  },
  cassava: {
    label: "Cassava",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function MarketPriceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commodity Price Trends</CardTitle>
        <CardDescription>
          Showing price for last 7 days (Osogbo Market)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="cocoa"
              type="natural"
              fill="var(--color-cocoa)"
              fillOpacity={0.4}
              stroke="var(--color-cocoa)"
              stackId="a"
            />
            <Area
              dataKey="cassava"
              type="natural"
              fill="var(--color-cassava)"
              fillOpacity={0.4}
              stroke="var(--color-cassava)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Cocoa up by 5.2% today <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2026
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
