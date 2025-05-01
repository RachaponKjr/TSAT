// next.config.ts
import { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.resolve.modules.push(path.resolve('./src'));
    return config;
  },
};

export default nextConfig;
