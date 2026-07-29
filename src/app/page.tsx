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
  title: "Kigali Car Rental | Rwanda's #1 Car Hire - From $35/Day",
  description: "Kigali car rental made easy - premium cars from $35/day with free airport delivery and 24/7 support. Book your ride today and hit the road.",
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
    desc: "Landing at Kigali International Airport? Our team meets you at arrivals with your vehicle ready to go - no shuttle, no waiting, no extra delivery fee. Every booking includes free airport meet & greet, so your trip starts the moment you land.",
    iconPath: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Kigali Car Rental You Control Yourself",
    desc: "Prefer to drive yourself? Every car in our fleet is available self-drive, well-maintained, and ready for Kigali's streets or the open road beyond the city. If you'd rather not drive, the same car can come with a professional driver for just $20/day.",
    iconPath: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  },
  {
    title: "Kigali Car Rental Backed by 24/7 Support",
    desc: "A rental is only as good as the support behind it. Our local team is reachable around the clock for every booking - roadside help, route advice, or a late-night question, we're one call away, day or night.",
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
    prisma.review.findMany({
      where: { published: true },
      select: { id: true, customerName: true, rating: true, comment: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
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
      // Matches the same pattern already used on each car's own page - a
      // bare AggregateRating with no backing Review items is weaker for
      // Google's review-snippet validation than having the real reviews
      // actually attached.
      review: reviews.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.customerName },
        datePublished: r.createdAt.toISOString(),
        reviewBody: r.comment,
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      })),
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

      {/* Real customer reviews - only renders when genuine, moderated
          reviews exist (see /leave-review), matching the AggregateRating
          in businessData above rather than a placeholder next to it. */}
      {reviewCount > 0 && (
        <section className="py-14 sm:py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3">
                What Our Kigali Car Rental Customers Say
              </h2>
              <div className="flex items-center justify-center gap-2">
                <span className="text-yellow-500 text-xl">
                  {"★".repeat(Math.round(averageRating))}
                  {"☆".repeat(5 - Math.round(averageRating))}
                </span>
                <span className="text-gray-700 font-semibold">
                  {averageRating.toFixed(1)} ({reviewCount} review{reviewCount === 1 ? "" : "s"})
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-900">{review.customerName}</span>
                    <span className="text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-10 sm:mb-12 text-center">
            How Kigali Car Rental Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Car",
                desc: "Browse our fleet - sedans, SUVs, 4x4s, and luxury cars - and pick the vehicle that fits your trip.",
              },
              {
                step: "2",
                title: "Book Online or WhatsApp",
                desc: "Confirm your booking in minutes through our website or a quick WhatsApp message - no paperwork hassle.",
              },
              {
                step: "3",
                title: "We Deliver",
                desc: "Your car is delivered free to Kigali International Airport or any hotel and address in the city.",
              },
              {
                step: "4",
                title: "Drive or Ride",
                desc: "Take the wheel yourself, or add a professional driver for $20/day - either way, you're ready to go.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-14 sm:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center">
            Kigali Car Rental Service Areas
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
            We deliver free of charge across Kigali City, including Kigali International Airport (KGL), Kacyiru, Kimihurura, Nyarutarama, Remera, Kicukiro, Nyamirambo, and Gikondo. Wherever you're staying in Kigali, your car can be waiting for you.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Beyond the city, our fleet is built for Rwanda's roads - Musanze and Volcanoes National Park for gorilla trekking, Akagera National Park for safari game drives, Nyungwe Forest for canopy walks, and Rubavu on Lake Kivu. A car from us is ready for the whole country, not just the capital.
          </p>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center">
            What You Need for Kigali Car Rental
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>A valid driver's license (an International Driving Permit is recommended for foreign visitors)</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Minimum age of 21 to book, with a few premium vehicles requiring 25+</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>A refundable security deposit, held only for the length of your rental</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Basic insurance is included on every booking, with optional upgrades available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Categories */}
      <section className="py-14 sm:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-10 text-center">
            Kigali Car Rental Fleet Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Sedans", desc: "Fuel-efficient sedans for city driving, business trips, and airport transfers." },
              { title: "SUVs", desc: "Spacious SUVs with room for family, friends, and luggage on longer trips." },
              { title: "4x4s", desc: "Rugged 4x4s built for Akagera, Volcanoes, and Rwanda's unpaved roads." },
              { title: "Luxury", desc: "Premium options for executive travel, weddings, and special occasions." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
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
