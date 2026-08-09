import { Metadata } from "next";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "How It Works | Kigali Car Rental",
  description:
    "How Kigali Car Rental works — browse the fleet, confirm your booking, and we deliver the car to your hotel or Kigali Airport, free of charge.",
  keywords: "Kigali car rental",
  alternates: { canonical: `${SITE}/how-it-works` },
  openGraph: {
    title: "How It Works | Kigali Car Rental",
    description: "How Kigali Car Rental works — browse, confirm, and get your car delivered free in Kigali.",
    url: `${SITE}/how-it-works`,
    siteName: "Kigali Car Rental",
    type: "website",
    locale: "en_RW",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "How It Works", item: `${SITE}/how-it-works` },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Rent a Car with Kigali Car Rental",
  description: "Renting a car in Rwanda through Kigali Car Rental, from browsing the fleet to returning the vehicle.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Browse Our Fleet", text: "Explore our diverse collection of vehicles and find the perfect car for your needs. Filter by category, transmission, seats, and more." },
    { "@type": "HowToStep", position: 2, name: "Select Your Car", text: "Choose your preferred vehicle and check availability. View detailed specifications, features, and pricing options for daily, weekly, or monthly rentals." },
    { "@type": "HowToStep", position: 3, name: "Book & Confirm", text: "Contact us via phone or email to make your reservation. Provide your rental dates, pickup location, and any special requirements." },
    { "@type": "HowToStep", position: 4, name: "Pick Up Your Car", text: "Present your valid driver's license and required documents. Our team will conduct a quick vehicle inspection with you before you drive off." },
    { "@type": "HowToStep", position: 5, name: "Enjoy Your Journey", text: "Hit the road and explore Rwanda at your own pace. Our vehicles are well-maintained and equipped for a comfortable, safe journey." },
    { "@type": "HowToStep", position: 6, name: "Return the Vehicle", text: "Return the car at the agreed time and location. We'll inspect the vehicle together and process your final payment if any additional charges apply." },
  ],
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      {children}
    </>
  );
}
