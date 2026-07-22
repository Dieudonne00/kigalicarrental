"use client";

import { CAR_IMAGE_FALLBACK } from "@/lib/constants";

// Plain <img> with an onError fallback needs a Client Component boundary -
// event handlers can't be passed as props from a Server Component. Kept as
// its own tiny component so parents (like FeaturedFleet) can stay server
// components themselves.
export default function CarImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = CAR_IMAGE_FALLBACK;
      }}
    />
  );
}
