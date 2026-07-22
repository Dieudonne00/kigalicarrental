import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl = "https://www.kigalicarrental.site";

// Every real, public (non-manager) static route in the app. lastModified is
// the real date each route's page last changed in git (checked 2026-07-22),
// not "now" - a sitemap where every lastmod is always the current request
// time teaches Google to distrust the field entirely. Update a route's date
// here when you actually change that page's content.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; lastModified: string }[] = [
  { path: "", priority: 1, changeFrequency: "daily", lastModified: "2026-07-21" },
  { path: "/car-rental-rwanda", priority: 0.9, changeFrequency: "daily", lastModified: "2026-07-19" },
  { path: "/car-hire-rwanda", priority: 0.9, changeFrequency: "daily", lastModified: "2026-07-21" },
  { path: "/fleet", priority: 0.9, changeFrequency: "daily", lastModified: "2026-07-21" },
  { path: "/kigali-airport-car-rental", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/luxury-car-rental-kigali", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/cheap-car-rental-kigali", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/self-drive-rwanda", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/self-drive-car-rental-kigali", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/driver-car-hire-kigali", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/chauffeur-service-rwanda", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/private-driver-kigali", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-22" },
  { path: "/rwanda-guided-transport", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/airport-driver-service", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/city-tour-driver", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/business-driver-service", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/event-transport-driver", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/4x4-car-rental-rwanda", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/safari-car-rental-rwanda", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/land-cruiser-rental-rwanda", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/prado-rental-kigali", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/rooftop-tent-car-rental-rwanda", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/camping-car-rental-rwanda", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/akagera-safari-rental", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/akagera-game-drive", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/volcanoes-4x4-rental", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/nyungwe-forest-safari", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/long-term-car-rental-rwanda", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/long-term/monthly", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/deals/last-minute", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-21" },
  { path: "/book-now", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-07-21" },
  { path: "/how-it-works", priority: 0.5, changeFrequency: "monthly", lastModified: "2026-07-17" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly", lastModified: "2026-07-17" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly", lastModified: "2026-07-21" },
  { path: "/blog", priority: 0.5, changeFrequency: "weekly", lastModified: "2026-07-22" },
  { path: "/faq", priority: 0.4, changeFrequency: "monthly", lastModified: "2026-07-17" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-07-18" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-07-17" },
  { path: "/site-map", priority: 0.3, changeFrequency: "monthly", lastModified: "2026-07-21" },
];

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let cars: { id: string; updatedAt: Date }[] = [];
  let blogPosts: { slug: string; updatedAt: Date }[] = [];

  try {
    [cars, blogPosts] = await Promise.all([
      prisma.car.findMany({
        where: { available: true },
        select: { id: true, updatedAt: true },
      }),
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);
  } catch (error) {
    console.error("Sitemap: failed to fetch dynamic routes from database", error);
  }

  const carEntries: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${baseUrl}/cars/${car.id}`,
    lastModified: car.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...carEntries, ...blogEntries];
}
