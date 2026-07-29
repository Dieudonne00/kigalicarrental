import Link from "next/link";
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
    desc: "Landing at Kigali International Airport? Our team meets you at arrivals with your vehicle ready to go - no shuttle, no waiting, no extra delivery fee. Every Kigali car rental booking includes free airport meet & greet, so your trip starts the moment you land.",
    iconPath: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Kigali Car Rental You Control Yourself",
    desc: "Prefer to drive yourself? Every car in our fleet is available self-drive, well-maintained, and ready for Kigali's streets or the open road beyond the city. If you'd rather not drive, your Kigali car rental can come with a professional driver for just $20/day.",
    iconPath: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  },
  {
    title: "Kigali Car Rental Backed by 24/7 Support",
    desc: "A rental is only as good as the support behind it. Our local team is reachable around the clock for every Kigali car rental booking - roadside help, route advice, or a late-night question, we're one call away, day or night.",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Kigali Car Rental with No Hidden Fees",
    desc: "The price you see for your Kigali car rental is the price you pay - daily rate, insurance, and delivery are all included up front, with no surprise charges waiting for you at pickup or return.",
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

export default async function Home() {
  // The static business facts (name, address, logo, hours, etc.) render
  // sitewide via OrganizationSchema in the root layout. This block only adds
  // the parts that need live data - real price range and real review
  // aggregate - as additional properties on that SAME @id, so Google merges
  // them into one entity rather than seeing two conflicting definitions.
  const [reviews, priceAgg, fleetCount] = await Promise.all([
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
    prisma.car.count({ where: { available: true } }),
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
      <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-bold mb-4 tracking-wide uppercase">
              Why Kigali Car Rental
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">
              Why Choose Our Kigali Car Rental Service?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="group bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d={item.iconPath} />
                  </svg>
                </div>
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3">
              Kigali Car Rental Delivery Times by Area
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Every Kigali car rental is dispatched free of charge from our Kimihurura office. Below is a realistic estimate of how long delivery takes to each part of the city, plus the extra time to expect if your pickup lands during evening rush hour.
            </p>
          </div>

          <div className="overflow-x-auto max-w-3xl mx-auto">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border border-gray-200 text-sm sm:text-base">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="text-left p-3 sm:p-4 font-bold">Kigali Car Rental Delivery Area</th>
                  <th className="text-left p-3 sm:p-4 font-bold">Time After Confirmation</th>
                  <th className="text-left p-3 sm:p-4 font-bold">Evening Traffic</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  { area: "Kimihurura (our office)", time: "30 Min", traffic: "+10 Min" },
                  { area: "Kacyiru", time: "30 Min", traffic: "+10 Min" },
                  { area: "Nyarutarama", time: "30 Min", traffic: "+10 Min" },
                  { area: "Remera", time: "30 Min", traffic: "+10 Min" },
                  { area: "Gisozi", time: "30 Min", traffic: "+10 Min" },
                  { area: "Nyarugenge (City Center)", time: "30 Min", traffic: "+10 Min" },
                  { area: "Gikondo", time: "35 Min", traffic: "+10 Min" },
                  { area: "Kicukiro", time: "40 Min", traffic: "+10 Min" },
                  { area: "Nyamirambo", time: "40 Min", traffic: "+10 Min" },
                  { area: "Kigali International Airport (KGL)", time: "40 Min", traffic: "+10 Min" },
                ].map((row, i) => (
                  <tr key={row.area} className={`border-b border-gray-100 last:border-0 ${i % 2 === 1 ? "bg-gray-50" : ""}`}>
                    <td className="p-3 sm:p-4 font-semibold">{row.area}</td>
                    <td className="p-3 sm:p-4">{row.time}</td>
                    <td className="p-3 sm:p-4">{row.traffic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3 max-w-3xl mx-auto">
            Estimates based on typical Kigali traffic conditions from our Kimihurura office - actual delivery time may vary. Need an even faster pickup? See our <Link href="/deals/last-minute" className="text-blue-700 underline">30-minute last-minute delivery option</Link>.
          </p>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base max-w-3xl mx-auto text-center mt-10">
            Beyond the city, our fleet is built for Rwanda's roads - Musanze and Volcanoes National Park for gorilla trekking, Akagera National Park for safari game drives, Nyungwe Forest for canopy walks, and Rubavu on Lake Kivu. A car from us is ready for the whole country, not just the capital.
          </p>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3">
              What You Need for Kigali Car Rental
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Booking a Kigali car rental is simple - here's exactly what to have ready before your car arrives.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Valid Driver's License",
                desc: "A valid driver's license is required for every Kigali car rental. Foreign visitors should bring an International Driving Permit alongside their home license.",
                iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              },
              {
                title: "Minimum Age 21",
                desc: "Renters must be at least 21 to book, with a few premium and luxury vehicles requiring drivers to be 25 or older.",
                iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
              {
                title: "Refundable Deposit",
                desc: "Every Kigali car rental requires a refundable security deposit, held only for the length of your booking and returned in full afterward.",
                iconPath: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              },
              {
                title: "Insurance Included",
                desc: "Basic insurance comes standard on every booking, with optional upgraded coverage available if you'd like extra peace of mind.",
                iconPath: "M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((req) => (
              <div key={req.title} className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center hover:border-blue-400 hover:shadow-md transition-all">
                <svg
                  className="w-10 h-10 text-blue-600 mx-auto mb-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d={req.iconPath} />
                </svg>
                <h3 className="font-bold text-gray-900 mb-2">{req.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{req.desc}</p>
              </div>
            ))}
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

      <AboutSection fleetCount={fleetCount} reviewCount={reviewCount} averageRating={averageRating} />

      {/* Comparison content - real, honest, and genuinely useful for anyone
          weighing options, not just an SEO device. */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">
            Kigali Car Rental vs. Taxi vs. Car Rental with Driver
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-10">
            Not sure which option fits your trip? Here's an honest comparison of the three main ways to get around Kigali and Rwanda.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border border-gray-200 text-sm sm:text-base">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="text-left p-4 font-bold">Factor</th>
                  <th className="text-left p-4 font-bold">Kigali Car Rental (Self-Drive)</th>
                  <th className="text-left p-4 font-bold">Taxi / Ride-Hailing</th>
                  <th className="text-left p-4 font-bold">Kigali Car Rental with Driver</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Best for</td>
                  <td className="p-4">Multi-day trips, day trips outside Kigali, full control over your schedule</td>
                  <td className="p-4">Short one-off trips within the city</td>
                  <td className="p-4">Visitors who'd rather not navigate unfamiliar roads themselves</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="p-4 font-semibold">Cost over multiple days</td>
                  <td className="p-4">Fixed daily rate from $35/day, no surprises</td>
                  <td className="p-4">Adds up fast - every trip is billed separately</td>
                  <td className="p-4">Daily rate plus $20/day for the driver</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Trips outside Kigali</td>
                  <td className="p-4">Included - drive to Musanze, Akagera, or Nyungwe on your own schedule</td>
                  <td className="p-4">Rarely practical or affordable for national park trips</td>
                  <td className="p-4">Included, with a driver who knows the routes</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-semibold">Airport pickup</td>
                  <td className="p-4">Free meet & greet, car ready when you land</td>
                  <td className="p-4">Available, but you're on their schedule and pricing</td>
                  <td className="p-4">Free meet & greet, driver ready when you land</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

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
