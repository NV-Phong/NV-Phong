import { NextRequest, NextResponse } from "next/server";
import { runMakeCommits } from "@/lib/make-commits";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
   let body: { dates?: string[]; commitsPerDay?: number };
   try {
      body = await request.json();
   } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
   }

   const { dates = [], commitsPerDay = 1 } = body;
   if (
      !Array.isArray(dates) ||
      typeof commitsPerDay !== "number" ||
      commitsPerDay < 1
   ) {
      return NextResponse.json(
         { error: "Expected dates (string[]) and commitsPerDay (number >= 1)" },
         { status: 400 },
      );
   }

   const encoder = new TextEncoder();
   const stream = new ReadableStream({
      async start(controller) {
         const send = (line: string) => {
            controller.enqueue(encoder.encode(line + "\n"));
         };
         const result = await runMakeCommits(dates, commitsPerDay, send);
         send(
            JSON.stringify({ done: true, ok: result.ok, error: result.error }),
         );
         controller.close();
      },
   });

   return new Response(stream, {
      headers: {
         "Content-Type": "text/plain; charset=utf-8",
         "Transfer-Encoding": "chunked",
      },
   });
}
