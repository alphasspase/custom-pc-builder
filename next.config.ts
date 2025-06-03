import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000', // Specify the port your server is running on
        pathname: '/media/**', // Optional: restrict to specific paths
      },
      {
        protocol: 'https',
        hostname: 'apis.pixelgipfel.ch',
        pathname: '/media/**', // Optional: restrict to specific paths
      },
    ],
  },
};

export default nextConfig;
