import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Google Maps & Review Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-800">
          {/* Google Map */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#2563EB]/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#2563EB]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg">Our Location - Kigali, Rwanda</h3>
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
                title="Kigali Car Rental - Google Verified Business Location"
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1 bg-blue-600/20 px-3 py-1 rounded-full">
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-blue-400 text-xs font-semibold">GOOGLE VERIFIED</span>
              </div>
              <a
                href="https://g.page/r/Cb5RvGrGJaoyEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors underline"
              >
                See our Google reviews
              </a>
            </div>
          </div>

          {/* Review CTA */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900 rounded-2xl p-6 border border-gray-700 flex flex-col justify-center shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">Loved our service?</h3>
                <p className="text-gray-400 text-sm">Your review helps others find us</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Share your experience with Kigali Car Rental on Google. 
              Your feedback helps 1000+ travelers monthly find reliable car rental in Rwanda.
            </p>
            
            <a
              href="https://g.page/r/Cb5RvGrGJaoyEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
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
              <span>Takes only 1 minute • Helps the community</span>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="https://carrentalinkigali.com/myimages/mylogo-removebg-preview_mpcp0n.png"
                alt="Kigali Car Rental - Google Verified Car Rental in Rwanda"
                width={140}
                height={46}
                className="h-12 w-auto brightness-0 invert"
                priority={false}
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted partner for car rentals in Kigali, Rwanda. Google Verified Business. Quality vehicles, competitive rates, professional service.
            </p>
            <div className="flex items-center gap-2 mt-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">✓ GOOGLE VERIFIED BUSINESS</p>
                <p className="text-gray-400 text-xs">Since 2024 • Kigali, Rwanda</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2563EB] rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/car-hire-rwanda" className="text-gray-400 hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  Car Hire Rwanda
                </Link>
              </li>
              <li>
                <Link href="/kigali-airport-car-rental" className="text-gray-400 hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  Kigali Airport Rental
                </Link>
              </li>
              <li>
                <Link href="/4x4-car-rental-rwanda" className="text-gray-400 hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  4x4 & Safari Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2563EB] rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#2563EB] transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2563EB] rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#2563EB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-400">KG 541 St, Kigali, Rwanda</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#2563EB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:hi@rwandatours.co.rw" className="text-gray-400 hover:text-[#2563EB] transition-colors break-all">
                  hi@rwandatours.co.rw
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#2563EB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:+250787619387" className="text-gray-400 hover:text-[#2563EB] transition-colors">
                  +250 787 619 387
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#2563EB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <a href="https://wa.me/250787619387" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2563EB] transition-colors">
                  WhatsApp: +250 787 619 387
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Popular Searches - real internal links to the actual matching page for
            each search intent, not a raw keyword list. Google treats a wall of
            unlinked keyword phrases as keyword stuffing, and duplicate links with
            different anchor text pointing at the same URL as link manipulation -
            this is one link per distinct destination page, anchor text drawn
            from the real search phrase it matches. */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">
            Popular Kigali Car Rental Searches
          </h3>
          <div className="flex flex-wrap gap-x-2 gap-y-2 text-sm">
            {[
              // Only the homepage and the airport-specific page get the
              // site's two exact-match head phrases as anchor text - every
              // other destination gets anchor text matching ITS OWN target
              // keyword. Repeating "Kigali Car Rental" as anchor text to 8+
              // unrelated pages, on every single page of the site, told
              // Google those pages were all equally valid candidates for the
              // head term - splitting the exact ranking signal we want
              // concentrated on the homepage alone.
              { label: "Kigali Car Rental", href: "/" },
              { label: "Cheap Car Rental Kigali", href: "/cheap-car-rental-kigali" },
              { label: "Last-Minute Rental Deals", href: "/deals/last-minute" },
              { label: "About Our Company", href: "/about" },
              { label: "Book Online Now", href: "/book-now" },
              { label: "Driver Car Hire Kigali", href: "/driver-car-hire-kigali" },
              { label: "Kigali Self Drive Car Rental", href: "/self-drive-car-rental-kigali" },
              { label: "Browse Our Fleet & Rates", href: "/fleet" },
              { label: "Long Term Car Rental Rwanda", href: "/long-term-car-rental-rwanda" },
              { label: "Read Our Google Reviews", href: "https://g.page/r/Cb5RvGrGJaoyEBM/review", external: true },
              { label: "Kigali Airport Car Rental", href: "/kigali-airport-car-rental" },
              { label: "Kigali Airport Car Rental With Driver", href: "/airport-driver-service" },
              { label: "Car Hire Rwanda", href: "/car-hire-rwanda" },
              { label: "Kigali Rwanda Car Rental", href: "/car-rental-rwanda" },
              { label: "Luxury Car Rental Kigali", href: "/luxury-car-rental-kigali" },
              { label: "4x4 Rental Kigali", href: "/4x4-car-rental-rwanda" },
              { label: "Wedding Car Rental Kigali", href: "/event-transport-driver" },
              { label: "Corporate Car Rental Kigali", href: "/business-driver-service" },
              { label: "Chauffeur Driven Car Rental Kigali", href: "/chauffeur-service-rwanda" },
              { label: "How It Works", href: "/how-it-works" },
              { label: "Rental FAQ", href: "/faq" },
            ].map((item, i, arr) => (
              <span key={item.href} className="whitespace-nowrap">
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2563EB] transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className="text-gray-400 hover:text-[#2563EB] transition-colors">
                    {item.label}
                  </Link>
                )}
                {i < arr.length - 1 && <span className="text-gray-700 ml-2">&middot;</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-gray-400">
                &copy; {currentYear} Kigali Car Rental. Google Verified Business in Rwanda.
              </p>
              <span className="hidden md:inline text-gray-700">|</span>
              <p className="flex items-center gap-2">
                <span className="text-gray-500">Developed by</span>
                <a href="https://wa.me/250787619387" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors font-semibold">
                  Webtech Rwanda Ltd
                </a>
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-gray-400 hover:text-[#2563EB] transition-colors text-xs">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-[#2563EB] transition-colors text-xs">
                Privacy
              </Link>
              <Link href="/site-map" className="text-gray-400 hover:text-[#2563EB] transition-colors text-xs">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
