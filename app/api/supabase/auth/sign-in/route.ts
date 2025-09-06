import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
   const supabase = await createClient();
   const { email, password, provider } = await req.json();

   //-------------------------------------------------- EMAIL/PASSWORD --------------------------------------------------//
   const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
   });

   //-------------------------------------------------- GOOGLE --------------------------------------------------//
   if (provider === "google") {
      const { data, error } = await supabase.auth.signInWithOAuth({
         provider: "google",
         options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth`,
         },
      });

      if (error) {
         return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ data });
   }

   if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
   }

   return NextResponse.json({ data });
}
