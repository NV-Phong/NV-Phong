import React, { useState } from "react";
import { Tabs, TabsContent
   // , TabsList, TabsTrigger
 } from "../ui/tabs";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../ui/card";
import { CommitChanges } from "./commit-changes";
import { Button } from "../ui/button";
import CommitsPerDay from "./commits-per-day";
import { Label } from "../ui/label";
import { DatePicker } from "./date-picker";
import PorfolioLogo from "./portfolio-logo";

export default function IntroCard() {
   const [currentTab, setCurrentTab] = useState("introduce");
   return (
      <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
         <Tabs
            defaultValue={currentTab}
            onValueChange={setCurrentTab}
            className="col-start-3 row-start-3 flex flex-col items-center z-1"
         >
            {/* <TabsList className="bg-primary/15 border border-primary/20">
               <TabsTrigger value="introduce" className="text-primary">
                  Introduce
               </TabsTrigger>
               <TabsTrigger value="contact" className="text-primary">
                  Contact
               </TabsTrigger>
            </TabsList> */}

            <div className="flex max-w-lg flex-col bg-primary/20 p-2 dark:bg-white/10">
               <TabsContent value="introduce" className="flex justify-center">
                  <div className="rounded-xl bg-card p-10 text-sm/7 text-gray-700 dark:bg-card dark:text-gray-300">
                     <PorfolioLogo className="mb-3" />

                     <div className="space-y-3">
                        <p>
                           I build digital experiences that don&apos;t just work{" "}
                           <strong className="text-primary-foreground-darker">
                              <i>they spark something new.</i>
                           </strong>
                        </p>
                        <ul className="space-y-3">
                           <li className="flex">
                              <svg
                                 className="h-[1lh] w-5.5 shrink-0"
                                 viewBox="0 0 22 22"
                                 fill="none"
                              >
                                 <circle
                                    cx="11"
                                    cy="11"
                                    r="11"
                                    className="fill-primary/25"
                                 />
                                 <circle
                                    cx="11"
                                    cy="11"
                                    r="10.5"
                                    className="stroke-primary/25"
                                 />
                                 <path
                                    d="M8 11.5L10.5 14L14 8"
                                    className="stroke-primary-foreground-darker dark:stroke-sky-300"
                                 />
                              </svg>
                              <p className="ml-3">
                                 Customizing your theme with
                                 <code className="font-mono font-medium text-gray-950 dark:text-white">
                                    @theme
                                 </code>
                              </p>
                           </li>
                           <li className="flex">
                              <svg
                                 className="h-[1lh] w-5.5 shrink-0"
                                 viewBox="0 0 22 22"
                                 fill="none"
                              >
                                 <circle
                                    cx="11"
                                    cy="11"
                                    r="11"
                                    className="fill-primary/25"
                                 />
                                 <circle
                                    cx="11"
                                    cy="11"
                                    r="10.5"
                                    className="stroke-primary/25"
                                 />
                                 <path
                                    d="M8 11.5L10.5 14L14 8"
                                    className="stroke-primary-foreground-darker dark:stroke-sky-300"
                                 />
                              </svg>
                              <p className="ml-3">
                                 Adding custom utilities with
                                 <code className="font-mono font-medium text-gray-950 dark:text-white">
                                    @utility
                                 </code>
                              </p>
                           </li>
                           <li className="flex">
                              <svg
                                 className="h-[1lh] w-5.5 shrink-0"
                                 viewBox="0 0 22 22"
                                 fill="none"
                              >
                                 <circle
                                    cx="11"
                                    cy="11"
                                    r="11"
                                    className="fill-primary/25"
                                 />
                                 <circle
                                    cx="11"
                                    cy="11"
                                    r="10.5"
                                    className="stroke-primary/25"
                                 />
                                 <path
                                    d="M8 11.5L10.5 14L14 8"
                                    className="stroke-primary-foreground-darker dark:stroke-sky-300"
                                 />
                              </svg>
                              <p className="ml-3">
                                 Adding custom variants with
                                 <code className="font-mono font-medium text-gray-950 dark:text-white">
                                    @variant
                                 </code>
                              </p>
                           </li>
                           <li className="flex">
                              <svg
                                 className="h-[1lh] w-5.5 shrink-0"
                                 viewBox="0 0 22 22"
                                 fill="none"
                              >
                                 <circle
                                    cx="11"
                                    cy="11"
                                    r="11"
                                    className="fill-primary/25"
                                 />
                                 <circle
                                    cx="11"
                                    cy="11"
                                    r="10.5"
                                    className="stroke-primary/25"
                                 />
                                 <path
                                    d="M8 11.5L10.5 14L14 8"
                                    className="stroke-primary-foreground-darker dark:stroke-sky-300"
                                 />
                              </svg>
                              <p className="ml-3">
                                 Code completion with instant preview
                              </p>
                           </li>
                        </ul>
                        <p>
                           Perfect for learning how the framework works,
                           prototyping a new idea, or creating a demo to share
                           online.
                        </p>
                     </div>
                     <hr className="my-6 w-full border-(--pattern-fg)" />
                     <p className="mb-3">Want to dig deeper into Tailwind?</p>
                     <p className="font-semibold">
                        <a
                           href="https://tailwindcss.com/docs"
                           className="text-gray-950 underline decoration-primary dark:decoration-sky-400 underline-offset-3 hover:decoration-2 dark:text-white"
                        >
                           Read the docs &rarr;
                        </a>
                     </p>
                  </div>
               </TabsContent>

               <TabsContent value="contact" className="flex justify-center">
                  <Card className="w-xl border-none shadow-none">
                     <CardHeader>
                        <CardTitle className="text-xl">CALENDAR</CardTitle>
                        <CardDescription>
                           Double-check to pick the correct commit dates, or
                           you&apos;ll need extra commits to fix the wrong ones.
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="space-y-2 flex justify-between">
                           <div className="space-y-2">
                              <Label>Stack Dates</Label>
                              <DatePicker />
                           </div>
                           <div className="space-y-2">
                              <Label>Commits Per Day</Label>
                              <CommitsPerDay />
                           </div>
                        </div>
                     </CardContent>
                     <CardFooter className="align justify-between">
                        <Button
                           variant="outline"
                           className="w-2/5 bg-card border-primary/30"
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
