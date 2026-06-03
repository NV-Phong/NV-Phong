import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
   const formData = await req.formData();
   const file = formData.get("file") as File;
   const fileUrl = formData.get("url") as string;

   if (fileUrl) {
      try {
         const res = await fetch(fileUrl);
         if (!res.ok) {
            return NextResponse.json(
               { error: "Failed to fetch URL" },
               { status: 400 },
            );
         }
         const blob = await res.blob();

         let filename = fileUrl.split("/").pop() || "downloaded-image";
         filename = filename.split("?")[0];
         if (!filename.includes(".")) {
            filename += "." + (blob.type.split("/")[1] || "jpg");
         }

         const { url } = await put(`files/${filename}`, blob, {
            access: "public",
         });

         return NextResponse.json({ url });
      } catch (e) {
         return NextResponse.json(
            { error: "Failed to upload from URL" },
            { status: 500 },
         );
      }
   }

   if (!file) {
      return NextResponse.json(
         { error: "No file uploaded and no URL provided" },
         { status: 400 },
      );
   }

   const { url } = await put(`files/${file.name}`, file, {
      access: "public",
   });

   return NextResponse.json({ url });
}

import { list } from "@vercel/blob";

export async function GET() {
   const { blobs } = await list({ prefix: "files/" });
   return Response.json(blobs);
}
