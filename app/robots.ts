import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://farmgreene.com"; // Replace with actual domain

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/private/",
        "/api/",
        "/dashboard/", // Assuming dashboard is private
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
