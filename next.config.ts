import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "static.wikia.nocookie.net",
      "media.themoviedb.org",
      "pbs.twimg.com",
      "www.ikea.com",
    ],
  },
};

export default nextConfig;
