// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "firebasestorage.googleapis.com",
//       "static.wikia.nocookie.net",
//       "media.themoviedb.org",
//       "pbs.twimg.com",
//       "www.ikea.com",
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/e-commerce-ikean-e962e.firebasestorage.app/o/**",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.themoviedb.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.ikea.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
