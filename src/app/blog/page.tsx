import { Metadata } from "next";
import BlogListing from "@/components/BlogListing";

export const metadata: Metadata = {
  title: "Car Rental Blog | Tips & Guides for Traveling in Rwanda",
  description:
    "Read our latest articles about car rentals, travel tips, and exploring Rwanda. Expert advice for self-drive adventures, tourist destinations, and everything you need to know about renting a car in Kigali.",
  keywords:
    "car rental Rwanda blog, Kigali travel tips, Rwanda tourism guide, self drive Rwanda tips, car hire advice, Rwanda travel blog, Akagera safari tips, Rwanda road trip guide",
  openGraph: {
    title: "Car Rental Blog | Tips & Guides for Traveling in Rwanda",
    description:
      "Expert advice and guides for renting cars and traveling in Rwanda",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Rental Blog | Tips & Guides for Traveling in Rwanda",
    description:
      "Expert advice and guides for renting cars and traveling in Rwanda",
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
