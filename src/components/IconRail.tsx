"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const railItems = [
  {
    href: "/fleet",
    label: "Fleet",
    icon: (
      <path d="M5 17h14M5 17a2 2 0 01-2-2v-2.5a1 1 0 01.3-.7l2.1-2.1A2 2 0 016.8 9h10.4a2 2 0 011.4.6l2.1 2.1a1 1 0 01.3.7V15a2 2 0 01-2 2M5 17a2 2 0 002 2h1a2 2 0 002-2m8 0a2 2 0 002 2h1a2 2 0 002-2M9 9l1-4h4l1 4" />
    ),
  },
  {
    href: "/self-drive-rwanda",
    label: "Self Drive",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4v3m0 10v3m8-8h-3M7 12H4" />
      </>
    ),
  },
  {
    href: "/driver-car-hire-kigali",
    label: "Driver",
    icon: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21v-2a7 7 0 0114 0v2" />
      </>
    ),
  },
  {
    href: "/4x4-car-rental-rwanda",
    label: "Safari 4x4",
    icon: <path d="M3 20l5-11 4 6 3-4 6 9H3z" />,
  },
  {
    href: "/kigali-airport-car-rental",
    label: "Airport",
    icon: <path d="M2.5 19.5l19-7-19-7 4 7-4 7zm4-7h14" />,
  },
  {
    href: "/deals/last-minute",
    label: "Deals",
    icon: (
      <>
        <path d="M20.59 13.41L11 3.83A2 2 0 009.59 3.24L4 3a1 1 0 00-1 1l.24 5.59a2 2 0 00.58 1.41l9.59 9.59a2 2 0 002.83 0l4.35-4.35a2 2 0 000-2.83z" />
        <circle cx="7.5" cy="7.5" r="1" />
      </>
    ),
  },
  {
    href: "/blog",
    label: "Blog",
    icon: <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v19H6.5A2.5 2.5 0 014 18.5v-14z" />,
  },
];

export default function IconRail() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Quick service navigation"
      className="hidden lg:flex fixed left-0 top-[108px] bottom-0 z-40 w-16 flex-col items-center bg-blue-900 pt-4 gap-1 overflow-y-auto"
    >
      {railItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className={`group flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-colors ${
              active ? "bg-blue-700 text-white" : "text-blue-200 hover:bg-blue-800 hover:text-white"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {item.icon}
            </svg>
            <span className="text-[10px] mt-1 leading-none text-center px-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
