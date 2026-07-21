import type { Metadata } from "next";
import Link from "next/link";
import ModernLayout from "@/components/ModernLayout";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Sitemap | Kigali Car Rental",
  description: "Browse every page on the Kigali Car Rental website.",
  alternates: { canonical: "/site-map" },
};

const linkGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "Our Fleet", href: "/fleet" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book Now", href: "/book-now" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Car Rental",
    links: [
      { label: "Car Hire Rwanda", href: "/car-hire-rwanda" },
      { label: "Car Rental Rwanda", href: "/car-rental-rwanda" },
      { label: "Kigali Airport Car Rental", href: "/kigali-airport-car-rental" },
      { label: "Cheap Car Rental Kigali", href: "/cheap-car-rental-kigali" },
      { label: "Luxury Car Rental Kigali", href: "/luxury-car-rental-kigali" },
      { label: "Long Term Car Rental Rwanda", href: "/long-term-car-rental-rwanda" },
      { label: "Monthly Rental", href: "/long-term/monthly" },
      { label: "Last Minute Deals", href: "/deals/last-minute" },
    ],
  },
  {
    title: "Self Drive & Drivers",
    links: [
      { label: "Self Drive Rwanda", href: "/self-drive-rwanda" },
      { label: "Self Drive Car Rental Kigali", href: "/self-drive-car-rental-kigali" },
      { label: "Driver Car Hire Kigali", href: "/driver-car-hire-kigali" },
      { label: "Chauffeur Service Rwanda", href: "/chauffeur-service-rwanda" },
      { label: "Private Driver Kigali", href: "/private-driver-kigali" },
      { label: "Rwanda Guided Transport", href: "/rwanda-guided-transport" },
      { label: "Airport Driver Service", href: "/airport-driver-service" },
      { label: "City Tour Driver", href: "/city-tour-driver" },
      { label: "Business Driver Service", href: "/business-driver-service" },
      { label: "Event Transport Driver", href: "/event-transport-driver" },
    ],
  },
  {
    title: "4x4 & Safari",
    links: [
      { label: "4x4 Car Rental Rwanda", href: "/4x4-car-rental-rwanda" },
      { label: "Safari Car Rental Rwanda", href: "/safari-car-rental-rwanda" },
      { label: "Land Cruiser Rental Rwanda", href: "/land-cruiser-rental-rwanda" },
      { label: "Prado Rental Kigali", href: "/prado-rental-kigali" },
      { label: "Rooftop Tent Car Rental Rwanda", href: "/rooftop-tent-car-rental-rwanda" },
      { label: "Camping Car Rental Rwanda", href: "/camping-car-rental-rwanda" },
      { label: "Akagera Safari Rental", href: "/akagera-safari-rental" },
      { label: "Akagera Game Drive", href: "/akagera-game-drive" },
      { label: "Volcanoes 4x4 Rental", href: "/volcanoes-4x4-rental" },
      { label: "Nyungwe Forest Safari", href: "/nyungwe-forest-safari" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default async function SitemapPage() {
  let cars: { id: string; name: string }[] = [];
  let blogPosts: { slug: string; title: string }[] = [];

  try {
    [cars, blogPosts] = await Promise.all([
      prisma.car.findMany({
        where: { available: true },
        select: { id: true, name: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, title: true },
        orderBy: { publishedAt: "desc" },
      }),
    ]);
  } catch (error) {
    console.error("Sitemap page: failed to fetch cars/blog posts", error);
  }

  return (
    <ModernLayout title="Sitemap" subtitle="Every page on the Kigali Car Rental website.">
      <div className="grid md:grid-cols-2 gap-10">
        {linkGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xl font-bold text-blue-900 mb-3">{group.title}</h2>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {cars.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-3">Vehicles</h2>
            <ul className="space-y-2">
              {cars.map((car) => (
                <li key={car.id}>
                  <Link href={`/cars/${car.id}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                    {car.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {blogPosts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-3">Blog Posts</h2>
            <ul className="space-y-2">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ModernLayout>
  );
}
