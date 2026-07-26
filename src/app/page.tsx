import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturedFleet from "@/components/FeaturedFleet";
import ServicesSection from "@/components/ServicesSection";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import FAQSection from "@/components/FAQSection";
import { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

// Revalidate hourly rather than fully static - priceRange/aggregateRating
// below reflect live fleet/review data and shouldn't need a full redeploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kigali Car Rental | From $35 | Free Airport Delivery",
  description: "Looking for the best Kigali car rental? From $35/day - premium SUVs, luxury cars, and self-drive rentals in Rwanda. 24/7 support, best rates, and free Kigali airport delivery.",
  keywords: ["Kigali car rental", "car hire Kigali", "Rwanda car rental", "Kigali airport car rental", "self drive Rwanda", "cheap car rental Kigali", "4x4 rental Rwanda"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kigali Car Rental | Trusted Car Hire in Rwanda",
    description: "Premium car rental services in Kigali. Airport pickup, SUVs, and luxury fleet. Book your journey today.",
    url: "https://www.kigalicarrental.site",
    siteName: "Kigali Car Rental",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kigali Car Rental - Premium Car Hire Services in Rwanda",
    description: "Rent quality vehicles in Kigali, Rwanda. Airport pickup, city delivery, SUVs & luxury cars.",
  },
};

const whyChooseUs = [
  {
    title: "Kigali Car Rental with Free Airport Delivery",
    desc: "Landing at Kigali International Airport? Our Kigali car rental team meets you at arrivals with your vehicle ready to go - no shuttle, no waiting, no extra delivery fee. Every Kigali car rental booking includes free airport meet & greet, so your trip starts the moment you land.",
    iconPath: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Kigali Car Rental You Control Yourself",
    desc: "Prefer to drive yourself? Every Kigali car rental in our fleet is available self-drive, well-maintained, and ready for Kigali's streets or the open road beyond the city. If you'd rather not drive, the same Kigali car rental can come with a professional driver for just $20/day.",
    iconPath: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  },
  {
    title: "Kigali Car Rental Backed by 24/7 Support",
    desc: "A Kigali car rental is only as good as the support behind it. Our local team is reachable around the clock for every Kigali car rental booking - roadside help, route advice, or a late-night question, we're one call away, day or night.",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default async function Home() {
  // The static business facts (name, address, logo, hours, etc.) render
  // sitewide via OrganizationSchema in the root layout. This block only adds
  // the parts that need live data - real price range and real review
  // aggregate - as additional properties on that SAME @id, so Google merges
  // them into one entity rather than seeing two conflicting definitions.
  const [reviews, priceAgg] = await Promise.all([
    prisma.review.findMany({ where: { published: true }, select: { rating: true } }),
    prisma.car.aggregate({
      where: { available: true },
      _min: { dailyRate: true },
      _max: { dailyRate: true },
    }),
  ]);
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount : 0;
  const minRate = priceAgg._min.dailyRate;
  const maxRate = priceAgg._max.dailyRate;

  const businessData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": `${SITE.URL}/#organization`,
    ...(minRate != null && maxRate != null && { priceRange: `$${minRate} - $${maxRate}` }),
    // Only present when backed by real, moderated customer reviews (see the
    // /leave-review flow) - never a placeholder or invented figure.
    ...(reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: Math.round(averageRating * 10) / 10,
        reviewCount,
      },
    }),
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.kigalicarrental.site/" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <HeroSection />

      {/* Cars come right after the hero - this is what visitors came for */}
      <FeaturedFleet />

      {/* Why Choose Us */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-10 sm:mb-12 text-center">
            Why Choose Our Kigali Car Rental Service?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="p-6 sm:p-8 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d={item.iconPath} />
                </svg>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />
      <ServicesSection />
      <FeaturedBlogs />
      <FAQSection />

      {/* SEO content block - unique on-page copy for the homepage's target keywords */}
      <section className="py-14 sm:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6 sm:mb-8 text-center">
            The Best Kigali Car Rental in Rwanda
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-gray-700 leading-relaxed text-sm sm:text-base max-w-5xl mx-auto">
            <p>
              Welcome to <strong>Kigali Car Rental</strong>, the premier choice for travelers, business professionals, and adventurers looking for reliable car rental in Rwanda. Whether you are arriving at <strong>Kigali International Airport (KGL)</strong> or need a vehicle delivered to your hotel, we provide seamless, professional service tailored to your needs.
            </p>
            <p>
              Our fleet includes everything from <strong>cheap Kigali car rental</strong> for budget-conscious travelers to high-end <strong>luxury car rentals</strong> for executive needs. If you're planning a safari, our <strong>4x4 rental Rwanda</strong> options like the Toyota Land Cruiser are perfectly maintained for the Land of a Thousand Hills.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
