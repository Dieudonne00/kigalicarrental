"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How much does car rental in Kigali cost?",
    a: "Car rental prices start from $30 per day for economy cars. SUVs and 4x4s range from $60 to $120 per day. We offer discounted weekly and monthly rates. All prices include third-party insurance and 24/7 roadside support — no hidden fees.",
  },
  {
    q: "Do you offer self-drive car rental in Kigali?",
    a: "Yes. We offer self-drive rentals to customers with a valid driving licence. You can rent a car in Kigali and explore Rwanda at your own pace — Akagera National Park, Volcanoes National Park, Lake Kivu, Nyungwe Forest, and more.",
  },
  {
    q: "Can I get an airport pickup from Kigali International Airport?",
    a: "Yes. We provide 24/7 airport pickup and drop-off at Kigali International Airport. Our drivers meet you at arrivals with a name board and assist with your luggage. Fixed pricing with no surprise fees.",
  },
  {
    q: "What documents do I need to rent a car in Kigali?",
    a: "To rent a car with us you need a valid driving licence (an international driving permit is recommended for foreign visitors), a passport or national ID, and a deposit paid by mobile money, bank transfer or cash.",
  },
  {
    q: "Do you deliver the rental car to my hotel in Kigali?",
    a: "Yes. We offer free car delivery to any hotel, guesthouse or address in Kigali city. Delivery outside Kigali is available at a small additional charge. Just let us know your location when you book.",
  },
  {
    q: "Is Kigali car rental available 24 hours a day?",
    a: "Yes. We are available 24/7 for bookings, airport pickups, and roadside assistance. You can reach us by phone (+250 787 619 387), WhatsApp or email at info@kigalicarrental.site at any time.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Kigali Car Rental — Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Common questions about car rental in Kigali, Rwanda.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border-2 transition-all duration-300 ${
                  isOpen ? "border-[#1e3a8a] shadow-md" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-semibold text-gray-900 leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-[#1e3a8a] text-white rotate-45" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Still have questions?{" "}
          <a href="tel:+250787619387" className="text-[#1e3a8a] font-semibold hover:underline">
            Call us at +250 787 619 387
          </a>{" "}
          — we are available 24/7.
        </p>
      </div>
    </section>
  );
}
