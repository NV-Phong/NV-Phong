import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   async rewrites() {
      return [
         {
            source: "/api/:path*",
            destination: "/api/supabase/:path*",
         },
      ];
   },

   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "*.vercel-storage.com",
            pathname: "/files/**",
         },
      ],
   },
};

export default nextConfig;
