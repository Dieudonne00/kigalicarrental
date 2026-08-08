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
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.kigalicarhire.rw' }],
        destination: 'https://kigalicarhire.rw/:path*',
        permanent: true,
      },
      {
        // The canonical tag already told Google www is a duplicate of the
        // non-www version, but www.kigalicarrental.site was still serving
        // full 200 content instead of redirecting - a soft signal instead
        // of a hard one. This closes that gap entirely.
        source: '/:path*',
        has: [{ type: 'host', value: 'www.kigalicarrental.site' }],
        destination: 'https://kigalicarrental.site/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
