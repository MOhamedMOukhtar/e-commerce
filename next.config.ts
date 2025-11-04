import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        // pathname: "/v0/b/e-commerce-ikean-e962e.firebasestorage.app/o/**",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.themoviedb.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.ikea.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

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
