import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'duzuzlbvjaxbidrblwbh.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ahhaqautoexchange.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.ahhaqautoexchange.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/financing',
        destination: '/finance',
        permanent: true,
      },
      {
        source: '/apply',
        destination: '/finance/apply',
        permanent: true,
      },
      {
        source: '/credit-application',
        destination: '/finance/apply',
        permanent: true,
      },
      {
        source: '/apply-online',
        destination: '/finance/apply',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
