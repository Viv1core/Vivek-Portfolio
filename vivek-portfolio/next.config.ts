import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config) => {
    // Allow importing .glsl-style raw assets if ever needed, and keep
    // three.js tree-shaking friendly.
    config.externals = [...(config.externals || [])];
    return config;
  },
};

export default nextConfig;
