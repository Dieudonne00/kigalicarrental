import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay Online | Kigali Car Rental",
  description: "Pay for your Kigali Car Rental booking online.",
  robots: { index: false, follow: true },
};

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
