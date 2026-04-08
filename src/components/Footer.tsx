import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* TOP CTA (HIGH CONVERSION) */}
        <div className="mb-14 p-8 rounded-2xl bg-gradient-to-r from-[#4B5320]/20 to-[#4B5320]/5 border border-[#4B5320]/30 text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Book Your Car Rental in Kigali Today 🚗
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6 text-sm">
            Looking for <strong className="text-[#4B5320]">cheap car rental in Kigali</strong>, 
            <strong className="text-[#4B5320]"> luxury 4x4 Rwanda safari vehicles</strong>, or 
            <strong className="text-[#4B5320]"> airport transfer Kigali</strong>? 
            Kigali Car Hire offers reliable, affordable, and professional car rental services across Rwanda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-now" className="bg-[#4B5320] hover:bg-[#3a4218] text-white px-8 py-4 rounded-xl font-bold shadow-lg transition hover:scale-105">
              🚀 Book Now
            </Link>
            <a href="tel:+250787619387" className="border border-gray-600 hover:border-[#4B5320] px-8 py-4 rounded-xl font-bold transition hover:text-white">
              📞 Call Now
            </a>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* BRAND */}
          <div>
            <Image
              src="https://res.cloudinary.com/dxn12qcje/image/upload/v1770132530/mylogo-removebg-preview_mpcp0n.png"
              alt="Kigali Car Rental Rwanda"
              width={140}
              height={50}
              className="mb-4 brightness-0 invert"
            />

            <p className="text-sm text-gray-400 leading-relaxed">
              Kigali Car Rental is a trusted provider of 
              <span className="text-[#4B5320]"> car rental in Kigali</span>, 
              <span className="text-[#4B5320]"> self-drive Rwanda</span>, and 
              <span className="text-[#4B5320]"> luxury safari vehicles</span>. 
              We deliver affordable, secure, and professional transport services across Rwanda.
            </p>

            <div className="mt-5 text-sm text-gray-500">
              📍 Kigali, Rwanda <br />
              ⭐ 4.9 Rating • 100+ Happy Clients
            </div>
          </div>

          {/* SERVICES (SEO HEAVY) */}
          <div>
            <h3 className="text-white font-bold mb-4">
              Car Rental Services
            </h3>

            <ul className="space-y-2 text-sm">
              <li><Link href="/car-rental-kigali" className="hover:text-[#4B5320]">Car Rental Kigali</Link></li>
              <li><Link href="/kigali-airport-car-rental" className="hover:text-[#4B5320]">Kigali Airport Car Rental</Link></li>
              <li><Link href="/car-hire-rwanda" className="hover:text-[#4B5320]">Car Hire Rwanda</Link></li>
              <li><Link href="/4x4-car-rental-rwanda" className="hover:text-[#4B5320]">4x4 Safari Rental Rwanda</Link></li>
              <li><Link href="/self-drive-rwanda" className="hover:text-[#4B5320]">Self Drive Rwanda</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-white font-bold mb-4">
              Support
            </h3>

            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-[#4B5320]">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#4B5320]">FAQ</Link></li>
              <li><Link href="/driving-in-rwanda-guide" className="hover:text-[#4B5320]">Driving in Rwanda Guide</Link></li>
              <li><Link href="/terms" className="hover:text-[#4B5320]">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-[#4B5320]">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-bold mb-4">
              Contact Us
            </h3>

            <ul className="space-y-3 text-sm">
              <li>📍 Kigali, Rwanda</li>
              <li>
                <a href="tel:+250787619387" className="hover:text-[#4B5320]">
                  📞 +250 787 619 387
                </a>
              </li>
              <li>
                <a href="mailto:booking@carrentalinkigali.com" className="hover:text-[#4B5320]">
                  ✉️ booking@carrentalinkigali.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/250787619387" target="_blank" className="hover:text-[#4B5320]">
                  💬 WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO PARAGRAPH (POWER BOOST) */}
        <div className="text-xs text-gray-600 leading-relaxed border-t border-gray-800 pt-6">
          Kigali Car Rental provides the best car rental services in Kigali Rwanda including cheap car rental Kigali, 
          Kigali airport car hire, Rwanda safari 4x4 rental, self drive Rwanda, luxury car hire Rwanda, and long term car rental Rwanda. 
          Whether you are visiting for tourism, business, or safari trips, we guarantee reliable transport solutions across Kigali and Rwanda.
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-500">
          <p>© {currentYear} Kigali Car Rental Rwanda. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a href="https://wa.me/250787619387" className="text-[#4B5320] font-semibold">
              Webtech Rwanda Ltd
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
