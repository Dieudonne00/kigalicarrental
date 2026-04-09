"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed:", email);
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Top Section with Map and Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 pb-12 border-b border-gray-800">
          
          {/* Google Maps Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1E3A8A]/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#1E3A8A]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Find Us in Kigali</h3>
                <p className="text-gray-400 text-sm">Visit our showroom for test drives & inquiries</p>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden border-2 border-gray-700 h-[300px] relative shadow-2xl hover:shadow-3xl transition-shadow duration-300">
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
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300">KG 541 St, Kigali, Rwanda</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300">Mon-Sun: 8:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact & Newsletter Section */}
          <div className="space-y-6">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Quick Contact
              </h3>
              
              <div className="space-y-3 mb-6">
                <a href="tel:+250787619387" className="flex items-center gap-3 text-gray-300 hover:text-[#1E3A8A] transition-colors group">
                  <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#1E3A8A]/20 transition-colors">
                    <svg className="w-5 h-5 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Call us now</p>
                    <p className="font-semibold">+250 787 619 387</p>
                  </div>
                </a>
                
                <a href="https://wa.me/250787619387" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-[#1E3A8A] transition-colors group">
                  <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#1E3A8A]/20 transition-colors">
                    <svg className="w-5 h-5 text-[#1E3A8A]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.52 3.48A11.89 11.89 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.2 1.6 6.03L0 24l6.14-1.6c1.77.96 3.79 1.47 5.86 1.47 6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 21.82c-1.8 0-3.57-.48-5.09-1.39l-.37-.22-3.64.95.97-3.56-.24-.38a9.86 9.86 0 01-1.51-5.25c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9a9.85 9.85 0 012.9 7.01c-.01 5.44-4.44 9.87-9.89 9.87zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.49-.89-.79-1.5-1.77-1.67-2.07-.18-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.36-.01-.55-.01s-.5.07-.76.36c-.26.29-1 .97-1 2.37s1.02 2.75 1.17 2.94c.15.19 2.01 3.08 4.88 4.31 2.87 1.23 2.87.82 3.39.77.51-.05 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.33-.07-.11-.25-.19-.55-.33z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">WhatsApp</p>
                    <p className="font-semibold">+250 787 619 387</p>
                  </div>
                </a>
                
                <a href="mailto:booking@carrentalinkigali.com" className="flex items-center gap-3 text-gray-300 hover:text-[#1E3A8A] transition-colors group">
                  <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#1E3A8A]/20 transition-colors">
                    <svg className="w-5 h-5 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email us</p>
                    <p className="font-semibold text-sm break-all">booking@carrentalinkigali.com</p>
                  </div>
                </a>
              </div>
              
              {/* Newsletter Subscription */}
              <div className="pt-4 border-t border-gray-700">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Newsletter Signup
                </h4>
                <p className="text-gray-400 text-sm mb-3">Get exclusive deals & travel tips</p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1E3A8A] transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#1E3A8A] text-white font-semibold rounded-lg transition-all transform hover:scale-105"
                  >
                    Subscribe
                  </button>
                </form>
                {subscribed && (
                  <p className="text-[#1E3A8A] text-sm mt-2 animate-pulse">✓ Subscribed successfully!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Kigali Car Rental - Best Car Hire Service in Kigali, Rwanda"
                width={140}
                height={46}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for premium car rental services in Kigali, Rwanda. 
              Google Verified Business with 4.9★ rating.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-bold">4.9 / 5.0</p>
                <p className="text-xs text-gray-500">128+ Google Reviews</p>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1E3A8A] mt-1"></span>
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/self-drive-car-rental" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Self-Drive Rentals
                </Link>
              </li>
              <li>
                <Link href="/chauffeur-service-kigali" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Chauffeur Service
                </Link>
              </li>
              <li>
                <Link href="/airport-transfer-kigali" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link href="/long-term-car-rental" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Long-Term Rentals
                </Link>
              </li>
              <li>
                <Link href="/corporate-car-rental" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Corporate Fleet
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1E3A8A] mt-1"></span>
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link href="/driving-guide-rwanda" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Rwanda Driving Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Legal
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1E3A8A] mt-1"></span>
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Insurance Info
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-400 hover:text-[#1E3A8A] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full"></span>
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media Links */}
            <div className="flex gap-3">
              {[
                { href: "https://facebook.com", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { href: "https://twitter.com", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
                { href: "https://instagram.com", icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03z" },
                { href: "https://linkedin.com", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-[#1E3A8A] transition-all transform hover:scale-110 group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} <span className="text-white font-semibold">Kigali Car Rental</span>. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Designed and developed by <a href="https://wa.me/250787619387" className="hover:text-[#1E3A8A]">Our team</a>
              </p>
            </div>
            
            {/* Trust Badges */}
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-4 h-4 text-[#1E3A8A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>SSL Secure</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-4 h-4 text-[#1E3A8A]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                <span>Best Price</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
