import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FleetClient from "./FleetClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Car Hire Fleet Kigali | SUVs, 4x4, Luxury & Economy Cars — Kigali Car Rental",
  description: "Browse our full fleet of cars available for hire in Kigali, Rwanda. Economy cars from $30/day, SUVs from $60/day, 4x4 Land Cruisers from $90/day. All fully insured. Book online now.",
  keywords: "Kigali car rental",
  alternates: { canonical: "https://kigalicarrental.site/fleet" },
  openGraph: {
    title: "Car Hire Fleet Kigali | SUVs, 4x4, Luxury & Economy Cars",
    description: "Browse all cars available for hire in Kigali. Economy from $30/day, 4x4 Land Cruisers from $90/day. Fully insured. Book online or WhatsApp.",
    url: "https://kigalicarrental.site/fleet",
  },
};

export default async function FleetPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      brand: true,
      model: true,
      year: true,
      category: true,
      transmission: true,
      seats: true,
      fuelType: true,
      dailyRate: true,
      weeklyRate: true,
      monthlyRate: true,
      images: true,
      videoUrl: true,
      featured: true,
      available: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://kigalicarhire.b-cdn.net/hero%20section%20cars.png)" }}
        >
          <div className="absolute inset-0 bg-black/55"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <span className="inline-block bg-[#1e3a8a] text-white text-sm font-bold px-4 py-1 rounded-full mb-6">
            {cars.length} Cars Available Now
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-plus-jakarta)]">
            Car Hire Fleet in Kigali
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Economy cars, SUVs, 4x4 Land Cruisers and luxury vehicles — all fully insured, serviced, and ready for self-drive or chauffeur hire across Rwanda and East Africa.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#1e3a8a] text-white font-bold rounded-lg hover:bg-[#172554] transition-all"
          >
            Need Help? Contact Us
          </Link>
        </div>
      </section>

      {/* Server-rendered car list passed to client for filtering */}
      <FleetClient initialCars={cars as any} />
    </div>
  );
}



