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

export const metadata: Metadata = {
  title: "Rwanda car rental | kigali car rental|  Rent a Car in Kigali | rent car with driver in kigali | rent a car in Rwanda self drive| Rwanda kigali car rentals",
  description: "Affordable car rental services in Kigali, Rwanda. Book your vehicle today for the best rates.",
  verification: {
    google: "xHopaPwEJGui02kgKU5AHndOdIRei2piro21JOdMeGk",
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
