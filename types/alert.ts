import { CommodityWithLatest } from "./commodity";

export type PriceAlertCondition = "above" | "below";
export type PriceAlertStatus = "active" | "paused";

export interface PriceAlert {
  id: string;
  userId: string;
  commodityId: string;
  commodity: CommodityWithLatest;
  condition: PriceAlertCondition;
  targetPrice: number;
  status: PriceAlertStatus;
  lastTriggeredAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePriceAlertBody {
  commodityId: string;
  condition: PriceAlertCondition;
  targetPrice: number;
}
