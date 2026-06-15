export interface NewsArticle {
  title: string;
  link: string;
  publishedAt: string;
  source: string;
  snippet: string;
  author: string | null;
  image: string | null;
  category: string;
  language: string;
  country: string;
}

export interface NewsApiResponse {
  count: number;
  lastUpdated: string;
  articles: NewsArticle[];
}
