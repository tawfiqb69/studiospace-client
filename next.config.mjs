/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async rewrites() {
    return [
      {
        source: "/api/studios/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/studios/:path*`,
      },
      {
        source: "/api/my-studios",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/my-studios`,
      },
      {
        source: "/api/bookings/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/:path*`,
      },

    ];
  },
};

export default nextConfig;