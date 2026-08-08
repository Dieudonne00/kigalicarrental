import Link from "next/link";

const allServices = [
  { label: "Airport Transfer Kigali", href: "/airport-transfer-kigali" },
  { label: "Self-Drive Rwanda", href: "/self-drive-rwanda" },
  { label: "4x4 Car Hire Rwanda", href: "/4x4-car-hire-rwanda" },
  { label: "Gorilla Trekking Car Hire", href: "/gorilla-trekking-car-hire" },
  { label: "Wedding Car Hire Kigali", href: "/wedding-car-hire-kigali" },
  { label: "Corporate Car Hire", href: "/corporate-car-hire-kigali" },
  { label: "Luxury Car Hire Kigali", href: "/luxury-car-hire-kigali" },
  { label: "Long-Term Car Hire Kigali", href: "/long-term-car-hire-kigali" },
  { label: "NGO Car Hire Kigali", href: "/ngo-car-hire-kigali" },
  { label: "Lake Kivu Car Hire", href: "/lake-kivu-car-hire" },
  { label: "Nyungwe Forest Car Hire", href: "/nyungwe-forest-car-hire" },
  { label: "Volcanoes Park Car Hire", href: "/volcanoes-national-park-car-hire" },
];

export default function ServicePageFooter({ current }: { current: string }) {
  const others = allServices.filter((s) => s.href !== current);
  return (
    <section className="bg-gray-50 border-t border-gray-200 py-12 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 mb-2">Part of</p>
          <Link
            href="/"
            className="text-2xl font-bold text-[#1e3a8a] hover:text-[#172554] transition-colors font-[family-name:var(--font-plus-jakarta)]"
          >
            Kigali Car Rental
          </Link>
          <p className="text-gray-500 text-sm mt-1">Rwanda&apos;s trusted car rental — from $35/day · 24/7 · Free Kigali delivery</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {others.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xs text-gray-500 hover:text-[#1e3a8a] hover:underline transition-colors px-2 py-1"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
