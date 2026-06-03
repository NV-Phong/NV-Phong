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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
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
import { Check, Download, Share2, Trash2, ZoomIn } from "lucide-react";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";

type Project = {
   id: string;
   slug: string;
   title: string;
   description: string;
   role: string[];
   year: string;
   month: string;
   techStack: string[];
   overview: {
      company: string;
      duration: string;
      objective: string;
      keyFeatures: string[];
      showAsContributions?: boolean;
   };
   links: {
      github: Array<{
         url: string;
         label: string;
      }>;
      live: string;
      preview: string;
      production: string;
      figma: string | Array<{
         url: string;
         label: string;
      }>;
   };
   gallery: Array<{
      url: string;
      alt: string;
   }>;
};

export default function MyWorkDetail() {
   const params = useParams();
   const slug = params.slug as string;
   const [color, setColor] = useState("#ffffff");
   const [showParticles, setShowParticles] = useState(true);
   const [currentTab, setCurrentTab] = useState("project");
   const [currentFileTab, setCurrentFileTab] = useState("overview");
   const [projectData, setProjectData] = useState<Project | null>(null);
   const [projectLoading, setProjectLoading] = useState(true);

   const [copiedFile, setCopiedFile] = useState<string | null>(null);

   const router = useRouter();

   // Load project data from JSON
   useEffect(() => {
      async function loadProjectData() {
         try {
            setProjectLoading(true);
            const response = await fetch("/api/projects");
            const projects: Project[] = await response.json();
            const project = projects.find((p) => p.slug === slug);
            setProjectData(project || null);
         } catch (err) {
            console.error("Failed to load project data:", err);
         } finally {
            setProjectLoading(false);
         }
      }

      if (slug) {
         loadProjectData();
      }
   }, [slug]);

   const isVideoFile = (url: string) =>
      /\.(mp4|webm|ogg|mov|mkv)(\?.*)?$/i.test(url);

   const galleryFiles = projectData?.gallery || [];

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
               <TabsContent value="project" className="flex justify-center">
                  <Card className="rounded-xl bg-card p-10 text-sm/7 text-foreground shadow-none border-none">
                     <CardHeader className="p-0 gap-0 -mt-2">
                        <CardTitle className=" flex flex-col">
                           {/* <code className="text-primary-foreground-1 -mb-2">
                              PROJECT
                           </code> */}
                           <p className="text-2xl uppercase">
                              {projectData?.title || "LOADING"}
                           </p>
                        </CardTitle>
                        <CardDescription className="text-foreground">
                           {projectData?.description ||
                              "Loading project information..."}
                        </CardDescription>
                     </CardHeader>

                     <CardContent className="p-0 flex flex-col min-w-sm">
                        {projectLoading ? (
                           <div className="flex items-center justify-between p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm font-medium text-primary-foreground-darker">
                              <div className="flex items-center gap-2 max-w-[400px] w-80">
                                 <Badge className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20">
                                    <Icon
                                       size={15}
                                       styles="solid"
                                       className="!bg-primary-foreground-darker"
                                       name="server"
                                    />
                                    Loading
                                 </Badge>
                                 <span className="truncate font-normal">
                                    Loading project...
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
                                    value="overview"
                                    className="text-primary-foreground-darker"
                                 >
                                    Overview
                                 </TabsTrigger>
                                 <TabsTrigger
                                    value="technical"
                                    className="text-primary-foreground-darker"
                                 >
                                    Technical
                                 </TabsTrigger>
                                 {galleryFiles.length > 0 && (
                                    <TabsTrigger
                                       value="demo"
                                       className="text-primary-foreground-darker"
                                    >
                                       Demo
                                    </TabsTrigger>
                                 )}
                              </TabsList>

                              <TabsContent value="overview" className="mt-2">
                                 <div className="flex flex-col gap-2">
                                    {projectData && (
                                       <>
                                          <div className="space-y-2">
                                             <Separator textPosition="start">
                                                <Label className="-ml-2">
                                                   {projectData?.overview?.company || "Roles"}
                                                </Label>
                                             </Separator>
                                             <div className="flex flex-wrap gap-2">
                                                {projectData.role.map((r) => (
                                                   <Badge
                                                      key={r}
                                                      className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20"
                                                   >
                                                      {r}
                                                   </Badge>
                                                ))}
                                             </div>
                                          </div>
                                       </>
                                    )}
                                    {projectData?.links?.production && (
                                       <div className="space-y-2">
                                          <Separator textPosition="start">
                                             <Label className="-ml-2">
                                                Production
                                             </Label>
                                          </Separator>
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
                                                   {
                                                      projectData.links
                                                         .production
                                                   }
                                                </span>
                                             </div>
                                             <a
                                                href={
                                                   projectData.links.production
                                                }
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
                                    )}
                                    {projectData?.links?.preview && (
                                       <div className="space-y-2">
                                          <Separator textPosition="start">
                                             <Label className="-ml-2">
                                                Preview
                                             </Label>
                                          </Separator>
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
                                                   {
                                                      projectData.links
                                                         .preview
                                                   }
                                                </span>
                                             </div>
                                             <a
                                                href={
                                                   projectData.links.preview.startsWith('http')
                                                      ? projectData.links.preview
                                                      : `https://${projectData.links.preview}`
                                                }
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
                                    )}
                                    {(projectData?.links?.github && projectData.links.github.length > 0) || projectData?.links?.figma ? (
                                       <div className="space-y-2">
                                          <Separator textPosition="start">
                                             <Label className="-ml-2">
                                                Source
                                             </Label>
                                          </Separator>
                                          <div className="flex flex-col gap-2">
                                             {projectData.links.github && projectData.links.github.length > 0 && (
                                                projectData.links.github.map((githubItem, idx) => (
                                                   <div key={idx} className="flex items-center justify-between p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm font-medium text-primary-foreground-darker">
                                                      <div className="flex items-center gap-2 max-w-[400px] w-80">
                                                         <Badge className="text-primary-foreground-darker bg-primary/5 h-6.5 border-primary/20 dark:border-primary/5">
                                                            <Icon
                                                               size={15}
                                                               styles="solid"
                                                               name="github"
                                                               image={true}
                                                            />
                                                            {projectData.links.github.length > 1 ? githubItem.label : "GitHub"}
                                                         </Badge>
                                                         <span className="truncate font-normal lowercase">
                                                            {githubItem.url}
                                                         </span>
                                                      </div>
                                                      <a
                                                         href={githubItem.url}
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
                                                ))
                                             )}
                                             {projectData.links.figma && (
                                                Array.isArray(projectData.links.figma) ? (
                                                   projectData.links.figma.map((figmaItem, idx) => (
                                                      <div key={idx} className="flex items-center justify-between p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm font-medium text-primary-foreground-darker">
                                                         <div className="flex items-center gap-2 max-w-[400px] w-80">
                                                            <Badge className="text-primary-foreground-darker bg-primary/5 h-6.5 border-primary/20 dark:border-primary/5">
                                                               <Icon
                                                                  size={15}
                                                                  styles="solid"
                                                                  name="figma"
                                                                  image={true}
                                                               />
                                                               {figmaItem.label}
                                                            </Badge>
                                                            <span className="truncate font-normal lowercase">
                                                               {figmaItem.url}
                                                            </span>
                                                         </div>
                                                         <a
                                                            href={figmaItem.url}
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
                                                   ))
                                                ) : (
                                                   <div className="flex items-center justify-between p-2 bg-primary/5 dark:bg-primary/2 border border-primary/20 dark:border-primary/10 rounded-md text-sm font-medium text-primary-foreground-darker">
                                                      <div className="flex items-center gap-2 max-w-[400px] w-80">
                                                         <Badge className="text-primary-foreground-darker bg-primary/5 h-6.5 border-primary/20 dark:border-primary/5">
                                                            <Icon
                                                               size={15}
                                                               styles="solid"
                                                               name="figma"
                                                               image={true}
                                                            />
                                                            Figma
                                                         </Badge>
                                                         <span className="truncate font-normal lowercase">
                                                            {projectData.links.figma}
                                                         </span>
                                                      </div>
                                                      <a
                                                         href={projectData.links.figma}
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
                                                )
                                             )}
                                          </div>
                                       </div>
                                    ) : null}
                                 </div>
                              </TabsContent>

                              <TabsContent value="technical" className="mt-2">
                                 <div className="flex flex-col gap-2">
                                    {projectData && (
                                       <>
                                          <div className="space-y-2">
                                             <Separator textPosition="start">
                                                <Label className="-ml-2">Tech Stack</Label>
                                             </Separator>
                                             <div className="flex flex-wrap gap-2">
                                                {projectData.techStack.map((tech) => (
                                                   <Badge
                                                      key={tech}
                                                      className="text-primary-foreground-darker bg-primary/10 h-6.5 border-primary/20"
                                                   >
                                                      {tech}
                                                   </Badge>
                                                ))}
                                             </div>
                                          </div>

                                          {projectData.overview?.keyFeatures && projectData.overview.keyFeatures.length > 0 && (
                                             <div className="space-y-1">
                                                <Separator textPosition="start">
                                                   <Label className="-ml-2">
                                                      {projectData.overview.showAsContributions ? "Contributions" : "Key Features"}
                                                   </Label>
                                                </Separator>
                                                {projectData.overview.keyFeatures.map((feature, idx) => (
                                                   <div key={idx} className="flex items-center">
                                                      <Icon
                                                         size={10}
                                                         name={"solid/star"}
                                                         className="mt-1"
                                                      />
                                                      <p className="ml-1 text-foreground">
                                                         {feature}
                                                      </p>
                                                   </div>
                                                ))}
                                             </div>
                                          )}
                                       </>
                                    )}
                                 </div>
                              </TabsContent>

                              <TabsContent value="demo">
                                 <ScrollArea className="w-full h-75 p-2">
                                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 p-2">
                                       {galleryFiles.length > 0 ? (
                                          galleryFiles.map((file, idx) => (
                                             <Dialog
                                                key={idx}
                                                onOpenChange={(isOpen) => {
                                                   if (!isOpen)
                                                      setCopiedFile(null);
                                                }}
                                             >
                                                <DialogTrigger asChild>
                                                   <Card className="mb-3 border-none p-0 shadow-none break-inside-avoid cursor-pointer group relative">
                                                      <CardContent className="flex justify-center p-0 relative">
                                                         {isVideoFile(
                                                            file.url,
                                                         ) ? (
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
                                                               alt={
                                                                  file.alt ||
                                                                  "Gallery image"
                                                               }
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
                                                   <DialogTitle className="flex justify-center gap-4">
                                                      <Tooltip>
                                                         <TooltipTrigger
                                                            asChild
                                                         >
                                                            <Button
                                                               variant="outline"
                                                               size="icon"
                                                               onClick={() => {
                                                                  const a =
                                                                     document.createElement(
                                                                        "a",
                                                                     );
                                                                  a.href =
                                                                     file.url;
                                                                  a.download =
                                                                     file.alt ||
                                                                     "image";
                                                                  a.click();
                                                               }}
                                                            >
                                                               <Download className="h-4 w-4" />
                                                            </Button>
                                                         </TooltipTrigger>
                                                         <TooltipContent>
                                                            Download
                                                         </TooltipContent>
                                                      </Tooltip>

                                                      <Tooltip>
                                                         <TooltipTrigger
                                                            asChild
                                                         >
                                                            <Button
                                                               variant="outline"
                                                               size="icon"
                                                               onClick={() =>
                                                                  window.open(
                                                                     file.url,
                                                                     "_blank",
                                                                  )
                                                               }
                                                            >
                                                               <ZoomIn className="h-4 w-4" />
                                                            </Button>
                                                         </TooltipTrigger>
                                                         <TooltipContent>
                                                            Zoom
                                                         </TooltipContent>
                                                      </Tooltip>

                                                      <Tooltip>
                                                         <TooltipTrigger
                                                            asChild
                                                         >
                                                            <Button
                                                               variant="outline"
                                                               size="icon"
                                                               onClick={async () => {
                                                                  try {
                                                                     await navigator.clipboard.writeText(
                                                                        file.url,
                                                                     );
                                                                     setCopiedFile(
                                                                        file.url,
                                                                     );
                                                                  } catch {}
                                                               }}
                                                            >
                                                               {copiedFile ===
                                                               file.url ? (
                                                                  <Check className="h-4 w-4" />
                                                               ) : (
                                                                  <Share2 className="h-4 w-4" />
                                                               )}
                                                            </Button>
                                                         </TooltipTrigger>
                                                         <TooltipContent>
                                                            {copiedFile ===
                                                            file.url
                                                               ? "Copied!"
                                                               : "Copy link"}
                                                         </TooltipContent>
                                                      </Tooltip>
                                                   </DialogTitle>
                                                   <div className="flex justify-center items-center">
                                                      {isVideoFile(file.url) ? (
                                                         <video
                                                            src={file.url}
                                                            controls
                                                            autoPlay
                                                            className="max-h-[80vh] w-auto h-auto object-contain rounded-md"
                                                         />
                                                      ) : (
                                                         <Image
                                                            src={file.url}
                                                            alt={
                                                               file.alt ||
                                                               "Gallery image"
                                                            }
                                                            width={1200}
                                                            height={1200}
                                                            className="max-h-[80vh] w-auto h-auto object-contain rounded-md"
                                                         />
                                                      )}
                                                   </div>
                                                </DialogContent>
                                             </Dialog>
                                          ))
                                       ) : (
                                          <div className="col-span-full text-center py-8 text-muted-foreground">
                                             <p>No gallery images available</p>
                                          </div>
                                       )}
                                    </div>
                                 </ScrollArea>
                              </TabsContent>
                           </Tabs>
                        )}
                     </CardContent>

                     <CardFooter className="flex flex-col p-0">
                        <div className="w-full font-semibold flex justify-between items-center">
                           <Button
                              variant="outline"
                              onClick={() => router.back()}
                              className="w-2/5 bg-transparent"
                           >
                              Back
                           </Button>
                           <Button
                              onClick={async () => {
                                 try {
                                    setProjectLoading(true);
                                    const response =
                                       await fetch("/api/projects");
                                    const projects: Project[] =
                                       await response.json();
                                    const project = projects.find(
                                       (p) => p.slug === slug,
                                    );
                                    setProjectData(project || null);
                                 } catch (err) {
                                    console.error(
                                       "Failed to refresh project data:",
                                       err,
                                    );
                                 } finally {
                                    setProjectLoading(false);
                                 }
                              }}
                              className="w-2/5"
                           >
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
