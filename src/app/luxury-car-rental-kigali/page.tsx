import type { Metadata } from "next";
import LuxuryCarRentalKigaliClient from "./LuxuryCarRentalKigaliClient";

export const metadata: Metadata = {
  title: "Luxury Car Rental Kigali | Premium & Exotic Cars Rwanda",
  description:
    "Experience ultimate luxury car rental in Kigali. Mercedes-Benz, BMW, Range Rover, Porsche and Lexus with VIP chauffeur service and airport pickup across Rwanda.",
  alternates: {
    canonical: "/luxury-car-rental-kigali",
  },
  openGraph: {
    title: "Luxury Car Rental Kigali | Premium & Exotic Cars Rwanda",
    description:
      "Experience ultimate luxury car rental in Kigali. Mercedes-Benz, BMW, Range Rover, Porsche and Lexus with VIP chauffeur service and airport pickup across Rwanda.",
    url: "/luxury-car-rental-kigali",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  "name": "Luxury Car Rental Kigali",
  "description": "Premium luxury car rental in Kigali, Rwanda. Mercedes, BMW, Range Rover, and exotic cars with professional chauffeur service.",
  "url": "https://kigalicarrental.site/luxury-car-rental-kigali",
  "telephone": "+250787619387",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kigali",
    "addressCountry": "RW"
  },
  "priceRange": "$$$$",
  "areaServed": "Kigali, Rwanda",
  "brand": {
    "@type": "Brand",
    "name": "Kigali Car Rental Luxury Collection"
  }
};

export default function LuxuryCarRentalKigaliPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LuxuryCarRentalKigaliClient />
    </>
  );
}
