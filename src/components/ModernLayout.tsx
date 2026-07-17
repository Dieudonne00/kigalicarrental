"use client";

import React from "react";
import Link from "next/link";

export default function ModernLayout({
  title,
  subtitle,
  children,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-10">
          {title && <h1 className="text-3xl md:text-5xl font-bold text-blue-800">{title}</h1>}
          {subtitle && <p className="mt-3 text-lg text-blue-600 max-w-2xl mx-auto">{subtitle}</p>}
        </header>

        <main className="bg-white rounded-2xl shadow-lg p-6 md:p-10">{children}</main>

        <footer className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg">
            <div className="font-bold">Need help?</div>
            <Link href="/contact" className="underline font-semibold">
              Contact Us
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
