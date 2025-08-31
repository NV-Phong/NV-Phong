import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
   const formData = await req.formData();
   const file = formData.get("file") as File;

   if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
   }

   const { url } = await put(`files/${file.name}`, file, {
      access: "public",
   });

   return NextResponse.json({ url });
}
