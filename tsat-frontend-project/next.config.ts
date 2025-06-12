// next.config.ts
import { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["150.95.26.51", "150.95.26.51"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.resolve.modules.push(path.resolve("./src"));
    return config;
  },
};

export default nextConfig;
