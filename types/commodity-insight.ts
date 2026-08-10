export interface CommodityInsight {
  id: string;
  commodityId: string;
  summary: string;
  drivers: string[];
  risks: string[];
  sources: { title: string; url: string }[] | null;
  generatedAt: string;
  createdAt: string;
  updatedAt: string;
}
