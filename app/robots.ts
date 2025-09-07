import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*"], // gerekirse düzenle
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
