import { apiClient } from "@/lib/api/axios";
import { NewsApiResponse } from "@/types/news";

/**
 * Fetches cached agriculture news from the backend.
 * GET /app/news
 */
export async function getNews(): Promise<NewsApiResponse> {
  const { data } = await apiClient.get("/news");
  return data;
}

/**
 * Admin utility: Triggers a fresh news fetch from Mediastack.
 * POST /app/news/fetch
 */
export async function triggerNewsFetch(): Promise<NewsApiResponse> {
  const { data } = await apiClient.post("/news/fetch");
  return data;
}
