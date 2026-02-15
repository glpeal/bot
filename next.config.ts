import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  devIndicators: false,
  async rewrites() {
    const botApi = process.env.BOT_API_URL || "http://localhost:5000";
    return [
      { source: "/api/:path*", destination: `${botApi}/api/:path*` },
    ];
  },
};
export default nextConfig;
