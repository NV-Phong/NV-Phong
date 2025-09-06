import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
   const supabase = await createClient();
   const { email, password, provider } = await req.json();
   const origin = new URL(req.url);

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
            redirectTo: `${origin}/callback`,
         },
      });

      if (error) {
         return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ data });
   }

   //-------------------------------------------------- RESPONSE --------------------------------------------------//
   if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
   }

   return NextResponse.json({ data });
}
