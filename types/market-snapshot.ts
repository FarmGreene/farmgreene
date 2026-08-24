export type MarketStatus = "BULLISH" | "BEARISH" | "NEUTRAL";
export type VolumeLevel = "HIGH" | "MED" | "LOW";

export interface MarketSnapshot {
  id: string;
  status: MarketStatus;
  gainersCount: number;
  declinersCount: number;
  volumeLevel: VolumeLevel;
  description: string | null;
  source: {
    gainersCount: number;
    declinersCount: number;
    volumeLevel: VolumeLevel;
    topGainer: { name: string; changePercent: number } | null;
    topDecliner: { name: string; changePercent: number } | null;
    todaySubmissionTotal: number;
    trailing30dAvgSubmissionTotal: number;
  };
  createdAt: string;
}
