import Link from 'next/link'

export const metadata = {
  title: 'Kigali Airport Car Rental | KGL Airport Pickup Service | KigaliCarRental',
  description: 'Arriving at KGL Airport? Book Kigali airport car rental with pickup service. Best rates, meet at arrivals. Book your airport car rental now.',
  keywords: 'Kigali airport car rental, KGL airport car hire, airport pickup Kigali, rent a car Kigali airport, car rental Kigali International Airport',
}

export default function KigaliAirportCarRental() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            ✈️ Kigali International Airport (KGL)
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kigali Airport Car Rental
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Land at KGL and drive away. We meet you at arrivals with your pre-booked car.
          </p>
        </div>

        {/* Process */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How Airport Pickup Works
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Book Online', desc: 'Include flight details' },
              { step: '2', title: 'Arrive at KGL', desc: 'We monitor your flight' },
              { step: '3', title: 'Meet & Greet', desc: 'Name sign at arrivals' },
              { step: '4', title: 'Drive Away', desc: '10-minute paperwork' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Airport Pickup?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '⏱️', title: 'Save Time', desc: 'Skip rental counter lines' },
              { icon: '💰', title: 'Save Money', desc: 'Better rates than airport counters' },
              { icon: '🚗', title: 'Convenience', desc: 'Car ready at arrivals' },
              { icon: '📱', title: 'Easy Booking', desc: 'Book online in minutes' },
              { icon: '🛡️', title: 'Full Insurance', desc: 'Comprehensive coverage included' },
              { icon: '📞', title: '24/7 Support', desc: 'Help anytime at airport' },
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                <div className="text-3xl">{benefit.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flight Form */}
        <div className="bg-blue-600 text-white p-8 rounded-2xl max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Include Flight Details</h2>
          <p className="mb-6">For smooth airport pickup, include when booking:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-700 p-4 rounded">
              <div className="font-bold mb-2">Flight Number</div>
              <div className="text-sm">e.g., WB 450, KQ 462</div>
            </div>
            <div className="bg-blue-700 p-4 rounded">
              <div className="font-bold mb-2">Arrival Time</div>
              <div className="text-sm">Date & time at KGL</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/book-now"
            className="inline-block bg-green-600 text-white px-12 py-4 rounded-lg text-2xl font-bold hover:bg-green-700 shadow-lg"
          >
            Book Airport Pickup Now
          </Link>
          <p className="mt-6 text-gray-600 text-lg">
            Or call us: <span className="font-bold">+250 788 123 456</span> (24/7 airport line)
          </p>
        </div>
      </div>
    </div>
  )
}