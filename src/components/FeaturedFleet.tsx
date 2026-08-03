import Image from "next/image";
import Link from "next/link";

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  dailyRate: number;
  weeklyRate?: number | null;
  monthlyRate?: number | null;
  images: string[];
  videoUrl?: string | null;
  hasActiveBooking?: boolean;
}

export default function FeaturedFleet({ cars }: { cars: Car[] }) {
  if (cars.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-gray-50" id="fleet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block bg-[#01B000]/10 text-[#01B000] text-sm font-bold px-4 py-2 rounded-full mb-4">
            {cars.length} Cars Available Now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
            Cars Available for Rental in Kigali
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Every car in our fleet is fully insured, regularly serviced, and ready for self-drive or chauffeured hire across Rwanda and East Africa.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {cars.map((car, index) => (
            <div
              key={car.id}
              className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#01B000] hover:shadow-md transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden flex-shrink-0">
                <Image
                  src={car.images[0] || "/placeholder-car.jpg"}
                  alt={`${car.name.trim()} — car rental & hire in Kigali Rwanda`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={index < 4}
                />
                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                  {car.hasActiveBooking ? (
                    <span className="px-2 py-0.5 bg-yellow-500 text-white rounded-full text-[10px] font-bold">
                      Booked
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-[#01B000] text-white rounded-full text-[10px] font-bold">
                      Available
                    </span>
                  )}
                  {car.videoUrl && (
                    <span className="px-2 py-0.5 bg-purple-600 text-white rounded-full text-[10px] font-bold flex items-center gap-0.5">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      Video
                    </span>
                  )}
                </div>
                {car.images.length > 1 && (
                  <div className="absolute bottom-2 left-2">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-black/60 text-white rounded text-[10px] font-medium">
                      <svg className="w-2.5 h-2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {car.images.length}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3 md:p-4 flex flex-col flex-1">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-0.5 font-[family-name:var(--font-plus-jakarta)] line-clamp-1">
                  {car.name}
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 mb-2 line-clamp-1">
                  {car.brand} {car.model} {car.year}
                </p>

                <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                  <span className="inline-flex items-center gap-0.5 bg-gray-100 text-gray-600 text-[9px] md:text-[10px] px-1.5 py-0.5 rounded-full capitalize font-medium">
                    <svg className="w-2.5 h-2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    {car.transmission}
                  </span>
                  <span className="inline-flex items-center gap-0.5 bg-gray-100 text-gray-600 text-[9px] md:text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                    <svg className="w-2.5 h-2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {car.seats} seats
                  </span>
                  <span className="inline-flex items-center gap-0.5 bg-gray-100 text-gray-600 text-[9px] md:text-[10px] px-1.5 py-0.5 rounded-full capitalize font-medium">
                    <svg className="w-2.5 h-2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {car.fuelType}
                  </span>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2 pt-2 border-t border-gray-100">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-lg md:text-xl font-bold text-[#01B000]">${car.dailyRate}</span>
                      <span className="text-[10px] md:text-xs text-gray-400">/day</span>
                    </div>
                    {car.weeklyRate && (
                      <span className="text-[10px] md:text-xs text-gray-400 hidden sm:block">${car.weeklyRate}/wk</span>
                    )}
                  </div>
                  <Link
                    href={`/cars/${car.id}`}
                    className="block w-full text-center bg-[#01B000] text-white px-3 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold hover:bg-[#019500] transition-all"
                  >
                    Hire This Car
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <p className="text-gray-500 text-sm mb-4">Showing all {cars.length} available cars. Need something specific?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/fleet"
              className="inline-flex items-center justify-center gap-2 bg-[#01B000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#019500] transition-all"
            >
              Filter by Category
              <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </Link>
            <a
              href="https://wa.me/250788892976"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:border-[#01B000] hover:text-[#01B000] transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ask via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
