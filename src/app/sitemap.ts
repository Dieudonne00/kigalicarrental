import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl = "https://www.kigalicarrental.site";

// Every real, public (non-manager) static route in the app.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/car-rental-kigali", priority: 0.9, changeFrequency: "daily" },
  { path: "/car-rental-rwanda", priority: 0.9, changeFrequency: "daily" },
  { path: "/car-hire-rwanda", priority: 0.9, changeFrequency: "daily" },
  { path: "/fleet", priority: 0.9, changeFrequency: "daily" },
  { path: "/kigali-airport-car-rental", priority: 0.8, changeFrequency: "weekly" },
  { path: "/luxury-car-rental-kigali", priority: 0.8, changeFrequency: "weekly" },
  { path: "/cheap-car-rental-kigali", priority: 0.8, changeFrequency: "weekly" },
  { path: "/self-drive-rwanda", priority: 0.8, changeFrequency: "weekly" },
  { path: "/self-drive-car-rental-kigali", priority: 0.8, changeFrequency: "weekly" },
  { path: "/driver-car-hire-kigali", priority: 0.7, changeFrequency: "weekly" },
  { path: "/chauffeur-service-rwanda", priority: 0.7, changeFrequency: "weekly" },
  { path: "/private-driver-kigali", priority: 0.7, changeFrequency: "weekly" },
  { path: "/rwanda-guided-transport", priority: 0.7, changeFrequency: "weekly" },
  { path: "/airport-driver-service", priority: 0.7, changeFrequency: "weekly" },
  { path: "/city-tour-driver", priority: 0.6, changeFrequency: "weekly" },
  { path: "/business-driver-service", priority: 0.6, changeFrequency: "weekly" },
  { path: "/event-transport-driver", priority: 0.6, changeFrequency: "weekly" },
  { path: "/4x4-car-rental-rwanda", priority: 0.8, changeFrequency: "weekly" },
  { path: "/safari-car-rental-rwanda", priority: 0.7, changeFrequency: "weekly" },
  { path: "/land-cruiser-rental-rwanda", priority: 0.7, changeFrequency: "weekly" },
  { path: "/prado-rental-kigali", priority: 0.7, changeFrequency: "weekly" },
  { path: "/rooftop-tent-car-rental-rwanda", priority: 0.6, changeFrequency: "weekly" },
  { path: "/camping-car-rental-rwanda", priority: 0.6, changeFrequency: "weekly" },
  { path: "/akagera-safari-rental", priority: 0.6, changeFrequency: "weekly" },
  { path: "/akagera-game-drive", priority: 0.6, changeFrequency: "weekly" },
  { path: "/volcanoes-4x4-rental", priority: 0.6, changeFrequency: "weekly" },
  { path: "/nyungwe-forest-safari", priority: 0.6, changeFrequency: "weekly" },
  { path: "/long-term-car-rental-rwanda", priority: 0.7, changeFrequency: "weekly" },
  { path: "/long-term/monthly", priority: 0.6, changeFrequency: "weekly" },
  { path: "/deals/last-minute", priority: 0.6, changeFrequency: "weekly" },
  { path: "/book-now", priority: 0.7, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.5, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.5, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.4, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/site-map", priority: 0.3, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
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
