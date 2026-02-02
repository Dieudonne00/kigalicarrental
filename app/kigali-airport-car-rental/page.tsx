import { NextSeo } from 'next-seo'
import Link from 'next/link'

export default function KigaliAirportCarRental() {
  return (
    <>
      <NextSeo
        title="Kigali Airport Car Rental | Airport Pickup & Dropoff | KigaliCarRental"
        description="Arriving at KGL Airport? Book your Kigali airport car rental with pickup service. Best rates for airport car rental in Kigali. Toyota, SUVs, 4x4 available."
        canonical="https://www.kigalicarrental.site/kigali-airport-car-rental"
        openGraph={{
          url: 'https://www.kigalicarrental.site/kigali-airport-car-rental',
          title: 'Kigali Airport Car Rental | Airport Pickup Service',
          description: 'Convenient car rental at Kigali International Airport.',
        }}
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Kigali Airport Car Rental - Easy Pickup Service</h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-6">
            Arriving at Kigali International Airport (KGL)? Book your airport car rental in advance 
            for a smooth arrival experience. We meet you at the airport with your pre-booked car.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg my-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Airport Pickup Process</h2>
            <ol className="space-y-4 list-decimal pl-5">
              <li><strong>Book Online:</strong> Reserve your car before you arrive</li>
              <li><strong>Flight Details:</strong> Share your flight number and arrival time</li>
              <li><strong>Airport Meeting:</strong> We meet you at arrivals with your name sign</li>
              <li><strong>Quick Check-in:</strong> 10-minute paperwork and car handover</li>
              <li><strong>Start Your Journey:</strong> Drive away from the airport stress-free</li>
            </ol>
          </div>
          
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Why Book Airport Pickup?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🚗</div>
                <h3 className="font-bold text-lg">No Taxi Needed</h3>
                <p>Your car is waiting at the airport</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">⏰</div>
                <h3 className="font-bold text-lg">Save Time</h3>
                <p>Skip long rental counter lines</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">💰</div>
                <h3 className="font-bold text-lg">Best Price</h3>
                <p>Better rates than airport counters</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="/book-now" 
              className="bg-green-600 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-green-700"
            >
              Book Airport Pickup Now
            </Link>
            <p className="mt-4 text-gray-600">Include your flight details for airport service</p>
          </div>
        </div>
      </div>
    </>
  )
}