import { NextRequest, NextResponse } from "next/server";

const EXCEPTION_PREFIXES = ["/ui-engineer/supabase"];

function getProjectRef() {
   const url = process.env.SUPABASE_URL!;
   return url.split("//")[1].split(".")[0];
}

export function middleware(request: NextRequest) {
   const { cookies, nextUrl } = request;
   const projectRef = getProjectRef();
   const cookie0 = `sb-${projectRef}-auth-token.0`;
   const cookie1 = `sb-${projectRef}-auth-token.1`;
   const token = cookies.get(cookie0)?.value || cookies.get(cookie1)?.value;

   if (
      !EXCEPTION_PREFIXES.some((route) => nextUrl.pathname.startsWith(route)) &&
      !token
   ) {
      return NextResponse.redirect(new URL("/auth", request.url));
   }
   return NextResponse.next();
}

export const config = {
   matcher: ["/chat/:path*"],
};
