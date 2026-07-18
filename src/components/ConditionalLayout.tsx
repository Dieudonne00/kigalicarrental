"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current route is a manager route
  const isManagerRoute = pathname?.startsWith("/manager");

  if (isManagerRoute) {
    // Manager routes: no header/footer
    return <>{children}</>;
  }

  // Public routes: normal page flow with a sticky header
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
