"use client";
import Particles from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui-engineer/Icon";
import Separator from "@/components/ui-engineer/separator";

export default function BlobUploadFile() {
   const { resolvedTheme } = useTheme();
   const [color, setColor] = useState("#ffffff");
   const [showParticles, setShowParticles] = useState(true);
   const [currentTab, setCurrentTab] = useState("not-found");

   const [file, setFile] = useState<File | null>(null);
   const [url, setUrl] = useState<string>("");
   const [progress, setProgress] = useState<number>(0);

   useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
      setShowParticles(resolvedTheme === "dark");
   }, [resolvedTheme]);

   async function handleUpload() {
      if (!file) return;

      return new Promise<void>((resolve, reject) => {
         const formData = new FormData();
         formData.append("file", file);

         const xhr = new XMLHttpRequest();
         xhr.open("POST", "/api/vercel/file");

         xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
               const percent = Math.round((event.loaded / event.total) * 100);
               setProgress(percent);
            }
         };

         xhr.onload = () => {
            if (xhr.status === 200) {
               const data = JSON.parse(xhr.responseText);
               if (data.url) {
                  setUrl(data.url);
                  setProgress(100);
                  resolve();
               }
            } else {
               reject(new Error("Upload failed"));
            }
         };

         xhr.onerror = () => reject(new Error("Upload error"));
         xhr.send(formData);
      });
   }

   function handleClear() {
      setFile(null);
      setUrl("");
      setProgress(0);

      const input =
         document.querySelector<HTMLInputElement>('input[type="file"]');
      if (input) input.value = "";
   }

   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         {showParticles && (
            <Particles
               className="absolute inset-0 z-0"
               quantity={100}
               ease={80}
               color={color}
               refresh
            />
         )}
         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            <div className="flex max-w-xl flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="not-found" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0">
                        <CardTitle className=" flex flex-col">
                           <code className="text-primary-foreground-1 -mb-2">
                              POST
                           </code>
                           <p className="text-2xl">UPLOAD FILE</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Upload your file to Vercel Blob 🗃️
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="space-y-4 p-0 flex flex-col">
                        <div className="flex flex-col gap-5 justify-between">
                           <div className="space-y-2">
                              <Label>File</Label>
                              <Input
                                 type="file"
                                 onChange={(e) =>
                                    setFile(e.target.files?.[0] || null)
                                 }
                              />
                           </div>
                           <div className="space-y-2">
                              <Separator>Progress</Separator>
                              <Progress value={progress} className="w-[100%]" />
                           </div>
                           <div className="flex items-center justify-between p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm font-medium text-primary-foreground-darker">
                              <div className="flex items-center gap-2 max-w-[400px] w-80">
                                 <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                                    <Icon
                                       size={15}
                                       styles="solid"
                                       className="!bg-primary-foreground-darker"
                                       name="server"
                                    />
                                    URL
                                 </Badge>
                                 <span className="truncate font-normal">
                                    {url ||
                                       "will be render here when upload done"}
                                 </span>
                              </div>
                              <a
                                 href={url}
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 <Button
                                    variant={"ghost"}
                                    className="w-7.5 h-7.5"
                                 >
                                    <Icon
                                       styles="bulk"
                                       size={16}
                                       className="!bg-primary-foreground-darker absolute"
                                       name="link-circle-bulk-rounded"
                                    />
                                 </Button>
                              </a>
                           </div>
                        </div>
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between mt-5">
                           <Button
                              variant={"ghost"}
                              onClick={handleClear}
                              className="w-2/5 border"
                           >
                              Clear
                           </Button>
                           <Button onClick={handleUpload} className="w-2/5">
                              Upload
                           </Button>
                        </div>
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
