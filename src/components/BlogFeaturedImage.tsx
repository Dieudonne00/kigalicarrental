"use client";

import { useState } from "react";
import Image from "next/image";

const FALLBACK = "https://kigalicarhire.b-cdn.net/kigalicarhire.png";

interface Props {
  src: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function BlogFeaturedImage({ src, alt, className, priority }: Props) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className ?? "object-cover"}
      priority={priority}
      onError={() => setImgSrc(FALLBACK)}
    />
  );
}
