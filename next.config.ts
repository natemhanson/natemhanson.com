import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These were their own pages briefly; everything now lives on the homepage.
  async redirects() {
    return [
      { source: "/story", destination: "/", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
