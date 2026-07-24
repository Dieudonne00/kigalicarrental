import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl = "https://www.kigalicarrental.site";

// Every real, public (non-manager) static route in the app. lastModified is
// the real date each route's page last changed in git (checked 2026-07-24),
// not "now" - a sitemap where every lastmod is always the current request
// time teaches Google to distrust the field entirely. Every route below is
// 2026-07-23 because Footer.tsx (rendered on every page) genuinely changed
// that day - update a route's date here whenever you actually change what
// it renders, whether that's the page itself or a shared component.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; lastModified: string }[] = [
  { path: "", priority: 1, changeFrequency: "daily", lastModified: "2026-07-23" },
  { path: "/car-rental-rwanda", priority: 0.9, changeFrequency: "daily", lastModified: "2026-07-19" },
  { path: "/car-hire-rwanda", priority: 0.9, changeFrequency: "daily", lastModified: "2026-07-23" },
  { path: "/fleet", priority: 0.9, changeFrequency: "daily", lastModified: "2026-07-23" },
  { path: "/kigali-airport-car-rental", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/luxury-car-rental-kigali", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/cheap-car-rental-kigali", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/self-drive-rwanda", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/self-drive-car-rental-kigali", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/driver-car-hire-kigali", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/chauffeur-service-rwanda", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/private-driver-kigali", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/rwanda-guided-transport", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/airport-driver-service", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/city-tour-driver", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/business-driver-service", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/event-transport-driver", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/4x4-car-rental-rwanda", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/safari-car-rental-rwanda", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/land-cruiser-rental-rwanda", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/prado-rental-kigali", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/rooftop-tent-car-rental-rwanda", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/camping-car-rental-rwanda", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/akagera-safari-rental", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/akagera-game-drive", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/volcanoes-4x4-rental", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/nyungwe-forest-safari", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/long-term-car-rental-rwanda", priority: 0.7, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/long-term/monthly", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/deals/last-minute", priority: 0.6, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/book-now", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-07-23" },
  { path: "/how-it-works", priority: 0.5, changeFrequency: "monthly", lastModified: "2026-07-17" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly", lastModified: "2026-07-17" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly", lastModified: "2026-07-23" },
  { path: "/blog", priority: 0.5, changeFrequency: "weekly", lastModified: "2026-07-23" },
  { path: "/faq", priority: 0.4, changeFrequency: "monthly", lastModified: "2026-07-17" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-07-18" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-07-17" },
  { path: "/site-map", priority: 0.3, changeFrequency: "monthly", lastModified: "2026-07-23" },
];

// 1 hour, not 24 - the blog cron publishes new posts once daily at 8am, and
// a stale sitemap for up to a full day after that undercuts the freshness
// signal we want Google to see new posts on.
export const revalidate = 3600;

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
