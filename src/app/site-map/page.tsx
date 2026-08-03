import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "Sitemap | Kigali Car Rental",
  description:
    "Full sitemap of Kigali Car Rental — every page on kigalicarrental.site including our fleet, service pages, destinations and blog.",
  alternates: { canonical: `${SITE}/site-map` },
  robots: { index: true, follow: true },
};

const sections: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "Our Fleet", href: "/fleet" },
      { label: "Book Now", href: "/book-now" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Self-Drive Rwanda", href: "/self-drive-rwanda" },
      { label: "Airport Transfer Kigali", href: "/airport-transfer-kigali" },
      { label: "4x4 Car Hire Rwanda", href: "/4x4-car-hire-rwanda" },
      { label: "Luxury Car Hire Kigali", href: "/luxury-car-hire-kigali" },
      { label: "Corporate Car Hire Kigali", href: "/corporate-car-hire-kigali" },
      { label: "Long-Term Car Hire Kigali", href: "/long-term-car-hire-kigali" },
      { label: "Wedding Car Hire Kigali", href: "/wedding-car-hire-kigali" },
      { label: "NGO Car Hire Kigali", href: "/ngo-car-hire-kigali" },
      { label: "Car Hire Kigali 2026", href: "/car-hire-kigali-2026" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Tours & Itineraries", href: "/tours" },
      { label: "Akagera Game Drive", href: "/akagera-game-drive" },
      { label: "Gorilla Trekking Car Hire", href: "/gorilla-trekking-car-hire" },
      { label: "Volcanoes National Park Car Hire", href: "/volcanoes-national-park-car-hire" },
      { label: "Lake Kivu Car Hire", href: "/lake-kivu-car-hire" },
      { label: "Nyungwe Forest Car Hire", href: "/nyungwe-forest-car-hire" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default async function SitemapPage() {
  let carLinks: { label: string; href: string }[] = [];
  let blogLinks: { label: string; href: string }[] = [];

  try {
    const cars = await prisma.car.findMany({
      where: { available: true },
      select: { id: true, name: true },
      take: 100,
    });
    carLinks = cars.map((c) => ({ label: c.name, href: `/cars/${c.id}` }));
  } catch {
    // DB unavailable — skip dynamic car links
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, title: true },
      orderBy: { updatedAt: "desc" },
      take: 100,
    });
    blogLinks = posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }));
  } catch {
    // DB unavailable — skip dynamic blog links
  }

  const allSections = [...sections];
  if (carLinks.length) allSections.push({ title: "Our Cars", links: carLinks });
  if (blogLinks.length) allSections.push({ title: "Blog Posts", links: blogLinks });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
          Sitemap
        </h1>
        <p className="text-gray-600 mb-10">
          Every page on Kigali Car Rental. Looking for the XML version for search engines?{" "}
          <a href="/sitemap.xml" className="text-[#1e3a8a] font-semibold hover:underline">
            View sitemap.xml
          </a>
          .
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {allSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-600 hover:text-[#1e3a8a] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
