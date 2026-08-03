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
    sitemap: "https://kigalicarrental.site/sitemap.xml",
    host: "https://kigalicarrental.site",
  };
}
