import Link from 'next/link'

export const metadata = {
  title: 'Car Rental Kigali | Airport Pickup & Best Deals | KigaliCarRental',
  description: 'Need a car in Kigali? Best car rental deals with airport pickup. Toyota RAV4, Prado, Sedans. Book your Kigali car rental online today.',
  keywords: 'car rental Kigali, Kigali car hire, rent a car Kigali, Kigali airport car rental, car hire Kigali airport',
}

export default function CarRentalKigali() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Car Rental in Kigali - Airport Pickup Available
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the best car rental deals in Kigali with free airport pickup and 24/7 customer support.
          </p>
        </div>

        {/* Kigali Areas */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            We Deliver All Over Kigali
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Kimihurura', 'Kacyiru', 'Nyarutarama', 'Remera', 'Gisozi', 'Kicukiro', 'City Center', 'Gikondo'].map((area, idx) => (
              <div key={idx} className="bg-blue-50 p-4 rounded text-center">
                <span className="font-bold text-blue-700">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Airport Service */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Kigali Airport Service</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">✈️ Airport Pickup Process</h3>
                <ol className="space-y-2 pl-5">
                  <li>1. Book online with flight details</li>
                  <li>2. We monitor your flight arrival</li>
                  <li>3. Meet at arrivals with your name sign</li>
                  <li>4. Quick 10-minute paperwork</li>
                  <li>5. Drive away from airport</li>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">✅ Airport Benefits</h3>
                <ul className="space-y-2">
                  <li>• No taxi needed from airport</li>
                  <li>• Skip rental counter lines</li>
                  <li>• Car ready upon arrival</li>
                  <li>• Save time and money</li>
                  <li>• Flight delay accommodation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Car Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Popular Cars in Kigali
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { type: 'SUV', desc: 'Toyota RAV4, Prado for families', price: 'From 50,000 RWF/day' },
              { type: 'Sedan', desc: 'Toyota Premio, Corolla for business', price: 'From 40,000 RWF/day' },
              { type: '4x4', desc: 'Land Cruiser for mountain trips', price: 'From 80,000 RWF/day' },
            ].map((car, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow text-center">
                <h3 className="text-2xl font-bold mb-2">{car.type}</h3>
                <p className="text-gray-600 mb-4">{car.desc}</p>
                <div className="text-blue-600 font-bold text-xl">{car.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/book-now"
            className="inline-block bg-green-600 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-green-700"
          >
            Book Your Kigali Car Now
          </Link>
          <p className="mt-4 text-gray-600">Include flight details for airport pickup service</p>
        </div>
      </div>
    </div>
  )
}