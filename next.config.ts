import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ventum-sailing.ch",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
