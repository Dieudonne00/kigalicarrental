import { Metadata } from "next";
import BlogListing from "@/components/BlogListing";
import { imageUrl } from "@/lib/images";

export const metadata: Metadata = {
  title: "Kigali Car Rentals Blog | Rwanda Travel Tips & Car Hire Guides",
  description:
    "Discover expert car rental tips, Rwanda travel guides, and insider advice from Kigali Car Rentals. Learn everything about self-drive adventures, safaris, road trips, and renting a car in Kigali.",
  keywords:
    "Kigali car rentals blog, Rwanda car rental tips, Kigali car hire guide, Rwanda travel tips, self drive Rwanda, car rental Kigali blog, Rwanda road trip guide, safari car hire Rwanda",
  openGraph: {
    title: "Kigali Car Rentals Blog | Travel Tips & Car Hire Guides in Rwanda",
    description:
      "Expert travel guides, car rental tips, and Rwanda road trip advice from Kigali Car Rentals.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kigali Car Rentals Blog | Rwanda Travel & Car Hire Tips",
    description:
      "Smart tips and expert guides for renting cars and exploring Rwanda with confidence.",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl("cars/1763129080028-2022-toyota-rav-4-prime-wheels-red-carprousa-1404x1112.webp")})`,
          }}
        >
          <div className="absolute inset-0 bg-black/65"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-32">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Rwanda Car Rental Blog & Travel Insights
          </h1>
          <p className="text-sm md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Powerful travel guides, smart car rental tips, and local insights from
            <span className="text-[#4B5320] font-semibold"> Kigali Car Rentals </span>
            to help you explore Rwanda with confidence, comfort, and class.
          </p>

          {/* Accent Line */}
          <div className="mt-8 flex justify-center">
            <span className="w-24 h-1 bg-[#4B5320] rounded-full"></span>
          </div>
        </div>
      </section>

      {/* Blog Listing */}
      <section className="relative">
        {/* Decorative Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4B5320] to-[#3E451A]" />
        <BlogListing />
      </section>
    </main>
  );
}

