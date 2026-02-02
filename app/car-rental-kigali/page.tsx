import { NextSeo } from 'next-seo'
import Link from 'next/link'

export default function CarRentalKigali() {
  return (
    <>
      <NextSeo
        title="Car Rental Kigali | Best Prices & Airport Pickup | KigaliCarRental"
        description="Need a car in Kigali? We offer the best car rental deals in Kigali with airport pickup. Toyota RAV4, Prado, Sedans available. Book your Kigali car rental online."
        canonical="https://www.kigalicarrental.site/car-rental-kigali"
        openGraph={{
          url: 'https://www.kigalicarrental.site/car-rental-kigali',
          title: 'Car Rental Kigali | Best Prices & Airport Pickup',
          description: 'Affordable car rental in Kigali with 24/7 service.',
        }}
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Car Rental in Kigali - Best Deals 2024</h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-6">
            Looking for reliable car rental in Kigali? We offer the best fleet of vehicles 
            at competitive prices. Whether you need a car for business, tourism, or special 
            events in Kigali, we have you covered.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 my-10">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Kigali Service Areas</h2>
              <ul className="space-y-3">
                <li>✓ Kimihurura delivery</li>
                <li>✓ Kacyiru pickup</li>
                <li>✓ Nyarutarama service</li>
                <li>✓ Remera/Gisozi</li>
                <li>✓ Kicukiro district</li>
                <li>✓ City center dropoff</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Kigali Airport Service</h2>
              <ul className="space-y-3">
                <li>• Kigali International Airport pickup</li>
                <li>• 24/7 airport arrivals</li>
                <li>• Flight delay accommodation</li>
                <li>• Quick check-in process</li>
                <li>• English/French/Kinyarwanda support</li>
                <li>• Free airport delivery</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/cars" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              Book Your Kigali Car Now
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}