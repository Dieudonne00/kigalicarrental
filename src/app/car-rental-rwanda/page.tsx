import Link from 'next/link'
import type { Metadata } from 'next'
import HomeLinkCTA from '@/components/HomeLinkCTA'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Car Rental Rwanda | Best Prices | Kigali Car Rental',
  description: 'Book car rental in Rwanda at best prices. Toyota RAV4, Prado, Sedans available. Airport pickup, 24/7 support. Rent a car in Rwanda today!',
  keywords: 'car rental Rwanda, rent a car Rwanda, car hire Rwanda, Rwanda car rental, 4x4 rental Rwanda, Kigali car rental',
  alternates: {
    canonical: '/car-rental-rwanda',
  },
}

export default function CarRentalRwanda() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchema name="Car Rental Rwanda" path="/car-rental-rwanda" />
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Car Rental in Rwanda - Best Prices
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect car for your Rwandan adventure. From Kigali city tours to Volcanoes National Park safaris.
          </p>
        </div>

        {/* Intro copy - real, specific content rather than a thin card grid */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-4">
            Renting a car in Rwanda means covering more ground than Kigali alone in a single trip. Roads between the capital and Musanze, Rubavu, or Huye are paved and well maintained, but distances add up fast in a country built on hills - what looks like a short hop on the map can take two or three hours on winding mountain roads. Having your own vehicle means you set the pace instead of working around a tour bus schedule.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our Rwanda fleet ranges from fuel-efficient sedans for city and highway driving to 4x4 SUVs built for the unpaved stretches near Akagera and Volcanoes National Park. Every rental includes basic insurance, and you can choose self-drive or add a professional driver for $20/day if you'd rather focus on the scenery than the road.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Rent With Us in Rwanda?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold mb-2">Large Fleet</h3>
              <p className="text-gray-600">Toyota RAV4, Prado, Sedans, 4x4 for all terrains - see the full lineup on our fleet page.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">Daily rates shown up front in USD, no hidden fees added at pickup.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-2">Local Company</h3>
              <p className="text-gray-600">Rwandan-owned and based in Kigali, with a team that knows the country's roads firsthand.</p>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Popular Rwanda Destinations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Kigali City', desc: 'Business & city exploration' },
              { name: 'Musanze', desc: 'Volcanoes National Park access' },
              { name: 'Huye (Butare)', desc: 'Cultural heritage sites' },
              { name: 'Rubavu (Gisenyi)', desc: 'Lake Kivu beaches' },
              { name: 'Nyungwe Forest', desc: 'Canopy walk & chimpanzees' },
              { name: 'Akagera Park', desc: 'Safari & wildlife viewing' },
            ].map((place, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                <p className="text-gray-600">{place.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Rwanda?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Browse the fleet and book online, or reach out directly - we're ready when you are.
          </p>
          <div className="space-x-4">
            <Link
              href="/fleet"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-bold hover:bg-gray-100"
            >
              View Available Cars
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <HomeLinkCTA before="Looking specifically for a Kigali rental? Visit our" after="page." />
    </div>
  )
}
