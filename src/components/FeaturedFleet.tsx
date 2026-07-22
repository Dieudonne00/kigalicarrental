import Link from "next/link";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import CarImage from "@/components/CarImage";

// Server-rendered - this was a client fetch with a spinner-only loading
// state, meaning the homepage's actual fleet showcase (real car names,
// prices, images) was invisible to crawlers on first paint, same bug
// pattern fixed elsewhere on the site.
export default async function FeaturedFleet() {
  const carsRaw = await prisma.car.findMany({
    where: { available: true, featured: true },
    orderBy: { createdAt: "desc" },
  });

  const cars = carsRaw.map((car) => ({
    ...car,
    imageUrl: car.images?.[0] || CAR_IMAGE_FALLBACK,
  }));

  if (cars.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Featured Fleet
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium vehicles
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
              >
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <CarImage
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model} ${car.year} rental - Kigali Car Rental Rwanda`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                      Featured
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-1">
                    {car.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-1">
                    {car.brand} {car.model} • {car.year}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-3 sm:mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span className="capitalize">{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{car.seats} seats</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="capitalize">{car.fuelType}</span>
                    </div>
                  </div>

                  <div className="mb-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">
                          ${car.dailyRate}
                        </span>
                        <span className="text-sm text-gray-500">/day</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/cars/${car.id}`}
                    className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-bold hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg"
          >
            View All Cars
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
