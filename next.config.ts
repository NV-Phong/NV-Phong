import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   async rewrites() {
      return [
         {
            source: "/api/v1/:path*",
            destination: "/api/next/:path*",
         },
         {
            source: "/api/:path*",
            destination: "/api/supabase/:path*",
         },
         {
            source: "/signature",
            destination:
               "https://qq90n93onn5q8tmx.public.blob.vercel-storage.com/Signature/Signature%20-%20Pink.png",
         },
         {
            source: "/signature/green",
            destination:
               "https://qq90n93onn5q8tmx.public.blob.vercel-storage.com/Signature/Signature%20-%20Green.png",
         },
         {
            source: "/signature/pink",
            destination:
               "https://qq90n93onn5q8tmx.public.blob.vercel-storage.com/Signature/Signature%20-%20Pink.png",
         },
         {
            source: "/signature/blue",
            destination:
               "https://qq90n93onn5q8tmx.public.blob.vercel-storage.com/Signature/Signature%20-%20Blue.png",
         },
         {
            source: "/signature/violet",
            destination:
               "https://qq90n93onn5q8tmx.public.blob.vercel-storage.com/Signature/Signature%20-%20Violet.png",
         },
         {
            source: "/signature/orange",
            destination:
               "https://qq90n93onn5q8tmx.public.blob.vercel-storage.com/Signature/Signature%20-%20Orange.png",
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
         {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
            pathname: "/**",
         },
      ],
   },
};

export default nextConfig;
