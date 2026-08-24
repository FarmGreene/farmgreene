export interface MarketBrief {
  id: string;
  summary: string;
  drivers: string[];
  risks: string[];
  sources: { title: string; url: string }[] | null;
  createdAt: string;
}
