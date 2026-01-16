import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Explicitly expose environment variables to server
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
