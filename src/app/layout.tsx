import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleAnalytics from "@/components/GoogleAnalytics";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const OG_IMAGE = "https://kigalicarrental.site/opengraph-image";

export const metadata: Metadata = {
  title: {
    default: "Kigali Car Rental | #1 Car Rental in Rwanda — from $30/day",
    template: "%s | Kigali Car Rental",
  },
  description:
    "Kigali Car Rental — Rwanda's most trusted car rental. From $30/day: SUVs, 4x4 Land Cruisers, luxury & economy cars. Airport pickup 24/7. Self-drive or chauffeur. WhatsApp +250 787 619 387.",
  keywords:
    "kigali car rental, car hire kigali, car rental kigali, rent a car kigali rwanda, self drive rwanda, airport transfer kigali, 4x4 hire rwanda, gorilla trekking car hire, chauffeur service kigali, kigali vehicle rental",
  metadataBase: new URL("https://kigalicarrental.site"),
  verification: {
    google: "xHopaPwEJGui02kgKU5AHndOdIRei2piro21JOdMeGk",
  },
  openGraph: {
    title: "Kigali Car Rental | #1 Car Rental in Rwanda — from $30/day",
    description:
      "Rwanda's trusted car rental from $30/day. 50+ vehicles: SUVs, 4x4 Land Cruisers, luxury & economy. Airport pickup 24/7. Free Kigali delivery. Self-drive or chauffeur.",
    type: "website",
    locale: "en_RW",
    siteName: "Kigali Car Rental",
    url: "https://kigalicarrental.site",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Kigali Car Rental — #1 car rental in Rwanda from $30/day" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kigali Car Rental | #1 Car Rental in Rwanda — from $30/day",
    description:
      "Rwanda's trusted car rental from $30/day. SUVs, 4x4, luxury & economy. Airport pickup 24/7. Free Kigali delivery.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://kigalicarhire.b-cdn.net" />
        <link rel="dns-prefetch" href="https://kigalicarhire.b-cdn.net" />
        <link rel="preconnect" href="https://media.kigalicarhire.rw" />

        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
        <WhatsAppButton />
      </body>
    </html>
  );
}
