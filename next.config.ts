import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.12"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vitazan.webtechnomind.in",
        pathname: "/public/uploads/**",
      },
    ],
  },
};

export default nextConfig;
