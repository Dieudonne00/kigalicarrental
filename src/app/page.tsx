import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturedFleet from "@/components/FeaturedFleet";
import ServicesSection from "@/components/ServicesSection";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import { Metadata } from "next";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Car Rental Kigali | Premium Car Hire Rwanda | Kigali Airport Pickup",
  description: "Looking for the best car rental in Kigali? We offer premium SUVs, luxury cars, and self-drive rentals in Rwanda. 24/7 support, best rates, and Kigali airport delivery.",
  keywords: ["Kigali car rental", "car hire Kigali", "Rwanda car rental", "Kigali airport car rental", "self drive Rwanda", "cheap car rental Kigali", "4x4 rental Rwanda"],
  openGraph: {
    title: "Kigali Car Rental | Trusted Car Hire in Rwanda",
    description: "Premium car rental services in Kigali. Airport pickup, SUVs, and luxury fleet. Book your journey today.",
    url: "https://www.kigalicarrental.site",
    siteName: "Kigali Car Rental",
    images: [
      {
        url: "https://carrentalinkigali.com/myimages/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kigali Car Rental",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kigali Car Rental - Premium Car Hire Services in Rwanda",
    description: "Rent quality vehicles in Kigali, Rwanda. Airport pickup, city delivery, SUVs & luxury cars.",
    images: ["https://carrentalinkigali.com/myimages/og-image.jpg"],
  },
};

const whyChooseUs = [
  { title: "Kigali Airport Car Rental", desc: "Free meet & greet at Kigali International Airport. No waiting, no stress." },
  { title: "Self Drive Rwanda", desc: "Experience total freedom with our well-maintained self-drive vehicles." },
  { title: "24/7 Roadside Support", desc: "Travel with peace of mind. Our local team is always a call away." },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": "Kigali Car Rental",
    "description": "Premium car rental services in Kigali, Rwanda. Airport pickup, city delivery, SUVs and luxury cars.",
    "url": "https://www.kigalicarrental.site",
    "telephone": CONTACT.PHONE,
    "email": CONTACT.EMAIL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "KG 541 St",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-1.9441",
      "longitude": "30.0619"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection />

      {/* Why Choose Us */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-10 sm:mb-12 text-center">
            Why Choose Our Kigali Car Hire Service?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="p-6 sm:p-8 rounded-2xl border border-blue-100 bg-blue-50/30 hover:shadow-xl transition-shadow">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedFleet />
      <AboutSection />
      <ServicesSection />
      <FeaturedBlogs />

      {/* SEO content block - unique on-page copy for the homepage's target keywords */}
      <section className="py-14 sm:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6 sm:mb-8 text-center">
            The Best Car Rental in Kigali, Rwanda
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-gray-700 leading-relaxed text-sm sm:text-base max-w-5xl mx-auto">
            <p>
              Welcome to <strong>Kigali Car Rental</strong>, the premier choice for travelers, business professionals, and adventurers looking for reliable car hire in Rwanda. Whether you are arriving at <strong>Kigali International Airport (KGL)</strong> or need a vehicle delivered to your hotel, we provide seamless, professional service tailored to your needs.
            </p>
            <p>
              Our fleet includes everything from <strong>cheap car rental in Kigali</strong> for budget-conscious travelers to high-end <strong>luxury car rentals</strong> for executive needs. If you're planning a safari, our <strong>4x4 rental Rwanda</strong> options like the Toyota Land Cruiser are perfectly maintained for the Land of a Thousand Hills.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
