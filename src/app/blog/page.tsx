import { Metadata } from "next";
import BlogListing from "@/components/BlogListing";

const SITE = "https://kigalicarrental.site";
const OG_IMAGE = "https://kigalicarhire.b-cdn.net/hero%20section%20cars.png";

export const metadata: Metadata = {
  title: "Kigali Car Rental Blog | Rwanda Travel Guides and Car Rental Tips",
  description:
    "Kigali Car Rental blog — expert guides on renting a car in Rwanda, self-drive tips, gorilla trekking routes, Akagera safari, Lake Kivu travel, and East Africa road trips. 150+ articles.",
  keywords: "Kigali car rental",
  alternates: {
    canonical: `${SITE}/blog`,
  },
  openGraph: {
    title: "Kigali Car Rental Blog | Rwanda Travel Guides and Car Rental Tips",
    description:
      "Kigali Car Rental blog — guides on renting a car in Rwanda, self-drive tips, gorilla trekking, safari routes and East Africa travel.",
    url: `${SITE}/blog`,
    siteName: "Kigali Car Rental",
    type: "website",
    locale: "en_RW",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kigali Car Rental Blog — Rwanda travel guides and car rental tips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kigali Car Rental Blog | Rwanda Travel Guides and Car Rental Tips",
    description:
      "Kigali Car Rental blog — guides on renting a car in Rwanda, self-drive tips, gorilla trekking, safari routes and East Africa travel.",
    images: [OG_IMAGE],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Kigali Car Rental",
      item: SITE,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${SITE}/blog`,
    },
  ],
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Kigali Car Rental Blog",
  url: `${SITE}/blog`,
  description:
    "Expert guides on renting a car in Rwanda, self-drive tips, gorilla trekking routes, safari travel and East Africa road trips.",
  publisher: {
    "@type": "Organization",
    name: "Kigali Car Rental",
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: OG_IMAGE,
    },
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://kigalicarhire.b-cdn.net/cars/1763129080028-2022-toyota-rav-4-prime-wheels-red-carprousa-1404x1112.webp)' }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-32">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Car Rental Blog & Travel Guides
          </h1>
          <p className="text-sm md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Expert tips, travel guides, and insights to make your Rwanda journey unforgettable
          </p>
        </div>
      </section>

      {/* Blog Listing Component */}
      <BlogListing />
    </main>
  );
}
