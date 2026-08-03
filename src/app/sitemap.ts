import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://kigalicarhire.rw";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/fleet`,                   lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/book-now`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`,                   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/how-it-works`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/pricing`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/site-map`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/terms`,                   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/privacy`,                 lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/akagera-game-drive`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,                    lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    // Keyword landing pages
    { url: `${BASE}/airport-transfer-kigali`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gorilla-trekking-car-hire`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/self-drive-rwanda`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/4x4-car-hire-rwanda`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/luxury-car-hire-kigali`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/wedding-car-hire-kigali`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/corporate-car-hire-kigali`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/volcanoes-national-park-car-hire`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/lake-kivu-car-hire`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/nyungwe-forest-car-hire`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/long-term-car-hire-kigali`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ngo-car-hire-kigali`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/car-hire-kigali-2026`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  // Dynamic car pages
  let carPages: MetadataRoute.Sitemap = [];
  try {
    const cars = await prisma.car.findMany({
      where: { available: true },
      select: { id: true, updatedAt: true },
    });
    carPages = cars.map((car) => ({
      url: `${BASE}/cars/${car.id}`,
      lastModified: car.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // DB unavailable at build time — skip dynamic car pages
  }

  // Dynamic blog pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogPages = posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB unavailable at build time — skip dynamic blog pages
  }

  return [...staticPages, ...carPages, ...blogPages];
}









