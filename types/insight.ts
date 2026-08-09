export interface MarketInsight {
  id: string;
  headline: string;
  body: string;
  source: {
    commodityName: string;
    changePercent: number;
    averagePrice: number;
    unit: string;
    direction: "up" | "down";
  };
  createdAt: string;
}
