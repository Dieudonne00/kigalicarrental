import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/images";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Schema markup for LocalBusiness
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "CarRental",
    "name": "Kigali Car Rental",
    "image": "https://kigalicarrental.vercel.app/images/logo.png",
    "url": "https://kigalicarrental.vercel.app",
    "telephone": "+250787619387",
    "email": "booking@carrentalinkigali.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "KG 541 St",
      "addressLocality": "Kigali",
      "addressCountry": "RW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": "Kigali"
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <footer className="bg-gray-900 text-gray-300" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 py-12">
          
          {/* Google Maps & Review Section - Local SEO Focus */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-800">
            
            {/* Google Map - Local Business Verification */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#4B5320]/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#4B5320]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg">
                  Best Car Rental Service in Kigali, Rwanda
                </h3>
              </div>
              
              <div className="rounded-xl overflow-hidden border-2 border-gray-700 h-[280px] relative shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.475553016763!2d30.061123!3d-1.944577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4252b7fc5b7%3A0x32a225c66ac6bfbe!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kigali Car Rental Location - Best Car Hire Services in Kigali, Rwanda"
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
              
              {/* Google Reviews Widget */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-bold text-lg ml-1">4.9</span>
                </div>
                <span className="text-gray-400">128+ Google Reviews - Top Rated Car Rental Kigali</span>
                <div className="flex items-center gap-1 bg-[#4B5320]/20 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 text-[#4B5320]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-[#4B5320] text-xs font-semibold">GOOGLE VERIFIED BUSINESS</span>
                </div>
              </div>
            </div>

            {/* Review CTA - Social Proof */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900 rounded-2xl p-6 border border-gray-700 flex flex-col justify-center shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#4B5320] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">Loved Our Car Rental Service?</h3>
                  <p className="text-gray-400 text-sm">Share your experience with Kigali Car Rental</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Your review helps 1000+ travelers monthly find reliable, affordable car rental services in Kigali, Rwanda. 
                Best car hire company with 4.9★ rating for self-drive, chauffeur, and airport transfers.
              </p>
              
              <a
                href="https://g.page/r/Cb5RvGrGJaoyEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#4B5320] hover:bg-[#3a4218] text-white px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                aria-label="Write a Google Review for Kigali Car Rental"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Write a Review on Google
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Takes only 1 minute • Helps fellow travelers find best car hire in Rwanda</span>
              </div>
            </div>
          </div>

          {/* Main Footer Grid - SEO Optimized Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Company Info with Keywords */}
            <div>
              <Link href="/" className="inline-block mb-4" aria-label="Kigali Car Rental Home">
                <Image
                  src={imageUrl("mylogo-removebg-preview_mpcp0n.png")}
                  alt="Kigali Car Rental - Best Car Hire Service in Kigali, Rwanda | Google Verified 4.9★"
                  width={140}
                  height={46}
                  className="h-12 w-auto brightness-0 invert"
                  priority={false}
                />
              </Link>
              <p className="text-sm leading-relaxed text-gray-400">
                <strong className="text-white">Kigali Car Rental</strong> - Your trusted partner for 
                <strong> car rentals in Kigali, Rwanda</strong>. Google Verified Business with 4.9★ rating. 
                Offering <strong>affordable car hire</strong>, <strong>self-drive rentals</strong>, 
                <strong> chauffeur services</strong>, and <strong>Kigali airport transfers</strong>. 
                Quality vehicles, competitive rates, professional service since 2024.
              </p>
              <div className="flex items-center gap-2 mt-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                <div className="w-8 h-8 bg-[#4B5320]/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#4B5320]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">✓ GOOGLE VERIFIED BUSINESS</p>
                  <p className="text-gray-400 text-xs">Top Rated Car Rental Kigali • Since 2024</p>
                </div>
              </div>
            </div>

            {/* Quick Links - Primary Keywords */}
            <div>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#4B5320] rounded-full"></span>
                Car Rental Services in Kigali
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Home - Best Car Hire Kigali
                  </Link>
                </li>
                <li>
                  <Link href="/car-hire-rwanda" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Car Hire Rwanda - Affordable Rates
                  </Link>
                </li>
                <li>
                  <Link href="/car-rental-kigali" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Car Rental Kigali - Self Drive
                  </Link>
                </li>
                <li>
                  <Link href="/kigali-airport-car-rental" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Kigali Airport Car Rental - Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/4x4-car-rental-rwanda" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    4x4 & Safari Vehicles - Rwanda Tours
                  </Link>
                </li>
                <li>
                  <Link href="/economy-car-rental-kigali" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Economy Cars - Budget Rentals
                  </Link>
                </li>
                <li>
                  <Link href="/luxury-car-rental-kigali" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Luxury Car Rental - Premium Vehicles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Information */}
            <div>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#4B5320] rounded-full"></span>
                Help & Information
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Contact Us - 24/7 Support
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    FAQ - Car Rental Questions
                  </Link>
                </li>
                <li>
                  <Link href="/driving-in-rwanda-guide" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Rwanda Driving Guide - Tips & Rules
                  </Link>
                </li>
                <li>
                  <Link href="/car-rental-terms-rwanda" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Rental Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy-car-rental" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Privacy Policy - Data Security
                  </Link>
                </li>
                <li>
                  <Link href="/cancellation-policy" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Cancellation Policy - Free Changes
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-gray-400 hover:text-[#4B5320] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#4B5320] rounded-full"></span>
                    Sitemap - All Pages
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info with Schema */}
            <div>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#4B5320] rounded-full"></span>
                Book Your Car Today
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-400">KG 541 St, Kigali, Rwanda (Near Kigali City Tower)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href="mailto:booking@carrentalinkigali.com" className="text-gray-400 hover:text-[#4B5320] transition-colors break-all">
                    booking@carrentalinkigali.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <a href="tel:+250787619387" className="text-gray-400 hover:text-[#4B5320] transition-colors">
                      +250 787 619 387
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">Call for instant booking</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#4B5320]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <a href="https://wa.me/250787619387" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#4B5320] transition-colors">
                      WhatsApp: +250 787 619 387
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">24/7 Quick response</p>
                  </div>
                </li>
              </ul>

              {/* Social Media with Keywords */}
              <div className="flex gap-2 mt-6">
                <h4 className="sr-only">Follow us on social media</h4>
                <a href="https://facebook.com/kigalicarrental" target="_blank" rel="noopener noreferrer" 
                   className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#4B5320] transition-colors group"
                   aria-label="Facebook - Kigali Car Rental">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://twitter.com/kigalicarhire" target="_blank" rel="noopener noreferrer" 
                   className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#4B5320] transition-colors group"
                   aria-label="Twitter - Kigali Car Rental">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="https://instagram.com/kigalicarrental" target="_blank" rel="noopener noreferrer" 
                   className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#4B5320] transition-colors group"
                   aria-label="Instagram - Kigali Car Rental">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/kigalicarrental" target="_blank" rel="noopener noreferrer" 
                   className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#4B5320] transition-colors group"
                   aria-label="LinkedIn - Kigali Car Rental">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Copyright and Trust Signals */}
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <p className="text-gray-400">
                  &copy; {currentYear} <strong className="text-white">Kigali Car Rental</strong> - 
                  Best Google Verified Car Hire Service in Kigali, Rwanda. All rights reserved.
                </p>
                <span className="hidden md:inline text-gray-700">|</span>
                <p className="flex items-center gap-2">
                  <span className="text-gray-500">Website by</span>
                  <a href="https://wa.me/250787619387" target="_blank" rel="noopener noreferrer" 
                     className="text-[#4B5320] hover:text-[#3a4218] transition-colors font-semibold">
                    Webtech Rwanda Ltd
                  </a>
                </p>
              </div>
              <div className="flex gap-6">
                <Link href="/terms" className="text-gray-400 hover:text-[#4B5320] transition-colors text-xs">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-[#4B5320] transition-colors text-xs">
                  Privacy Policy
                </Link>
                <Link href="/sitemap" className="text-gray-400 hover:text-[#4B5320] transition-colors text-xs">
                  XML Sitemap
                </Link>
                <Link href="/car-rental-booking" className="text-gray-400 hover:text-[#4B5320] transition-colors text-xs">
                  Book Now
                </Link>
              </div>
            </div>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 pt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-[#4B5320]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Google Verified Business
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-[#4B5320]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                4.9★ Rating (128+ Reviews)
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-[#4B5320]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Secure Booking SSL
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-[#4B5320]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Best Price Guarantee
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
