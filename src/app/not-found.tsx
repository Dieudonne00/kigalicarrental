import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Kigali Car Rental",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-2">This page doesn&apos;t exist.</p>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you're looking for may have been moved or removed. Here are some places to go instead:
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Home
        </Link>
        <Link href="/fleet" className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          Browse Fleet
        </Link>
        <Link href="/contact" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
