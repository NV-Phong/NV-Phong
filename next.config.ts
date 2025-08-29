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
};

export default nextConfig;
