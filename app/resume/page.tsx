"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CommitChanges } from "@/components/ui-engineer/commit-changes";
import CommitsPerDay from "@/components/ui-engineer/commits-per-day";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui-engineer/range-date-picker";

export default function IntroCard() {
   const [currentTab, setCurrentTab] = useState("preview");
   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <TabsList className="bg-primary/15 border border-primary/20">
               <TabsTrigger value="preview" className="text-primary">
                  Preview
               </TabsTrigger>
               <TabsTrigger value="download" className="text-primary">
                  Download
               </TabsTrigger>
            </TabsList>

            <div className="flex flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent
                  forceMount={true}
                  value="preview"
                  className="flex justify-center data-[state=inactive]:hidden"
               >
                  <Card className="rounded-xl bg-card p-0 text-sm/7 text-foreground shadow-none border-none">
                     <iframe
                        className="rounded-xl border border-primary/30"
                        width="1000"
                        height="562"
                        src="https://embed.figma.com/design/rkiZnUdOKwzcGShxZHzAWs/CV-%E2%80%A2-Resume?node-id=0-1&embed-host=share"
                        allowFullScreen
                     ></iframe>
                  </Card>
               </TabsContent>

               <TabsContent value="download" className="flex justify-center">
                  <Card className="w-xl rounded-xl bg-card border-none shadow-none">
                     <CardHeader>
                        <CardTitle className="text-xl">DOWNLOAD</CardTitle>
                        <CardDescription>
                           Download my resume in PDF format
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2 flex justify-between">
                           <div className="space-y-2">
                              <Label>Light Resume</Label>
                              <DatePicker />
                           </div>
                           <div className="space-y-2">
                              <Label>Dark Resume</Label>
                              <CommitsPerDay />
                           </div>
                        </div>
                     </CardContent>
                     <CardFooter className="align justify-between">
                        <Button
                           variant="outline"
                           className="w-2/5 bg-transparent"
                           type="button"
                        >
                           Clear
                        </Button>
                        <CommitChanges />
                     </CardFooter>
                  </Card>
               </TabsContent>
            </div>
         </Tabs>
         <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
         <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
         <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
         <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
      </div>
   );
}
