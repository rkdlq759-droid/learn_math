import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"], // Allows development access from any local network IP
  experimental: {
    serverActions: {
      allowedOrigins: ["*"], // For development convenience, allowing all. You might want to restrict this in production.
    },
  },
};

export default nextConfig;
