import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: `/api/:path*`, destination: `${process.env.API_HOST || 'https://test-fe.mysellerpintar.com'}/api/:path*` }]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.sellerpintar.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  env: {
    API_HOST: process.env.API_HOST,
    BASE_URL: process.env.BASE_URL
  }
  /* config options here */
};

export default nextConfig;
