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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";
import React, { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui-engineer/Icon";
import Separator from "@/components/ui-engineer/separator";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
   Dialog,
   DialogContent,
   DialogOverlay,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check, Download, Share2, Trash2, ZoomIn, X, Play } from "lucide-react";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";

function FilePreview({ file }: { file: File }) {
   const [src, setSrc] = useState<string | null>(null);
   useEffect(() => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
         const url = URL.createObjectURL(file);
         setSrc(url);
         return () => URL.revokeObjectURL(url);
      }
      setSrc(null);
   }, [file]);
   if (!src)
      return (
         <div className="flex size-12 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-medium uppercase text-muted-foreground">
            {file.name.split(".").pop()}
         </div>
      );
   return file.type.startsWith("video/") ? (
      <video
         src={src}
         className="size-12 object-cover rounded shrink-0 bg-muted"
         autoPlay
         muted
         loop
         playsInline
      />
   ) : (
      <img
         src={src}
         alt=""
         className="size-12 object-cover rounded shrink-0 bg-muted"
      />
   );
}

type FileItem = {
   url: string;
   downloadUrl: string;
   pathname: string;
   size: number;
   uploadedAt: string;
};

export default function BlobUploadFile() {
   const { resolvedTheme } = useTheme();
   const [color, setColor] = useState("#ffffff");
   const [showParticles, setShowParticles] = useState(true);
   const [currentTab, setCurrentTab] = useState("upload");
   const [currentFileTab, setCurrentFileTab] = useState("graphic");

   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const [file, setFile] = useState<File | null>(null);
   const [files, setFiles] = useState<FileItem[]>([]);
   const [url, setUrl] = useState<string>("");
   const [progress, setProgress] = useState<number>(0);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const [inputUrl, setInputUrl] = useState<string>("");
   const [copiedFile, setCopiedFile] = useState<string | null>(null);

   useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
      setShowParticles(resolvedTheme === "dark");
   }, [resolvedTheme]);

   async function handleUpload() {
      if (!file && !inputUrl) return;

      return new Promise<void>((resolve, reject) => {
         const formData = new FormData();
         if (file) {
            formData.append("file", file);
         } else if (inputUrl) {
            formData.append("url", inputUrl);
         }

         const xhr = new XMLHttpRequest();
         xhr.open("POST", "/api/vercel/storage");

         xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
               const percent = Math.round((event.loaded / event.total) * 100);
               setProgress(percent);
            }
         };

         xhr.onload = () => {
            if (xhr.status === 200) {
               const data = JSON.parse(xhr.responseText);
               handleGetFiles();
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
      setInputUrl("");
      setUrl("");
      setProgress(0);

      const input =
         document.querySelector<HTMLInputElement>('input[type="file"]');
      if (input) input.value = "";
   }

   async function handleGetFiles() {
      try {
         setLoading(true);
         setError(null);
         const res = await fetch("/api/vercel/storage");
         if (!res.ok) throw new Error(`HTTP ${res.status}`);
         const data: FileItem[] = await res.json();
         setFiles(data);
      } catch (err: unknown) {
         setError(err instanceof Error ? err.message : "Failed to fetch files");
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      handleGetFiles();
   }, []);

   const isVideoFile = (pathname: string) =>
      /\.(mp4|webm|ogg|mov|mkv)$/i.test(pathname);

   const graphicFiles = files.filter((f) =>
      /\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|ogg|mov|mkv)$/i.test(f.pathname),
   );
   const otherFiles = files.filter(
      (f) => !/\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|ogg|mov|mkv)$/i.test(f.pathname),
   );

   const isVideoUrl = (url: string) => /\.(mp4|webm|ogg|mov|mkv)(\?.*)?$/i.test(url);

   // Helper to remove leading `files/` from stored pathnames for display
   const getDisplayName = (pathname: string) =>
      pathname.replace(/^files\//, "");

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
            <TabsList className="bg-primary/15 border border-primary/20">
               <TabsTrigger value="upload" className="text-primary">
                  Upload
               </TabsTrigger>
               <TabsTrigger value="gallery" className="text-primary">
                  Gallery
               </TabsTrigger>
            </TabsList>
            <div className="flex max-w-xl flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="upload" className="flex justify-center">
                  <Card className="rounded-xl bg-card max-w-lg p-10 text-sm/7 text-foreground shadow-none border-none">
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
                              <div className="flex flex-col gap-2 rounded-md border p-2">
                                 {file ? (
                                    <div className="flex gap-2 items-center min-w-0">
                                       <FilePreview file={file} />
                                       <Input
                                          value={file.name}
                                          readOnly
                                          className="flex-1 min-w-0 text-muted-foreground"
                                          title={file.name}
                                       />
                                       <Button
                                          type="button"
                                          variant="outline"
                                          size="icon"
                                          onClick={() => {
                                             setFile(null);
                                             if (fileInputRef.current) {
                                                fileInputRef.current.value = "";
                                             }
                                          }}
                                          disabled={loading}
                                          className="shrink-0 bg-transparent"
                                          aria-label="Xóa file"
                                       >
                                          <X className="size-4" />
                                       </Button>
                                    </div>
                                 ) : inputUrl ? (
                                    <div className="flex gap-2 items-center min-w-0">
                                       {isVideoUrl(inputUrl) ? (
                                          <video
                                             src={inputUrl}
                                             className="size-12 object-cover rounded shrink-0 bg-muted"
                                             autoPlay
                                             muted
                                             loop
                                             playsInline
                                          />
                                       ) : (
                                          <img
                                             src={inputUrl}
                                             alt=""
                                             className="size-12 object-cover rounded shrink-0 bg-muted"
                                             onError={(e) => {
                                                (
                                                   e.target as HTMLImageElement
                                                ).style.display = "none";
                                             }}
                                          />
                                       )}
                                       <Input
                                          value={inputUrl}
                                          onChange={(e) =>
                                             setInputUrl(e.target.value)
                                          }
                                          className="flex-1 min-w-0 text-muted-foreground"
                                          title={inputUrl}
                                       />
                                       <Button
                                          type="button"
                                          variant="outline"
                                          size="icon"
                                          onClick={() => setInputUrl("")}
                                          disabled={loading}
                                          className="shrink-0 bg-transparent"
                                          aria-label="Xóa URL"
                                       >
                                          <X className="size-4" />
                                       </Button>
                                    </div>
                                 ) : (
                                    <div className="flex gap-2 items-center flex-wrap">
                                       <Button
                                          type="button"
                                          variant="outline"
                                          className="bg-primary/10"
                                          size="sm"
                                          onClick={() =>
                                             fileInputRef.current?.click()
                                          }
                                          disabled={loading}
                                          aria-label="Chọn file"
                                       >
                                          Chọn file
                                       </Button>
                                       <input
                                          ref={fileInputRef}
                                          type="file"
                                          className="sr-only"
                                          tabIndex={-1}
                                          disabled={loading}
                                          onChange={(e) =>
                                             setFile(
                                                e.target.files?.[0] || null,
                                             )
                                          }
                                          aria-hidden
                                       />
                                       <span className="text-muted-foreground text-xs uppercase">
                                          hoặc
                                       </span>
                                       <Input
                                          value={inputUrl}
                                          onChange={(e) =>
                                             setInputUrl(e.target.value)
                                          }
                                          placeholder="Dán URL ảnh"
                                          disabled={loading}
                                          className="flex-1"
                                       />
                                    </div>
                                 )}
                              </div>
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
               <TabsContent value="gallery" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0">
                        <CardTitle className=" flex flex-col">
                           <code className="text-primary-foreground-1 -mb-2">
                              GET
                           </code>
                           <p className="text-2xl">LIST FILE</p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           Show all file uploaded 🗃️
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="space-y-4 p-0 flex flex-col">
                        {loading || error ? (
                           <div className="flex items-center justify-between p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm font-medium text-primary-foreground-darker">
                              <div className="flex items-center gap-2 max-w-[400px] w-80">
                                 <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                                    <Icon
                                       size={15}
                                       styles="solid"
                                       className="!bg-primary-foreground-darker"
                                       name="server"
                                    />
                                    {loading ? "Loading" : "Error"}
                                 </Badge>
                                 <span className="truncate font-normal">
                                    {loading ? "Rendering gallery..." : error}
                                 </span>
                              </div>
                           </div>
                        ) : (
                           <Tabs
                              defaultValue={currentFileTab}
                              onValueChange={setCurrentFileTab}
                           >
                              <TabsList className="bg-primary/15 border border-primary/20">
                                 <TabsTrigger
                                    value="graphic"
                                    className="text-primary"
                                 >
                                    Graphic
                                 </TabsTrigger>
                                 <TabsTrigger
                                    value="file"
                                    className="text-primary"
                                 >
                                    File
                                 </TabsTrigger>
                              </TabsList>

                              <TabsContent value="graphic">
                                 <ScrollArea className="w-full h-75 p-2">
                                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 p-2">
                                       {graphicFiles.map((file) => (
                                          <Dialog
                                             key={file.pathname}
                                             onOpenChange={(isOpen) => {
                                                if (!isOpen)
                                                   setCopiedFile(null);
                                             }}
                                          >
                                             <DialogTrigger asChild>
                                                <Card className="mb-3 border-none p-0 shadow-none break-inside-avoid cursor-pointer group relative">
                                                   <CardContent className="flex justify-center p-0 relative">
                                                      {isVideoFile(file.pathname) ? (
                                                         <video
                                                            src={file.url}
                                                            className="w-full h-auto object-cover rounded-md"
                                                            muted
                                                            playsInline
                                                            autoPlay
                                                            loop
                                                         />
                                                      ) : (
                                                         <Image
                                                            src={file.url}
                                                            alt={getDisplayName(file.pathname)}
                                                            width={500}
                                                            height={500}
                                                            className="w-full h-auto object-cover rounded-md"
                                                         />
                                                      )}
                                                   </CardContent>
                                                </Card>
                                             </DialogTrigger>

                                             <DialogOverlay className="backdrop-blur-[10px] z-50" />

                                             <DialogContent
                                                onOpenAutoFocus={(e) => {
                                                   e.preventDefault();
                                                   (
                                                      e.currentTarget as HTMLElement
                                                   ).focus();
                                                }}
                                                className="max-w-5xl p-0 bg-transparent border-none shadow-none z-50 [&>button]:hidden gap-2"
                                             >
                                                <DialogTitle className="flex justify-center">
                                                   <ToggleGroup
                                                      variant="outline"
                                                      type="multiple"
                                                   >
                                                      <Tooltip>
                                                         <TooltipTrigger
                                                            asChild
                                                         >
                                                            <ToggleGroupItem
                                                               value="download"
                                                               aria-label="Download image"
                                                               className="border border-primary/50 data-[state=on]:bg-transparent hover:!bg-accent"
                                                               onClick={() => {
                                                                  const a =
                                                                     document.createElement(
                                                                        "a",
                                                                     );
                                                                  a.href =
                                                                     file.downloadUrl ||
                                                                     file.url;
                                                                  a.download =
                                                                     file.pathname;
                                                                  a.click();
                                                               }}
                                                            >
                                                               <Download className="h-4 w-4 text-primary-foreground-darker" />
                                                            </ToggleGroupItem>
                                                         </TooltipTrigger>
                                                         <TooltipContent className="py-2">
                                                            Download
                                                         </TooltipContent>
                                                      </Tooltip>

                                                      <Tooltip>
                                                         <TooltipTrigger
                                                            asChild
                                                         >
                                                            <ToggleGroupItem
                                                               value="zoom"
                                                               aria-label="Zoom image"
                                                               className="border border-primary/50 data-[state=on]:bg-transparent hover:!bg-accent"
                                                               onClick={() =>
                                                                  window.open(
                                                                     file.url,
                                                                     "_blank",
                                                                  )
                                                               }
                                                            >
                                                               <ZoomIn className="h-4 w-4 text-primary-foreground-darker" />
                                                            </ToggleGroupItem>
                                                         </TooltipTrigger>
                                                         <TooltipContent className="py-2">
                                                            Zoom
                                                         </TooltipContent>
                                                      </Tooltip>

                                                      <Tooltip>
                                                         <TooltipTrigger
                                                            asChild
                                                         >
                                                            <ToggleGroupItem
                                                               value="share"
                                                               aria-label="Share image"
                                                               className="border border-primary/50 data-[state=on]:bg-transparent hover:!bg-accent"
                                                               onClick={async () => {
                                                                  try {
                                                                     await navigator.clipboard.writeText(
                                                                        file.url,
                                                                     );
                                                                     setCopiedFile(
                                                                        file.pathname,
                                                                     );
                                                                  } catch {}
                                                               }}
                                                            >
                                                               {copiedFile ===
                                                               file.pathname ? (
                                                                  <Check className="h-4 w-4 text-primary-foreground-darker" />
                                                               ) : (
                                                                  <Share2 className="h-4 w-4 text-primary-foreground-darker" />
                                                               )}
                                                            </ToggleGroupItem>
                                                         </TooltipTrigger>
                                                         <TooltipContent className="py-2">
                                                            {copiedFile ===
                                                            file.pathname
                                                               ? "Copied!"
                                                               : "Copy link"}
                                                         </TooltipContent>
                                                      </Tooltip>

                                                      <Tooltip>
                                                         <TooltipTrigger
                                                            asChild
                                                         >
                                                            <ToggleGroupItem
                                                               value="delete"
                                                               aria-label="Delete image"
                                                               className="border border-primary/50 data-[state=on]:bg-transparent hover:!bg-accent"
                                                            >
                                                               <Trash2 className="h-4 w-4 text-primary-foreground-darker" />
                                                            </ToggleGroupItem>
                                                         </TooltipTrigger>
                                                         <TooltipContent className="py-2">
                                                            Delete
                                                         </TooltipContent>
                                                      </Tooltip>
                                                   </ToggleGroup>
                                                </DialogTitle>
                                                <div className="flex justify-center items-center">
                                                   {isVideoFile(file.pathname) ? (
                                                      <video
                                                         src={file.url}
                                                         controls
                                                         autoPlay
                                                         className="max-h-[80vh] w-auto h-auto object-contain rounded-md"
                                                      />
                                                   ) : (
                                                      <Image
                                                         src={file.url}
                                                         alt={getDisplayName(file.pathname)}
                                                         width={1200}
                                                         height={1200}
                                                         className="max-h-[80vh] w-auto h-auto object-contain rounded-md"
                                                      />
                                                   )}
                                                </div>
                                             </DialogContent>
                                          </Dialog>
                                       ))}
                                    </div>
                                 </ScrollArea>
                              </TabsContent>

                              <TabsContent value="file">
                                 <div className="flex flex-col gap-2">
                                    {otherFiles.map((file) => (
                                       <a
                                          key={file.pathname}
                                          href={file.downloadUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-2 p-2 border rounded-md hover:bg-primary/10"
                                       >
                                          <Badge className="text-primary-foreground-darker bg-primary/10 rounded-sm border-primary/20">
                                             <Icon
                                                size={15}
                                                styles="bulk"
                                                className="!bg-primary-foreground-darker"
                                                name="files"
                                             />
                                             File
                                          </Badge>
                                          <span className="truncate">
                                                {getDisplayName(file.pathname)}
                                          </span>
                                          <span className="text-xs text-gray-500">
                                             ({Math.round(file.size / 1024)} KB)
                                          </span>
                                       </a>
                                    ))}
                                 </div>
                              </TabsContent>
                           </Tabs>
                        )}
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
                           <Button onClick={handleGetFiles} className="w-2/5">
                              Refresh
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
