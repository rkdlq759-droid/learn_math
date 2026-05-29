import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  experimental: {
    serverActions: {
      allowedOrigins: ["learn-math-cyan.vercel.app", "*.vercel.app", "localhost:3000"],
    },
  },
};

export default nextConfig;
