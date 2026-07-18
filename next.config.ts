import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Car/blog images are hosted across several third-party origins
    // (Cloudinary, a BunnyCDN pull zone, carrentalinkigali.com) that
    // intermittently reject Next's server-side optimization proxy with
    // 401/403 even though the images load fine directly in a browser.
    // Skipping optimization avoids that extra server-side hop entirely.
    unoptimized: true,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
