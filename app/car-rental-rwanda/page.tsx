import Link from 'next/link'

export const metadata = {
  title: 'Car Rental Rwanda | Best Prices 2024 | KigaliCarRental',
  description: 'Book car rental in Rwanda at best prices. Toyota RAV4, Prado, Sedans available. Airport pickup, 24/7 support. Rent a car in Rwanda today!',
  keywords: 'car rental Rwanda, rent a car Rwanda, car hire Rwanda, Rwanda car rental, 4x4 rental Rwanda, Kigali car rental',
}

export default function CarRentalRwanda() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Car Rental in Rwanda - Best Prices 2024
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect car for your Rwandan adventure. From Kigali city tours to Volcanoes National Park safaris.
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
              <p className="text-gray-600">Toyota RAV4, Prado, Sedans, 4x4 for all terrains</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive rates in Rwandan Francs (RWF)</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-2">Local Company</h3>
              <p className="text-gray-600">Rwandan-owned, understanding local needs</p>
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
            Book your car today and get 10% off for online bookings
          </p>
          <div className="space-x-4">
            <Link
              href="/cars"
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
    </div>
  )
}