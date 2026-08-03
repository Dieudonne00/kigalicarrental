import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/manager/", "/api/", "/pay/"],
      },
    ],
    sitemap: "https://kigalicarhire.rw/sitemap.xml",
    host: "https://kigalicarhire.rw",
  };
}
