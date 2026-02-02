import { NextSeo } from 'next-seo'
import Link from 'next/link'

export default function CarRentalRwanda() {
  return (
    <>
      <NextSeo
        title="Car Rental Rwanda | Best Prices & Fleet 2024 | KigaliCarRental"
        description="Looking for car rental in Rwanda? We offer affordable cars with airport pickup in Kigali. Toyota RAV4, Prado, Sedans. Book online for best rates in Rwanda."
        canonical="https://www.kigalicarrental.site/car-rental-rwanda"
        openGraph={{
          url: 'https://www.kigalicarrental.site/car-rental-rwanda',
          title: 'Car Rental Rwanda | Best Prices & Fleet 2024',
          description: 'Affordable car rental in Rwanda with airport pickup service.',
        }}
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Car Rental in Rwanda - Best Prices 2024</h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-6">
            Welcome to the best car rental service in Rwanda! We offer a wide range of vehicles 
            at competitive prices for your travel needs across Rwanda. Whether you're visiting 
            Kigali, Musanze, or exploring Volcanoes National Park, we have the perfect car for you.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 my-10">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Why Choose Us in Rwanda?</h2>
              <ul className="space-y-3">
                <li>✓ Kigali Airport pickup & dropoff</li>
                <li>✓ 24/7 Rwanda customer support</li>
                <li>✓ Prices in Rwandan Francs (RWF)</li>
                <li>✓ Mobile money payments (MTN, Airtel)</li>
                <li>✓ Rwandan driver's license accepted</li>
                <li>✓ Full insurance coverage</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Popular Destinations</h2>
              <ul className="space-y-3">
                <li>• Kigali City car rental</li>
                <li>• Musanze (Ruhengeri) 4x4 rental</li>
                <li>• Huye (Butare) car hire</li>
                <li>• Rubavu (Gisenyi) beach cars</li>
                <li>• Volcanoes National Park safari</li>
                <li>• Akagera National Park tours</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Our Rwanda Car Fleet</h2>
            <p className="mb-8">
              From economy cars for city driving to 4x4 vehicles for mountain adventures, 
              we have the right car for your Rwandan journey.
            </p>
            
            <div className="text-center mt-8">
              <Link 
                href="/cars" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
              >
                View All Cars Available in Rwanda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}